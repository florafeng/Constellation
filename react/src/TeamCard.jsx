var React = require('react');

var TeamCard = React.createClass({

	render() {
		return (

          <div className="card">
            <div className="card-image">
              <img src={ this.props.imageURL } />
            </div>
            <div className="card-content grey darken-4">
              <h4>{ this.props.name }</h4>
              <p>{ this.props.blurb }</p>
            </div>
            <div className="card-action grey darken-3">
              <a href={ this.props.link }>Visit { this.props.name }'s Github</a>
            </div>
          </div>

    )
  }
});

module.exports = TeamCard;
