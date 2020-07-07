import React from "react";
import PropTypes from "prop-types";
// import { StyleSheet, Text, View } from 'react-native';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	bubble: {
		marginLeft: "0.2vw",
		marginRight: "0.2vw",
		width: "fit-content",
		height: "fit-content",
		backgroundColor: "#383e56",
		borderRadius: 3,
		marginBottom: "0.5vw",
	},
	bubbleContent: {
		padding: "1px 5px 1px 5px",
		color: "#fffffc",
		textAlign: "center",
		fontFamily: "Roboto, sans-serif",
		fontSize: "1.2vw",
	},
}));

const Bubble = (props) => {
	const classes = useStyles();
	const { content } = props ? props : null;

	return content ? (
		<div className={classes.bubble}>
			<div className={classes.bubbleContent}>
				{content}
			</div>
		</div>
	) : null;
};

Bubble.propTypes = {
	content: PropTypes.string,
};

Bubble.defaultProps = {
	content: null,
};

export default Bubble;
