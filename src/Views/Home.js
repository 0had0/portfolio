import React, { useState, useEffect } from "react";
import { Box } from "gestalt";

import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import ColoredBox from "../components/ui/ColoredBox";
import Project from "../components/Project";
import { SpringAnimatedImage, SpringAnimated } from "../components/ui/Animated";

import AppContext from "../contexts/appContext";

import me from "../images/me.jpg";
import me2 from "../images/0had0.svg";

function useFetch(url) {
	const [data, setData] = useState([{}, {}, {}]);
	const { _toggleError } = React.useContext(AppContext);

	useEffect(() => {
		let isMounted = true;
		async function getData() {
			await fetch(url)
				.then((res) => res.json())
				.then((result) => setData(result))
				.catch((err) => _toggleError());
		}
		if (isMounted) {
			getData();
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, []);
	return [data];
}

function Home() {
	const [projects] = useFetch(`${process.env.REACT_APP_API}/projects`);
	useEffect(() => {
		document.getElementsByTagName("meta")["theme-color"].content =
			"#2293FA";
		document.getElementsByTagName("title")[0].text = "Home";
	}, []);
	return (
		<Box width="100%" display="flex" direction="column" alignItems="center">
			<ColoredBox
				id="home"
				width="100%"
				height="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
				direction="column"
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					direction="column"
				>
					<Box margin={5}>
						<SpringAnimatedImage src={me} alt="me" />
					</Box>
					<SpringAnimated component={Text} lg weight="bold" primary>
						Hi I'm Hadi,
						<span role="img" aria-label="hand-wave">
							{" "}
							👋
						</span>
					</SpringAnimated>
					<SpringAnimated component={Text} lg weight="bold">
						Engineer & Full Stack Developer
					</SpringAnimated>
				</Box>
				<Box margin={2}>
					<SpringAnimated
						component={Text}
						md
						weight="normal"
						color="rgba(255, 255, 255, 0.5)"
					>
						Get Ready to turn your{" "}
						<Text md weight="bold" color="rgba(255, 255, 255, 0.9)">
							Idea
						</Text>{" "}
						into{" "}
						<Text md weight="bold" color="rgba(255, 255, 255, 0.9)">
							Reality
						</Text>
					</SpringAnimated>
				</Box>
				<SpringAnimated component={Box} margin={5}>
					<Button href="#projects">
						<i className="icon-grid large-icons icons"></i>
						&nbsp;&nbsp;See My Projects
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button href="/blog">
						<i className="icon-user large-icons icons"></i>
						&nbsp;&nbsp;Blog
					</Button>
				</SpringAnimated>
			</ColoredBox>
			<ColoredBox
				id="projects"
				width="100%"
				primary
				minHeight="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Box
					maxWidth="calc(40vmin *4)"
					height="90%"
					padding={12}
					display="flex"
					alignItems="center"
					justifyContent="center"
					direction="row"
					wrap
				>
					<Box
						display="flex"
						direction="column"
						alignItems="center"
						justifyContent="center"
					>
						<Box margin={3}>
							<Text weight="light" lg>
								My Projects!
							</Text>
						</Box>
						<Box margin={3}>
							<img
								style={{
									fontSize: "32px",
									maxWidth: "40vmin",
									height: "auto",
								}}
								src={me2}
								alt="me"
							/>
						</Box>
					</Box>
					{projects &&
						projects.map((item, i) => (
							<Project key={i} item={item} big={i === 0} />
						))}
				</Box>
			</ColoredBox>
		</Box>
	);
}

export default React.memo(Home);
