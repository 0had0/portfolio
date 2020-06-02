import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "gestalt";
import { useSpring, animated } from "react-spring";

import Button from "./ui/Button";
import Text from "./ui/Text";

import Social from "./Social";

import MenuContext from "../contexts/menuContext";

function Menu() {
	const context = useContext(MenuContext);
	const { toggleMenu, toggle } = React.useMemo(
		() => ({ toggleMenu: context.toggleMenu, toggle: context.toggle }),
		[context.toggleMenu, context.toggle]
	);
	// eslint-disable-next-line
	const handleClose = React.useCallback(
		() => setTimeout(() => toggle(), 300),
		[toggle]
	);
	const { right } = useSpring({
		from: { right: toggleMenu ? 0 : -430 },
		right: toggleMenu ? 0 : -430,
	});
	return (
		<animated.div
			style={{
				width: window.innerWidth <= 430 ? "100%" : 400,
				height: "100vh",
				position: "fixed",
				top: 0,
				right,
				backgroundColor: "#fff",
				boxShadow: "4px 0 10px 1px #000",
				zIndex: 90,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-evenly",
			}}
		>
			<Text weight="bold" lg primary>
				Download CV{" "}
				<span role="img" aria-label="download">
					📩
				</span>
			</Text>

			<Box opacity={1}>
				<a
					href={`${process.env.REACT_APP_API}/uploads/cv_b9d6083191.pdf`}
					target="__blank"
				>
					<Text primary>
						<span role="img" aria-label="download">
							📥
						</span>
						&nbsp;CV 31-May-2020
					</Text>
				</a>
			</Box>

			<Button href="#" primary>
				Whatsapp
			</Button>

			<Box display="flex" direction="column" justifyContent="center">
				<Link to="/" onClick={handleClose}>
					<Text lg weight="light" primary>
						Home
					</Text>
				</Link>
				<Link to="/blog" onClick={handleClose}>
					<Text lg weight="light" primary>
						Blog
					</Text>
				</Link>
				<Link to="/contact" onClick={handleClose}>
					<Text lg weight="light" primary>
						Contact
					</Text>
				</Link>
			</Box>
			<Social dark />
		</animated.div>
	);
}

export default React.memo(Menu);
