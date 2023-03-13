import * as React from "react";
import ContributorList from "../components/contributor-list";
import Search from "../components/search";
import "../styles/global.scss";

const IndexPage = () => {
	return (
		<main>
			<h1>Sponsor WordPress Contributors</h1>
			<Search />
			<section className="contributor-list">
				<ContributorList />
			</section>
		</main>
	);
};

export default IndexPage;
