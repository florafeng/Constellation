var React = require('react');

var NavBar = React.createClass({
	render() {
		return (
			<nav className="#212121 grey darken-4 ">

			    <div className="nav-wrapper">
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li><a href="http://graphit-live.herokuapp.com">Demo</a></li>
			        <li><a href="https://github.com/grrilla/constellation/">Github</a></li>
			      </ul>
			    </div>

			</nav>
			);
	}

});

module.exports = NavBar;
