import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Contributor from "./contributor.js";

const ContributorList = () => {
	const allContributors = useStaticQuery(graphql`
		{
			allContributorsYaml {
				edges {
					node {
						name
						url
						links {
							item {
								type
								handle
								url
							}
						}
						sponsor {
							type
							url
						}
					}
				}
			}
		}
	`);
	const alphabetizedData = allContributors.allContributorsYaml.edges.sort(
		function (a, b) {
			if (a.node.name < b.node.name) {
				return -1;
			}
			if (a.node.name > b.node.name) {
				return 1;
			}
			return 0;
		},
	);
	return (
		<>
			{alphabetizedData.map((edge, index) => {
				if (edge.node.name !== "Placeholder") {
					return (
						<Contributor key={index} contributor={edge.node} theKey={index} />
					);
				}
			})}
		</>
	);
};

export default ContributorList;
