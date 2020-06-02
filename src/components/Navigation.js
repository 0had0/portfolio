import React, { useContext } from "react";
import { Motion, spring, presets } from "react-motion";

import MenuContext from "../contexts/menuContext";

const UnstyledToggleButton = ({ onClick, toggle }) => (
	<svg
		viewBox="0 0 96 96"
		height="2.5em"
		onClick={onClick}
		style={{
			overflow: "visible",
			cursor: "pointer",
			// disable touch highlighting on devices
			WebkitTapHighlightColor: "rgba(0,0,0,0)",
			position: "fixed",
			top: "18px",
			right: "20px",
			zIndex: 99,
			color: toggle ? "#000" : "#fff",
			transition: "color 200ms ease",
		}}
	>
		<Motion
			style={{
				x: spring(toggle ? 1 : 0, presets.wobbly),
				y: spring(toggle ? 0 : 1, presets.wobbly),
			}}
		>
			{({ x, y }) => (
				<g
					id="navicon"
					fill="none"
					stroke="currentColor"
					strokeWidth="14"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line
						transform={`translate(${x * 12}, ${x * -7}) rotate(${x *
							45}, 7, 26)`}
						x1="7"
						y1="26"
						x2="89"
						y2="26"
					/>
					<line
						transform={`translate(${x * 12}, ${x * 7}) rotate(${x *
							-45}, 7, 70)`}
						x1="7"
						y1="70"
						x2="89"
						y2="70"
					/>
					<line
						transform={`translate(${x * -96})`}
						opacity={y}
						x1="7"
						y1="48"
						x2="89"
						y2="48"
					/>
				</g>
			)}
		</Motion>
	</svg>
);

function Navigation() {
	const { toggleMenu, toggle } = useContext(MenuContext);

	const handleToggle = React.useCallback(() => toggle(), [toggle]);
	return <UnstyledToggleButton toggle={toggleMenu} onClick={handleToggle} />;
}

export default React.memo(Navigation);
