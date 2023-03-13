/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: `Sponsor WP Contributors`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-transformer-yaml",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "contributors",
				path: `./src/contributors/`,
			},
		},
	],
};
