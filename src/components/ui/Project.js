import React from "react";
import { Box } from "gestalt";

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
			<Box
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
			</Box>
		</div>
	);
}

export default Project;
