import React, { useState, useEffect, useContext } from "react";
import { Box } from "gestalt";

import ColoredBox from "../components/ui/ColoredBox";
import Text from "../components/ui/Text";
import { SpringAnimated } from "../components/ui/Animated";
import Post from "../components/ui/Post";

import AppContext from "../contexts/appContext";

import MrCarrot from "../images/blog.svg";

function useFetch(url) {
	const [data, setData] = useState([{}, {}]);

	const { state, dispatch } = useContext(AppContext);

	useEffect(() => {
		let isMounted = true;
		document.getElementsByTagName("meta")["theme-color"].content =
			"#FF9671";
		document.getElementsByTagName("title")[0].text = "Blog!";

		async function getData() {
			if (!state.posts || state.posts === [])
				await fetch(url)
					.then((res) => res.json())
					.then((result) => {
						if (!result?.error && !result?.statusCode) {
							dispatch({
								type: "add_posts",
								payload: result.reverse(),
							});
							setData(result);
						} else console.log(result.message);
					});
			else setData(state.posts);
		}
		if (isMounted) getData();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, []);
	return [data];
}

function Blog() {
	const [posts] = useFetch(`${process.env.REACT_APP_API}/posts`);
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
				smDirection="column"
				mdDirection="row"
				lgDirection="row"
				orange
			>
				<SpringAnimated component={Text} weight="bold" size={"25vmin"}>
					Blog!
				</SpringAnimated>
				{!!MrCarrot && (
					<img
						style={{ padding: 20 }}
						alt="MrCarrot"
						src={MrCarrot}
						width="auto"
						height="50%"
					/>
				)}
			</ColoredBox>

			<ColoredBox
				id="projects"
				width="100%"
				primary
				minHeight="100vh"
				display="flex"
				alignItems="start"
				justifyContent="center"
				direction="row"
			>
				<Box
					width="100%"
					marginTop={12}
					marginBottom={12}
					display="flex"
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					{posts &&
						posts.map((item, i) => <Post item={item} key={i} />)}
				</Box>
			</ColoredBox>
		</Box>
	);
}

export default React.memo(Blog);
