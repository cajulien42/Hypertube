import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	education: {
		marginTop: "2vw",
	},
	title: {
		color: "#383e56",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "2vw",
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

const Education = (props) => {
	const classes = useStyles();
	const { language } = props ? props : "french";
	const { title, date, location } = props;

	return (
		<div className={classes.education}>
			<div className={classes.title}>
				{title[language]}
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

Education.propTypes = {
	language: PropTypes.string,
	title: PropTypes.object,
	date: PropTypes.object,
	location: PropTypes.object,
};

Education.defaultProps = {
	language: "",
	title: {},
	date: {},
	location: {},
};

export default Education;
