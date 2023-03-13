import React from "react";

const Contributor = ({ contributor, theKey }) => {
	const contributorLinks = contributor.links;
	const sponsorInfo = contributor.sponsor;
	return (
		<div className="contributor" key={`contributor-${theKey}`}>
			<h3 className="contributor__name">
				{contributor.url ? (
					<a href={contributor.url}>{contributor.name}</a>
				) : (
					contributor.name
				)}
			</h3>
			<ul className="contributor__links">
				{contributorLinks.map((link, index) => {
					const linkInfo = link.item;
					return (
						<li key={`contributor-${theKey}-link-${index}`}>
							{linkInfo.type}: <a href={linkInfo.url}>@{linkInfo.handle}</a>
						</li>
					);
				})}
				<li key="contributor-sponsor" className="contributor__sponsor">
					Sponsor: <a href={sponsorInfo.url}>{sponsorInfo.type}</a>
				</li>
			</ul>
		</div>
	);
};

export default Contributor;
