import * as React from "react";
import ContributorList from "../components/contributor-list";
import Search from "../components/search";
import Footer from "../components/footer";
import "../styles/global.scss";

const IndexPage = () => {
	return (
		<main>
			<h1>Sponsor WordPress Contributors</h1>
			<div className="site-content">
				<Search />
				<section className="contributor-list">
					<ContributorList />
				</section>
			</div>

			<Footer />
		</main>
	);
};

export default IndexPage;
