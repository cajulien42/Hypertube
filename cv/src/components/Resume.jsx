import React from "react";
import PropTypes from "prop-types";

import Project from "./Project";
import Education from "./Education";
import Experience from "./Experience";

import projects from "./projects";
import educations from "./educations";
import experiences from "./experiences";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	resume: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#edf2f4",
		width: "60vw",
	},
	head: {
		marginTop: 0,
		width: "60vw",
	},
	internship: {
		float: "right",
		width: "23vw",
		height: "5vw",
		backgroundColor: "#383e56",
		borderRadius: "0px 0px 0px 50px",
		textAlign: "center",
	},
	internshipContent: {
		marginLeft: "0.1vw",
		marginTop: "0.2vw",
		padding: "2px 10px 2px 10px",
		// color: "#edf2f4",
		color: "#fffffc",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "3.2vw",
	},
	title: {
		color: "#383e56",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "3vw",
		marginTop: "1vw",
	},
	projectsContainer: {
		marginLeft: "4vw",
		marginRight: "3vw",
		width: "54vw",
	},
	educationContainer: {
		marginTop: "2vw",
		marginLeft: "4vw",
		marginRight: "3vw",
		width: "54vw",
	},
	experienceContainer: {
		marginTop: "2vw",
		marginLeft: "4vw",
		marginRight: "3vw",
		width: "54vw",
	},
	projectList: {
		marginTop: "3vw",
	},
	educationList: {
		marginTop: "3vw",
	},
	experienceList: {
		marginTop: "3vw",
	},
}));

const Projects = (props) => {
	const classes = useStyles();
	const { language } = props ? props : "french";

	return (
		<div className={classes.resume}>
			<div className={classes.head}>
				<div className={classes.internship}>
					<div className={classes.internshipContent}>
						{language === "english" ? "Internship" : "Stage"}
					</div>
				</div>
			</div>
			<div key="projectsContainer" className={classes.projectsContainer}>
				<div className={classes.title}>
				{language === "english" ? "PROJECTS" : "PROJETS"}
				</div>
				<div key="projectList" className={classes.projectList}>
					{projects.map((project) => (
						<Project
							language={language}
							key={project.title}
							title={project.title}
							kind={project.kind}
							description={project.description}
							skills={project.skills}
						/>
					))}
				</div>
			</div>
			<div key="educationContainer" className={classes.educationContainer}>
				<div className={classes.title}>
					EDUCATION
				</div>
				<div key="educationList" className={classes.educationList}>
					{educations.map((education) => (
						<Education
							language={language}
							key={education.title.english}
							title={education.title}
							date={education.date}
							location={education.location}
						/>
					))}
				</div>
			</div>
			<div key="experienceContainer" className={classes.experienceContainer}>
				<div className={classes.title}>
					{language === "english" ? "WORK EXPERIENCE" : "EXPERIENCE PROFESSIONNELLE"}
				</div>
				<div key="experienceList" className={classes.experienceList}>
					{experiences.map((experience) => (
						<Experience
							language={language}
							key={experience.title.english}
							title={experience.title}
							kind={experience.kind}
							date={experience.date}
							location={experience.location}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

Projects.propTypes = {
	language: PropTypes.string,
};

Projects.defaultProps = {
	language: "french",
};

export default Projects;
