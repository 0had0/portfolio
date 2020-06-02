import React from "react";
import { Motion, spring, presets } from "react-motion";
import { Box } from "gestalt";

import { useSpring, animated } from "react-spring";

export const SpringAnimatedImage = ({ ...props }) => {
	const { width, opacity } = useSpring({
		from: { width: "10vh", opacity: 0 },
		width: "30vh",
		opacity: 1,
	});
	return (
		<animated.img
			style={{ width, opacity, height: "auto", borderRadius: "50%" }}
			{...props}
		/>
	);
};

export const AnimatedImage = ({ ...props }) => (
	<Motion defaultStyle={{ x: 10 }} style={{ x: spring(30, presets.wobbly) }}>
		{(interpolatingStyle) => (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				width="30vh"
				height="30vh"
			>
				<img
					style={{
						width: `${interpolatingStyle.x}vh`,
						height: "auto",
						borderRadius: "50%",
					}}
					alt="avatar"
					{...props}
				/>
			</Box>
		)}
	</Motion>
);

export const SpringAnimated = ({
	component: Component,
	children,
	...props
}) => {
	const { opacity, x } = useSpring({
		from: { opacity: 0, x: 100 },
		x: 0,
		opacity: 1,
	});
	return (
		<animated.div
			style={{
				opacity,
				transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
			}}
		>
			<Component {...props}>{children}</Component>
		</animated.div>
	);
};

function Animated({ component: Component, children, ...props }) {
	return (
		<Motion
			defaultStyle={{
				opacity: 0,
				x: 100,
			}}
			style={{
				opacity: spring(1, presets.wobbly),
				x: spring(0, presets.wobbly),
			}}
		>
			{(interpolatingStyle) => (
				<Component
					style={{
						transform: `translateY(${interpolatingStyle.x}%)`,
						...interpolatingStyle,
					}}
					{...props}
				>
					{children}
				</Component>
			)}
		</Motion>
	);
}

export default Animated;
