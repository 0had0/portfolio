import React, { useState } from "react";

const A = React.memo(({ children, dark, ...props }) => {
	const [hover, setHover] = useState(false);
	const Styles = React.useMemo(
		() => ({
			a: {
				fontSize: "22px",
				textDecoration: "none",
				color: dark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
				margin: "0 0.25em",
				transition: "color 200ms ease",
			},
			Hovera: {
				color: dark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
			},
		}),
		[dark]
	);
	// eslint-disable-next-line
	const handleToggle = React.useCallback(() => setHover(!hover), [hover]);
	return (
		<a
			onMouseEnter={handleToggle}
			onMouseLeave={handleToggle}
			style={hover ? { ...Styles.a, ...Styles.Hovera } : Styles.a}
			{...props}
		>
			{children}
		</a>
	);
});

export default React.memo(({ dark }) => {
	const Styles = React.useMemo(
		() => ({
			root: {
				display: "flex",
			},
		}),
		[]
	);
	return (
		<div style={Styles.root}>
			<A dark={dark} href="https://github.com/0had0/">
				<i className="icon-social-github large-icons icons"></i>
			</A>
			<A dark={dark} href="https://www.instagram.com/hadihoussainy7575/">
				<i className="icon-social-instagram large-icons icons"></i>
			</A>
			<A dark={dark} href="https://www.linkedin.com/in/hadi-h-908832b3/">
				<i className="icon-social-linkedin large-icons icons"></i>
			</A>
		</div>
	);
});
