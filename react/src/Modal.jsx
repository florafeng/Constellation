var React = require('react');

var Modal = React.createClass({

	render() {
		return (

       <div id="loading-modal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Get Connected</h5>
            <p>Please enter the connection information for your remote database below.</p>
            <div className="row">
              <form className="col s12" method="post" action="http://localhost:3000/">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="host" name="host" type="text" className="validate" />
                    <label for="host">Hostname</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="db" name="db" type="text" className="validate" />
                    <label for="db">Database Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="user" name="user" type="text" className="validate" />
                    <label for="user">Username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="password" name="password" type="password" className="validate" />
                    <label for="password">Pasword</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="port" name="port" type="text" className="validate" />
                    <label for="port">Port</label>
                  </div>
                </div>
                <div className="input-field col s12 center">
                  <input id="submit" type="submit" value="Launch" className="btn-flat" />
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close btn-flat">Close</a>
          </div>
        </div>
      )
    }
  });

module.exports = Modal;
