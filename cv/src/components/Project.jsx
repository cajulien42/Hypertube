import React from "react";
import PropTypes from "prop-types";
import Bubble from "./Bubble";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	project: {
		marginTop: "2vw",
	},
	title: {
		color: "#383e56",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "2vw",
	},
	kind: {
		marginTop: "0.2vw",
		color: "#8d99ae",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.6vw",
	},
	description: {
		color: "#383e56",
		marginTop: "0.2vw",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.6vw",
	},
	bubbles: {
		marginTop: "0.5vw",
		width: "70%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
}));

const Projects = (props) => {
	const classes = useStyles();
	const { language } = props ? props : "french";
	const { title, kind, description, skills } = props;

	return (
		<div className={classes.project}>
			<div className={classes.title}>
				{title}
			</div>
			<div className={classes.kind}>
				{`[${kind[language]}]`}
			</div>
			<div className={classes.description}>
				{description[language]}
			</div>
			<div className={classes.bubbles}>
				{skills.map((skill) => (
					<Bubble
						key={`${title}${skill}`}
						content={skill}
					/>
				))}
			</div>
		</div>
	);
};

Projects.propTypes = {
	language: PropTypes.string,
	title: PropTypes.string,
	kind: PropTypes.object,
	description: PropTypes.object,
	skills: PropTypes.array,
};

Projects.defaultProps = {
	language: "",
	title: "",
	kind: "",
	description: "",
	skills: [],
};

export default Projects;
