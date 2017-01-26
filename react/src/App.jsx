import React, {Component} from 'react';
var NavBar = require('./NavBar.jsx');
var MainContainer = require('./MainContainer.jsx');
var Footer = require('./Footer.jsx');

class App extends Component {
  render() {
    return (

      <div>
      	<MainContainer/>
        <Footer />

      </div>
  )}
}
export default App;
