import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import photo from "./photo4.jpg";

import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles(() => ({
	identity: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		backgroundColor: "#383e56",
		width: "40vw",
		height: "100%",
		overflow: "hidden",
	},
	photoContainer: {
		zIndex: 9,
		position: "relative",
		marginTop: 0,
		width: "40vw",
		height: "40vw",
		overflow: "hidden",
	},
	photo: {
		position: "relative",
		width: "40vw",
		height: "45vw",
		marginTop: "-7px",
		zIndex: 9,
	},
	overlay: {
		position: "absolute",
		margin: 0,
		opacity: 0.2,
		background: "#383e56",
		width: "40vw",
		height: "45vw",
		zIndex: "10",
	},
	name: {
		textAlign: "center",
		marginTop: "6vw",
		color: "#fffffc",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "3vw",
	},
	job: {
		textAlign: "center",
		marginTop: "2.5vw",
		fontFamily: "Roboto, sans-serif",
		color: "#fffffc",
		fontSize: "1.8vw",
		fontWeight: "bold",
	},
	technical: {
		textAlign: "center",
		marginTop: "10vw",
		fontFamily: "Roboto, sans-serif",
		color: "#fffffc",
		fontSize: "2.2vw",
		fontWeight: "bold",
	},
	soft: {
		textAlign: "center",
		marginTop: "7vw",
		fontFamily: "Roboto, sans-serif",
		color: "#fffffc",
		fontSize: "2.2vw",
		fontWeight: "bold",
	},
	skills: {
		width: "32vw",
		marginLeft: "4vw",
		marginTop: "3vw",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},
	softSkills: {
		width: "32vw",
		marginLeft: "4vw",
		marginTop: "3vw",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},
	skill: {
		padding: "0.4vw",
		textAlign: "center",
		fontFamily: "Roboto, sans-serif",
		color: "#edf2f4",
		fontSize: "1.7vw",
	},
	contacts: {
		textAlign: "center",
		marginTop: "7vw",
		marginBottom: "3vw",
		fontFamily: "Roboto, sans-serif",
		color: "#fffffc",
		fontSize: "2.2vw",
		fontWeight: "bold",
	},
	contact: {
		width: "32vw",
		marginTop: "1vw",
		marginLeft: "5vw",
		padding: "0.4vw",
		textAlign: "center",
		fontFamily: "Roboto, sans-serif",
		color: "#edf2f4",
		fontSize: "1.8vw",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	contactElement: {
		paddingLeft: "1.5vw",
	},
}));

const Identity = (props) => {
	const classes = useStyles();
	const { language } = props ? props : "french";
	const skills = [
		"React",
		"Redux",
		"NodeJS",
		"Javascript",
		"Express",
		"MySQL",
		"MongoDB",
		"Neo4J",
		"PHP",
		"Material-UI",
		"Git",
		"JSON web token",
		"Postman",
		"SocketIO",
		"RESTful APIs",
		"Lodash",
		"Jest",
	];
	const softSkills = [
		"Fast learner",
		"Curiosity",
		"Team spirit",
		"Empathy",
		"Rigor",
	];

	return (
		<div className={classes.identity}>
			<div className={classes.photoContainer}>
				<div className={classes.overlay} />
				<img
					className={classes.photo}
					src={photo}
					alt="pic"
				/>
			</div>
			<div className={classes.name}>
				CAMILLE JULIEN
			</div>
			<div className={classes.job}>
				{language === "english" ? "FULLSTACK JAVASCRIPT DEVELOPER" : "DEVELOPPEUR JAVASCRIPT FULLSTACK"}
			</div>
			<div id="techtitle" className={classes.technical}>
				{language === "english" ? "TECHNICAL SKILLS" : "COMPETENCES TECHNIQUES"}
			</div>
			<div id="techskills" className={classes.skills}>
				{skills.map((skill) => (

					<div
						className={classes.skill}
						key={skill}
					>
						{skill}
					</div>
				),
				)}
			</div>
			<div id="softtitle" className={classes.soft}>
				{language === "english" ? "SOFT SKILLS" : "SOFT SKILLS"}
			</div>
			<div id="softskills" className={classes.softSkills}>
				{softSkills.map((skill) => (

					<div
						className={classes.skill}
						key={skill}
					>
						{skill}
					</div>
				),
				)}
			</div>
			<div className={classes.contacts}>
				CONTACT
			</div>
			<div className={classes.contact} key="phone">
				<PhoneIcon color="inherit" fontSize="inherit" />
				<div className={classes.contactElement}>
					+33 611 245 871
				</div>
			</div>
			<div className={classes.contact} key="mail">
				<MailIcon color="inherit" fontSize="inherit" />
				<div className={classes.contactElement}>
					cajulien@student.42.fr
				</div>
			</div>
			<div className={classes.contact} key="git">
				<GitHubIcon color="inherit" fontSize="inherit" />
				<div className={classes.contactElement}>
					github.com/cajulien42
				</div>
			</div>
			<div className={classes.contact} key="linkedin">
				<LinkedInIcon color="inherit" fontSize="inherit" />
				<div className={classes.contactElement}>
					linkedin.com/in/cajulien42
				</div>
			</div>
		</div>
	);
};

Identity.propTypes = {
	language: PropTypes.string,
};

Identity.defaultProps = {
	language: "french",
};

export default Identity;
