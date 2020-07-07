import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	root: {
		marginTop: 0,
		height: "200vh",
		display: "flex",
		flexDirection: "row",
	},
}));

const Wrapper = (props) => {
	const classes = useStyles();
	const { components } = props;

	return (
		<div className={classes.root}>
			{components.length
				? components.map((El, i) => {
					const index = i;

					return (
						<El
							key={`wrapper${index}`}
							language="english"
						/>
					);
				})
				: `${components.length}`}
		</div>
	);
};

Wrapper.propTypes = {
	components: PropTypes.arrayOf(PropTypes.any),
};

Wrapper.defaultProps = {
	components: [],
};

export default Wrapper;
