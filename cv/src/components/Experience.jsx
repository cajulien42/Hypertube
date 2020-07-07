/* eslint-disable no-extra-parens */
import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	experiences: {
		marginTop: "2vw",
	},
	title: {
		color: "#383e56",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "2vw",
	},
	kind: {
		fontWeight: "initial",
		marginTop: "0.2vw",
		color: "#8d99ae",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.6vw",
	},
	date: {
		marginTop: "0.2vw",
		color: "#8d99ae",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.6vw",
	},
	location: {
		color: "#383e56",
		marginTop: "0.2vw",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.6vw",
	},
}));

const Experiences = (props) => {
	const classes = useStyles();
	const { language } = props ? props : "french";
	const { title, date, location, kind } = props;

	return (
		<div className={classes.experiences}>
			<div className={classes.title}>
				{title[language]}
				{kind === "" ? (
					null
				) : (
					<div className={classes.kind}>
						{`[${kind[language]}]`}
					</div>
				)}
			</div>
			<div className={classes.location}>
				{location[language]}
			</div>
			<div className={classes.date}>
				{date[language]}
			</div>
		</div>
	);
};

Experiences.propTypes = {
	language: PropTypes.string,
	kind: PropTypes.object,
	title: PropTypes.object,
	date: PropTypes.object,
	location: PropTypes.object,
};

Experiences.defaultProps = {
	kind: {},
	language: "",
	title: {},
	date: {},
	location: {},
};

export default Experiences;
