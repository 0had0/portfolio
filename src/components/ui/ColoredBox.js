import React from "react";
import { Box } from "gestalt";
import theme from "../theme";

export default ({
	color,
	orange,
	primary,
	secondary,
	dark,
	darker,
	style,
	...props
}) => {
	return (
		<Box
			dangerouslySetInlineStyle={{
				__style: {
					...style,
					backgroundColor: color
						? color
						: orange
						? theme.orange
						: primary
						? theme.primary
						: secondary
						? theme.secondary
						: dark
						? theme.dark
						: darker
						? theme.darker
						: theme.background,
				},
			}}
			{...props}
		></Box>
	);
};
