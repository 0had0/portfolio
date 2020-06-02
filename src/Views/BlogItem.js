import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Box, IconButton, TextField, TextArea, Button } from "gestalt";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Text from "../components/ui/Text";
import ColoredBox from "../components/ui/ColoredBox";

import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import theme from "../components/theme";

import AppContext from "../contexts/appContext";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
	justify-content: start;
	align-items: start;
	* {
		color: ${theme.text.white};
	}
	h3 {
		color: yellow;
	}
	p {
		color: ${theme.text.grey};
	}
	a {
		text-decoration: underline;
	}
`;

function BlogItem() {
	let { id } = useParams();
	const [item, setItem] = useState({});
	const [error, setError] = useState(false);
	const { state } = useContext(AppContext);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [value] = useState(false);
	useEffect(() => {
		let isMounted = true;
		document.getElementsByTagName("meta")["theme-color"].content =
			"rgb(13, 22, 36)";
		async function getData() {
			await fetch(`${process.env.REACT_APP_API}/posts/${id}`)
				.then((res) => res.json())
				.then((result) => {
					if (!result?.error && !result?.statusCode) setItem(result);
					else setError(true);
				});
		}
		if (isMounted) {
			if (!state.posts) getData();
			// eslint-disable-next-line
			else setItem(state.posts.filter((item) => item.id == id).pop());
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (item?.title) {
			document.getElementsByTagName("title")[0].text = item.title;
		}
	}, [item]);

	const handleSubmitComment = async (event) => {
		event.preventDefault();
		await fetch(`${process.env.REACT_APP_API}/comments`, {
			method: "POST",

			body: JSON.stringify({
				name,
				comment: message,
				post: item,
			}),

			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then(async (result) => {
				if (!result?.error) {
					setName("");
					setMessage("");
					return await fetch(
						`${process.env.REACT_APP_API}/posts/${item.id}`
					)
						.then((res) => res.json())
						.then((result) => {
							if (!result?.error) {
								setItem({ ...item, comments: result.comments });
							}
						});
				}
			});
	};

	return error ? (
		<Redirect to="/blog" />
	) : (
		<Box width="100%" display="flex" direction="column" alignItems="center">
			<div
				style={{
					position: "fixed",
					top: "30px",
					left: "20px",
					borderRadius: "50%",
					backgroundColor: "white",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "40px",
					height: "40px",
				}}
			>
				<IconButton
					accessibilityLabel="back"
					bgColor="white"
					icon="arrow-back"
					iconColor="darkGray"
					onClick={() => {
						window.location.href = "/blog";
					}}
				/>
			</div>
			<ColoredBox
				width="100%"
				minHeight="100vh"
				display="flex"
				direction="column"
				alignItems="center"
				justifyContent="center"
				padding={5}
				primary
			>
				<Box
					display="flex"
					direction="column"
					alignItems="center"
					justifyContent="start"
					marginTop={10}
				>
					<Text size={"8vmin"} weight="light">
						{item?.title || (
							<SkeletonTheme
								color="#192D4B"
								highlightColor="#192D4B"
							>
								<Box
									width={100}
									display="flex"
									direction="column"
								>
									<Skeleton width={100} count={1} />
								</Box>
							</SkeletonTheme>
						)}
					</Text>
					<br />
					<Text sm weight="light" color="rgba(255, 255, 255, 0.4)">
						{item?.description || (
							<SkeletonTheme
								color="#192D4B"
								highlightColor="#192D4B"
							>
								<Box
									width={300}
									display="flex"
									direction="column"
								>
									<Skeleton width={300} count={2} />
								</Box>
							</SkeletonTheme>
						)}
					</Text>
					<Box
						height="50vmin"
						alignItems="center"
						justifyContent="center"
						display="flex"
						padding={2}
					>
						{item?.image?.url ? (
							<img
								src={process.env.REACT_APP_API + item.image.url}
								height="100%"
								width="auto"
								alt={item.title}
							/>
						) : (
							<SkeletonTheme
								color="#192D4B"
								highlightColor="#192D4B"
							>
								<Skeleton
									width={120}
									circle={true}
									height={120}
								/>
							</SkeletonTheme>
						)}
					</Box>
				</Box>
				<Wrapper>
					{!item?.content ? (
						<SkeletonTheme color="#192D4B" highlightColor="#192D4B">
							<Box width={300} display="flex" direction="column">
								<Skeleton width={300} count={3} />
							</Box>
						</SkeletonTheme>
					) : (
						<ReactMarkdown source={item.content} />
					)}
				</Wrapper>
			</ColoredBox>
			<ColoredBox
				dark
				width="100%"
				display="flex"
				alignItems="center"
				direction="column"
				justifyContent="center"
				padding={10}
			>
				<ColoredBox
					dark
					width="100%"
					maxWidth={430}
					display="flex"
					alignItems="center"
					direction="column"
					justifyContent="center"
				>
					{item?.comments ? (
						item.comments.map((item, i) => (
							<ColoredBox
								key={i}
								rounding={4}
								display="flex"
								direction="column"
								padding={4}
								margin={2}
								width="100%"
								primary
							>
								<Text weight="bold">
									{item?.name || (
										<Skeleton width={50} count={1} />
									)}
								</Text>
								<Text>
									{item?.comment || (
										<Skeleton width={100} count={1} />
									)}
								</Text>
								<Text
									sm
									color="rgba(255, 255, 255, 0.3)"
									weight="light"
								>
									{item?.created_at.split("T")[0] || (
										<Skeleton width={25} count={1} />
									)}
								</Text>
							</ColoredBox>
						))
					) : (
						<React.Fragment>
							<ColoredBox
								rounding={4}
								display="flex"
								direction="column"
								padding={4}
								margin={2}
								width="100%"
								primary
							>
								<Text weight="bold">
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={70} count={1} />
									</SkeletonTheme>
								</Text>
								<Text>
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={140} count={1} />
									</SkeletonTheme>
								</Text>
								<Text
									sm
									color="rgba(255, 255, 255, 0.3)"
									weight="light"
								>
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={50} count={1} />
									</SkeletonTheme>
								</Text>
							</ColoredBox>
							<ColoredBox
								rounding={4}
								display="flex"
								direction="column"
								padding={4}
								margin={2}
								width="100%"
								primary
							>
								<Text weight="bold">
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={70} count={1} />
									</SkeletonTheme>
								</Text>
								<Text>
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={140} count={1} />
									</SkeletonTheme>
								</Text>
								<Text
									sm
									color="rgba(255, 255, 255, 0.3)"
									weight="light"
								>
									<SkeletonTheme
										color="#192D4B"
										highlightColor="#192D4B"
									>
										<Skeleton width={50} count={1} />
									</SkeletonTheme>
								</Text>
							</ColoredBox>
						</React.Fragment>
					)}
				</ColoredBox>
			</ColoredBox>
			<form onSubmit={handleSubmitComment} style={{ width: "100%" }}>
				<ColoredBox
					dark
					width="100%"
					padding={5}
					display="flex"
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					<Box>
						<Box marginTop={5}>
							<Box margin={1}>
								<Text>Name:</Text>
							</Box>
							<br />
							<TextField
								id="name"
								onChange={({ value }) => setName(value)}
								placeholder="Your name.."
								value={name}
								errorMessage={
									value && !name
										? "how will i know you?"
										: null
								}
								type="text"
							/>
						</Box>
						<Box marginTop={5}>
							<Box margin={1}>
								<Text>Comment:</Text>
							</Box>
							<br />
							<TextArea
								id="comment"
								onChange={({ value }) => setMessage(value)}
								placeholder="Great Words..."
								value={message}
								errorMessage={
									value && !message
										? "why are you here if you don't want to send a message?"
										: null
								}
							/>
						</Box>
						<Box margin={1}>
							<Button
								type="submit"
								text="Submit"
								disabled={name === "" || message === ""}
							/>
						</Box>
					</Box>
				</ColoredBox>
			</form>
		</Box>
	);
}

export default React.memo(BlogItem);
