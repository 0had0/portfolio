import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "gestalt";
import { useSpring, animated } from "react-spring";

import Button from "./ui/Button";
import Text from "./ui/Text";

import Social from "./Social";

import MenuContext from "../contexts/menuContext";

async function getLink(url, setLink) {
	return await fetch(url)
		.then((res) => res.json())
		.then((result) => {
			if (result?.link) setLink(result.link);
			else console.log(result.message);
		});
}

function useFetch(url) {
	const [link, setLink] = React.useState(null);
	React.useEffect(() => {
		let isMounted = true;
		if (isMounted && link === null) getLink(url, setLink);
		return () => (isMounted = false);
	}, [url]);
	return [link];
}

function Menu() {
	const context = useContext(MenuContext);
	const [link] = useFetch(`${process.env.REACT_APP_API}/cvs/1`);

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
				<a href={link} target="__blank">
					<Text primary>
						<span role="img" aria-label="download">
							📥
						</span>
						&nbsp;CV 31-May-2020
					</Text>
				</a>
			</Box>

			<Button
				href="https://api.whatsapp.com/send?phone=96181841019"
				target="__blank"
				primary
			>
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
