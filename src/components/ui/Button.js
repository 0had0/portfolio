import React from "react";
import theme from "../theme";

const Button = ({ primary, secondary, dark, color, children, ...props }) => {
	const Styles = React.useMemo(
		() => ({
			root: {
				padding: "8px 20px",
				cursor: "pointer",
				border: `2px solid
			${
				primary
					? theme.primary
					: secondary
					? theme.secondary
					: dark
					? theme.dark
					: theme.white
			}`,
				borderRadius: "5px",
				color: primary
					? theme.primary
					: secondary
					? theme.secondary
					: dark
					? theme.dark
					: theme.white,
				background:
					primary || secondary || dark
						? "rgba(0,0,0,0.1)"
						: "rgba(255, 255, 255, 0.1)",
				transition: "all 100ms ease",
				textDecoration: "none",
			},
			root_hover: {
				background: color
					? color
					: primary || secondary || dark
					? "rgba(0,0,0,0.3)"
					: "rgba(255, 255, 255, 0.3)",
				color: primary
					? theme.primary
					: secondary
					? theme.secondary
					: dark
					? theme.dark
					: theme.white,
			},
		}),
		[primary, secondary, dark, color]
	);

	const [hover, setHover] = React.useState(false);
	// eslint-disable-next-line
	const handleHover = React.useCallback(() => setHover(!hover));
	return (
		<a
			onMouseEnter={handleHover}
			onMouseLeave={handleHover}
			style={
				hover ? { ...Styles.root, ...Styles.root_hover } : Styles.root
			}
			{...props}
		>
			{children}
		</a>
	);
};

export default React.memo(Button);
