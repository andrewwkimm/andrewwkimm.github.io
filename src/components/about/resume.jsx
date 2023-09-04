import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/resume.css";

const Resume = () => {
	return (
		<div className="Resume">
			<Card
				icon={faBriefcase}
				title="Work History"
				body={
					<div className="resume-body">
						<div className="work">
							<img
								src="./Elevance Health.jfif"
								alt="Elevance Health"
								className="company-image"
							/>
							<div className="company-name">
								Elevance Health
							</div>
							<div className="work-location">
								Remote, U.S.
							</div>
							<div className="job-title">
								Software Engineer
							</div>
							<div className="work-duration">
								March 2023 - Present
							</div>
						</div>

						<div className="work">
							<img
								src="./Hero Digital.jfif"
								alt="Hero Digital"
								className="company-image"
							/>
							<div className="company-name">
								Hero Digital
							</div>
							<div className="work-location">
								Remote, U.S.
							</div>
							<div className="job-title">
								Data Engineer
							</div>
							<div className="work-duration">
								August 2022 - January 2023
							</div>
						</div>

						<div className="work">
							<img
								src="./Analytic Partners.jfif"
								alt="Analytic Partners"
								className="company-image"
							/>
							<div className="company-name">
								Analytic Partners
							</div>
							<div className="work-location">
								New York, NY
							</div>
							<div className="job-title">
								Analyst
							</div>
							<div className="work-duration">
								September 2021 - August 2022
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Resume;
