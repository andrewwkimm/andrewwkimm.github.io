import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Resume from "../components/about/resume.jsx";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<HelmetProvider>
			<React.Fragment>
				<Helmet>
					<title>{`About | ${INFO.main.title}`}</title>
					<meta name="description" content={currentSEO.description} />
					<meta
						name="keywords"
						content={currentSEO.keywords.join(", ")}
					/>
				</Helmet>

				<div className="page-content">
					<NavBar active="about" />
					<div className="content-wrapper">
						<div className="about-logo-container">
							<div className="about-logo">
								<Logo width={46} />
							</div>
						</div>

						<div className="about-container">
							<div className="about-main">
								<div className="about-right-side">
									<div className="title about-title">
										{INFO.about.title}
									</div>

									<div className="subtitle about-subtitle">
										{INFO.about.description}
									</div>
								</div>
							</div>
						</div>
						
						<div className="homepage-works">
							<Resume />
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</React.Fragment>
	</HelmetProvider>
	);
};

export default About;
