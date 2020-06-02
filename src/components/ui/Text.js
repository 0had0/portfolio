import React from "react";
import theme from "../theme";

const fontWeight = {
	normal: 300,
	bold: 400,
	light: 200,
};

const defaultOpacity = 1;
const Text = ({
	color,
	primary,
	secondary,
	dark,
	weight,
	lg,
	md,
	sm,
	size,
	opacity,
	style,
	children,
}) => {
	const Style = {
		display: "inline",
		opacity: opacity || defaultOpacity,
		fontSize: lg
			? "6vmin"
			: md
			? "4min"
			: sm
			? "3min"
			: size
			? size
			: "4min",
		fontWeight: fontWeight[weight] || fontWeight["normal"],
		color: color
			? color
			: dark
			? theme.dark
			: primary
			? theme.primary
			: secondary
			? theme.secondary
			: theme.text.white,
		...style,
	};
	return <span style={Style}>{children}</span>;
};

export default React.memo(Text);
