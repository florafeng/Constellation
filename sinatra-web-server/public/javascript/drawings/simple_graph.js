/**
  @author Michael Longauer, David Piegza

  Built around original simple_graph.js by David Piegza
  https://github.com/davidpiegza/Graph-Visualization
*/

var Drawing = Drawing || {};

Drawing.SimpleGraph = function(options) {
  var options = options || {};

  this.layout = options.layout || "3d";
  this.layout_options = options.graphLayout || {};
  this.show_stats = options.showStats || false;
  this.show_info = options.showInfo || false;
  this.show_labels = options.showLabels || false;
  this.selection = options.selection || false;
  this.limit = options.limit || 10;
  this.nodes_count = options.numNodes || 20;
  this.edges_count = options.numEdges || 10;
  this.connection = options.params;

  var camera, controls, scene, renderer, interaction, geometry, object_selection, schema, clock;
  var stats;
  var info_text = {};
  var graph = new Graph({limit: options.limit});

  var mySprite = new THREE.Sprite( new THREE.SpriteMaterial({
      map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ),
      color: 0xffffff,
      transparent: false,
      blending: THREE.AdditiveBlending
    }
  ));
  mySprite.scale.set(10, 10, 1.0);

  // a 64 member HSV gradient from blue to red; used for drawing nodes
  // source: http://www.perbang.dk/rgbgradient/
  var pallette = [0x0000FF,0x0010FF, 0x0020FF, 0x0030FF,0x0040FF,0x0050FF,0x0061FF,0x0071FF,
    0x0081FF,0x0091FF,0x00A1FF,0x00B2FF,0x00C2FF,0x00D2FF,0x00E2FF,0x00F2FF,0x00FFFA,
    0x00FFEA,0x00FFDA,0x00FFCA,0x00FFBA,0x00FFA9,0x00FF99,0x00FF89,0x00FF79,0x00FF69,
    0x00FF59,0x00FF48,0x00FF38,0x00FF28,0x00FF18,0x00FF08,0x08FF00,0x18FF00,0x28FF00,
    0x38FF00,0x48FF00,0x59FF00,0x69FF00,0x79FF00,0x89FF00,0x99FF00,0xAAFF00,0xBAFF00,
    0xCAFF00,0xDAFF00,0xEAFF00,0xFAFF00,0xFFF200,0xFFE200,0xFFD200,0xFFC200,0xFFB200,
    0xFFA100,0xFF9100,0xFF8100,0xFF7100,0xFF6100,0xFF5000,0xFF4000,0xFF3000,0xFF2000,
    0xFF1000,0xFF0000];

  var geometries = [];

  var that=this;

  init();
  createGraph();

  function init() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000000);
    camera.position.z = 10000;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 1;

    controls.noZoom = false;
    controls.noPan = false;

    controls.maxDistance = 100000;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = Cubemap(camera);

    // clock = new THREE.Clock();

    // Create node selection, if set
    if(that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function(obj) {
          updateSummaryBox(obj);
          //console.log(obj.material.color);
        },
        clicked: function(obj) {
          var thisNode = graph.nodes.find(function(n) {
              return n.data.title == obj.parent.name
            });
          console.log(thisNode)
          // obj.add(mySprite);
          // scene.add(obj);

          // if (obj != null && obj.parent.hasOwnProperty('name')) {
          //   $.post('http://localhost:3001/' + obj.parent.name, {
          //       db: 'd2tjg1p6301ri2',
          //       user: 'haqgjczsewuoim',
          //       password: 'Oygd5GBvgRmlfrlOcWQwUvgYkC',
          //       host: 'ec2-23-21-100-145.compute-1.amazonaws.com',
          //       port: 5432,
          //       ssl: true
          //     }, function(response) {
          //       console.log(response);
          //     })
          //     .fail(function(err) {
          //       console.log(err);
          //     });
          // }
          // el = document.getElementById("overlay");
          // el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
        }
      });
    }

    document.body.appendChild( renderer.domElement );

    // Stats.js
    if(that.show_stats) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild( stats.domElement );
    }

    // Create info box
    if(that.show_info) {
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild( info );
    }
  }

  function createGraph() {
    var nodes = $.post('http://localhost:3001/', that.connection)
      .then(function(response){
        return response.tables.map(function (table, i) {
          var myNode = new Node(i);
          myNode.data.title = table.name;
          myNode.data.columns = table.columns;
          myNode.data.relationships = table.relationships;
          myNode.data.size = table.size;
          return myNode;
        }).sort(function(a, b) {
          return a.data.size - b.data.size;
        });
      });

    nodes.then(function(collection) {
      for (var i = 0; i < collection.length; i++) {
        // find proportional size ratio of this node relative to the other nodes as { 0 <= n <=1 }
        var largestSize = collection[collection.length - 1].data.size;
        var smallestSize = collection[0].data.size;
        collection[i].data.sizeRatio = (collection[i].data.size - smallestSize) / (largestSize - smallestSize);
        // determine which colour band on the pallette this node will be
        var rainbowBand = 0; // the first node gets the colour at index 0
        if (i > 0) {
          // each subsequent node gets a colour one step toward the highest colour
          // depends on number of nodes rendered - last node node will always be colour at pallette[pallette.length - 1]
          rainbowBand = i * (pallette.length / (collection.length - 1)) - 1;
        }
        collection[i].data.colorBand = pallette[rainbowBand];
        collection[i].data.qualSize = 600 * collection[i].data.sizeRatio + 90;
        // pass size to draw function to render size and colour according to relative size and postion in collection
        drawNode(collection[i]);
        graph.addNode(collection[i]);

      }
      collection.forEach(function(node) {
        for (var name in node.data.relationships) {
          var target_node = collection.filter(function(n) { return n.data.title === name; })
          if(graph.addEdge(node, target_node[0], false)) {
            drawEdge(node, target_node[0]);
          }
          // drawEdge(node, target_node[0]);
        }
      });

      drawCentralNode();

      that.layout_options.width = that.layout_options.width || 2000;
      that.layout_options.height = that.layout_options.height || 2000;
      that.layout_options.iterations = that.layout_options.iterations || 100000;
      that.layout_options.layout = that.layout_options.layout || that.layout;
      graph.layout = new Layout.ForceDirected(graph, that.layout_options);
      graph.layout.init();
      info_text.nodes = "Nodes " + graph.nodes.length;
      info_text.edges = "Edges " + graph.edges.length;
      animate();
    });
  }

  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node) {

    var qualSize = node.data.qualSize;
    var myMaterial = new THREE.MeshBasicMaterial( {  color: 0xffffff, opacity: 0.5 } )
    var draw_object = new THREE.Mesh( new THREE.SphereGeometry(50, 10, 10), myMaterial );

    if(that.show_labels) {
      if(node.data.title != undefined) {
        var label_object = new THREE.Label(node.data.title);
      } else {
        var label_object = new THREE.Label(node.id);
      }
      node.data.label_object = label_object;
      scene.add( node.data.label_object );
    }

    var area = 1000;
    draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);

    // make a glow sprite for this orb
    var spriteMaterial = new THREE.SpriteMaterial(
  	{
  		map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ),
  		color: node.data.colorBand,
      transparent: false,
      blending: THREE.AdditiveBlending
  	});

    var spriteSize = Math.round(qualSize * (4 + 2 * Math.pow(10, -3.5 * node.data.sizeRatio)));

  	var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(spriteSize, spriteSize, 1.0);
    graph.sprites.push(sprite);

    for (var i = 0; i < graph.sprites.length - 1; i++) {
      draw_object.add(graph.sprites[i].clone()); // this centers the glow at the mesh
    }
    var extraGlow = graph.sprites[graph.sprites.length - 1].clone();
    extraGlow.scale.set(spriteSize * 1.5, spriteSize * 1.5, 1.0);
    draw_object.add(extraGlow);

    draw_object.id = node.id;
    draw_object.name = node.data.title;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    scene.add( node.data.draw_object );
  }


  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target, colour=0xffffff) {
      material = new THREE.LineBasicMaterial({ color: colour, opacity: 1, linewidth: 1.0 });

      var tmp_geo = new THREE.Geometry();
      tmp_geo.vertices.push(source.data.draw_object.position);
      tmp_geo.vertices.push(target.data.draw_object.position);

      var line = new THREE.Line( tmp_geo, material, THREE.LinePieces );
      line.scale.x = line.scale.y = line.scale.z = 1;
      line.originalScale = 1;

      geometries.push(tmp_geo);

      scene.add( line );
  }

  /**
   * attempt to make a central node...
   */
   function drawCentralNode() {
     var myMaterial = new THREE.MeshBasicMaterial( {  color: 0xffffff, opacity: 0.5 } );
     var draw_object = new THREE.Mesh( new THREE.SphereGeometry(0, 50,50), myMaterial );

     var area = 1000;
     draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);
     draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);
     draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);

     var centralNode = new Node(graph.nodes.length);
     centralNode.data.title = "Central Node";

     //make a glow sprite for this orb
    //  var spriteMaterial = new THREE.SpriteMaterial({
    //   	map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ),
    //   	color: 0xffffff,
    //     transparent: false,
    //     blending: THREE.AdditiveBlending
    //   });
    //
    // for (var i = graph.sprites.length - 1; i > 0; i -= 2) {
    //   draw_object.add(graph.sprites[i].clone());
    // }

     draw_object.id = centralNode.id;
     draw_object.name = centralNode.data.title;
     centralNode.data.draw_object = draw_object;
     centralNode.position = draw_object.position;

    //  scene.add( centralNode.data.draw_object );

     graph.addNode(centralNode);

     // draw edges
     for (var i = 0; i < graph.nodes.length - 1; i++) {
       graph.addEdge(centralNode, graph.nodes[i]);
     }
   }


  function animate() {
    // mySprite.position.z -= clock.getDelta();
    requestAnimationFrame( animate );
    controls.update();
    render();
    if(that.show_info) {
      printInfo();
    }
  }


  function render() {
    // Generate layout if not finished
    if(!graph.layout.finished) {
      info_text.calc = "<span style='color: red'>Calculating layout...</span>";
      graph.layout.generate();
    } else {
      info_text.calc = "";
    }

    // Update position of lines (edges)
    for(var i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }


    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      var length = graph.nodes.length;
      for(var i=0; i<length; i++) {
        var node = graph.nodes[i];
        if(node.data.label_object != undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
          node.data.label_object.position.y = node.data.draw_object.position.y - 100;
          node.data.label_object.position.z = node.data.draw_object.position.z + 100;
          node.data.label_object.lookAt(camera.position);
        } else {
          if(node.data.title != undefined) {
            var label_object = new THREE.Label(node.data.title, node.data.draw_object);
          } else {
            var label_object = new THREE.Label(node.id, node.data.draw_object);
          }
          node.data.label_object = label_object;
          scene.add( node.data.label_object );
        }
      }
    } else {
      var length = graph.nodes.length;
      for(var i=0; i<length; i++) {
        var node = graph.nodes[i];
        if(node.data.label_object != undefined) {
          scene.remove( node.data.label_object );
          node.data.label_object = undefined;
        }
      }
    }

    // render selection
    if(that.selection) {
      object_selection.render(scene, camera);
    }

    // update stats
    if(that.show_stats) {
      stats.update();
    }

    // render scene
    renderer.render( scene, camera );
  }

  /**
   *  Prints info from the attribute info_text.
   */
  function printInfo(text) {
    var str = '';
    for(var index in info_text) {
      if(str != '' && info_text[index] != '') {
        str += " - ";
      }
      str += info_text[index];
    }
    document.getElementById("graph-info").innerHTML = str;
  }

  // Generate random number
  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  // Stop layout calculation
  this.stop_calculating = function() {
    graph.layout.stop_calculating();
  }

  var updateSummaryBox = function(obj) {
    // display info
    if(obj != null && obj.parent.hasOwnProperty('name') && obj.parent.name != "Central Node") {
      var thisNode = graph.nodes.find(function(n) {
          return n.data.title == obj.parent.name
        });
      if (thisNode != undefined) {
        var $output = $('#output_box');

        $output.empty();

        $output.append('<p>TABLE SUMMARY</p><h2>' + thisNode.data.title + '</h2><h4>'
          + thisNode.data.size + ' record(s)<hr/></h4><h4>columns:</h4><ul>');
        for (var i = 0; i < thisNode.data.columns.length; i++) {
          $output.append('<li>' + thisNode.data.columns[i] + '</li>');
        }
        $output.append('</ul>');
        if (thisNode.nodesTo.length > 0) {
          $output.append('<hr/><h4>child tables:</h4><ul>');
          for (var i = 0; i < thisNode.nodesTo.length; i++) {
            $output.append('<li>' + thisNode.nodesTo[i].data.title + '</li>');
          }
          $output.append('</ul>');
        }
        if (thisNode.nodesFrom.length > 0 && !(thisNode.nodesFrom.length == 1 && thisNode.nodesFrom[0].data.title == "Central Node")) {
          $output.append('<hr/><h4>parent tables:</h4><ul>');
          for (var i = 0; i < thisNode.nodesFrom.length; i++) {
            if (thisNode.nodesFrom[i].data.title != "Central Node") {
              $output.append('<li>' + thisNode.nodesFrom[i].data.title + '</li>');
            }
          }
          $output.append('</ul>');
        }
      } else {
        $('#output_box').empty();
      }
    }
  }

  var brighten = function(colString) {
    var red = Number(colString.toString().substring(2,4));
    var green = Number(colString.toString().substring(4,6));
    var blue = Number(colString.toString().substring(6));
    // console.log(colString + ": " + red + " " + green + " " + blue);
    var hsl = rgbToHsl(red,green,blue);
    hsl[2] += 0.25;
    var rgb = hslToRgb(hsl[0], hsl[1], hsl[2] + 0.25);
    return rgb(rgb[0], rgb[1], rgb[2]);
  }
}
