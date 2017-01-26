var React = require('react');
var NavBar = require('./NavBar.jsx');
var Modal = require('./Modal.jsx');

var MainContainer = React.createClass({

	render() {

		return (
			<div className="backgroundImg">
				<NavBar/>

				<div className="myContainer center">
				    <h1 className='brand-glow'>Constellation</h1>
				    <p className='white-text'>
				    	A new way of viewing your data structures.<br/>Experience and explore your database like never before.
				    </p>
				    <button className='btn modal-trigger grey darken-4' data-target='loading-modal'>Explore your system</button>
				</div>

				<Modal/>
			</div>

			)
	}

});

module.exports = MainContainer;
