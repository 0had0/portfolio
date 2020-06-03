import React from "react";
import ColoredBox from "./ColoredBox";

function Project({
	big,
	color,
	children,
	onMouseEnter,
	onMouseLeave,
	...props
}) {
	return (
		<div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
			<ColoredBox
				width={
					window.innerWidth <= 430
						? "65vmin"
						: big
						? "60vmin"
						: "40vmin"
				}
				height={
					window.innerWidth <= 430
						? "40vmin"
						: big
						? "40vmin"
						: "27vmin"
				}
				margin={2}
				rounding={7}
				color={color ? color : "blue"}
			>
				{children}
			</ColoredBox>
		</div>
	);
}

export default Project;
