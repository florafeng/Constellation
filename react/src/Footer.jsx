var React = require('react');
var TeamCard = require('./TeamCard.jsx');

var Footer = React.createClass({

	render() {

		var aboutMichael = "Michael does not claim to be an evangelist of anything other than the indomitable rule of logic and the power of the human spirit."
			+ " New challenges mock and emobolden him. When he's not writing code, you will find him pontificating on the beauty of structured data and code, and "
			+ "finding order and law in so-called 'unstructured' data. If he can imagine it, he will build it. Michael has studied CS and programming at numerous "
			+ "institutions. When he grows up, he wants to be a developer.";
		var aboutFlora = "Flora's most outstanding quality is her insatiable desire to learn. She values mentorship highly and is a studious individual with a "
			+ "foundation. Originally operating out of Beijing, Flora's lust for learning has brought her to Canada to study Computer Science at the University of Alberta "
			+ "in Edmonton, with a stint at Lighthouse Labs in Toronto. She will never stop absorbing new knowledge, and has a decades long plan to become a doctor.";

		return (
      <div className="footer">
				<h2>About the Project</h2>
				<div className="about">
					<p>
						Constellation began with the idea that data and structure is inherently unique and beautiful, much as nature is beautiful
						in its manner of occurence. The concept came from looking at examples of digital art that <i>could</i> have been derivative, but
						were actually arbitrary. Constructing physical, autonomous systems were already on the team's minds, and it was decided that they
						would together find a way to construct a layout of a data structure in a way almost anyone could understand and appreciate.
					</p>
					<p>
						It was very important that the project emulate a real concept - that is, imitate life, as art does - in order for it to be considered
						art by the team. For it to be truly derivative, as many elements would have to come from a data source as possible; for it to be autonomous,
						those elements would have to arrange themselves according to a set of rules, not instructions. It would have to be technical enough that
						devs could appreciate it, but abstracted enough that it could bridge the gap of understanding to the layman.
					</p>
					<p>
						The result was Constellation. As it took shape, many came forward with ideas of how to make it a useful and licensable tool.
						Some say it could be used by developer's to aid in normalization, while others say it could help understand complex legacy systems.
						Others still say it is an excellent educational tool for those learning RDB concepts for the first time. The team welcomes your ideas
						and look forward to an opportunity to co-operate with you on them or to see where you take them on your own.
					</p>
					<p>
						But the point of Constellation was not the destination. The team didn't know what they would need to do to realize their specific vision, and
						as many of the iceboxed concepts became possible, many of the usual functions were abandoned. Much like man's desire to put a man on the moon,
						sometimes we just need to see if we can get there.
					</p>
				</div>
				<div className="team-card">
					<h2>Meet the Team</h2>
					<p>What sort of people would come up with the Constellation concept and never look back? We're really glad you asked. Meet us.</p>
					<div className="row">
						<div className="center">
							<div className="col s12 m4 offset-m2">
								<TeamCard
									name="Michael Longauer"
									link="https://github.com/grrilla"
									blurb="Michael does not claim to be an evangelist of anything other than the indomitable rule of logic and the power of the human spirit. New challenges mock and emobolden him. When he's not writing code, you will find him pontificating on the beauty of structured data and code, and finding order and law in so-called 'unstructured' data. If he can imagine it, he will build it. Michael has studied CS and programming at numerous institutions. When he finally grows up, he wants to (still) be a developer."
									imageURL="./../build/classy.jpg"
								/>
						</div>
						<div className="col s12 m4">
							<TeamCard
								name="Flora Feng"
								link="https://github.com/florafeng"
								blurb="Flora's most outstanding quality is her insatiable desire to learn. She values mentorship highly and is a studious individual with a strong foundation in most faculties. If she doesn't have the answer, she will find it. Originally operating out of Beijing, Flora's lust for learning has brought her to Canada to study Computer Science at the University of Alberta in Edmonton, with a stint at Lighthouse Labs in Toronto. She will never stop absorbing new knowledge, and has expressed a decades long plan to become a doctor."
								imageURL="./../build/flora.jpg"
							/>
					</div>
						</div>
					</div>
				</div>
			<br/><hr/><br/>
				<div className="thanks">
					<h2>Special Thanks</h2>
					<p>To <a href="https://github.com/BruOp">Bruno Opsenica</a> of <a href="http://www.functionalimperative.com/">Functional Imperative</a>, for lending us his interest and expertise.</p>
					<p>To <a href="https://github.com/davidpiegza">David Piegza</a>, for his open source work which played such a crucial role.</p>
				</div>
      </div>
    )
  }
});

module.exports = Footer;
