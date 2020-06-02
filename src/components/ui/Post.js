import React from "react";
import { Link } from "react-router-dom";
import { Box, Pog, Touchable } from "gestalt";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Text from "./Text";

function Post({ item }) {
	return (
		<Box width={"90%"} minHeight="50vmin">
			<Link to={`/blog/${item?.id}`}>
				<Touchable mouseCursor="pointer" onTouch={() => {}}>
					<Box
						dangerouslySetInlineStyle={{
							__style: {
								borderBottom:
									"1px solid rgba(255, 255, 255, 0.2)",
							},
						}}
						width={"100%"}
						minHeight="50vmin"
						display="flex"
						alignItems="center"
						justifyContent="center"
						position="relative"
						direction="column"
						smDirection="column"
						mdDirection="row"
						lgDirection="row"
						padding={10}
					>
						<Box
							height="50vmin"
							alignItems="center"
							justifyContent="center"
							display="flex"
							padding={2}
							minWidth={230}
							minHeight={230}
						>
							{item?.image?.url ? (
								<img
									alt={item.title}
									src={
										process.env.REACT_APP_API +
										item.image.url
									}
									height="100%"
									width="auto"
								/>
							) : (
								<Box margin={10}>
									<SkeletonTheme
										highlightColor="#132238"
										color="#fff"
									>
										<Skeleton width={120} height={120} />
									</SkeletonTheme>
								</Box>
							)}
						</Box>
						<Box display="flex" direction="column" flex="grow">
							<Box marginBottom={3}>
								<Text lg weight="normal" secondary>
									{item?.title || "Post Title"}
								</Text>
							</Box>
							<Text
								md
								weight="light"
								color="rgba(255, 255, 255, 0.4)"
							>
								{item?.description ||
									"Post description, Post description, Post description, Post description"}
							</Text>
							<Box marginTop={3}>
								<Text
									sm
									weight="light"
									color="rgba(255, 255, 255, 0.2)"
								>
									{item?.created_at?.split("T")[0] || null}
								</Text>
							</Box>
							<Box
								display="flex"
								alignItems="center"
								paddingY={7}
								wrap
							>
								{(
									item?.flags?.data || [
										"React",
										"javaScript",
										"CSS",
									]
								).map((flag, i) => (
									<Box
										color="white"
										display="flex"
										alignItems="center"
										rounding={5}
										paddingX={2}
										marginEnd={1}
										marginTop={1}
										key={i}
									>
										<Pog icon="tag" color="darkGray" />
										<Text sm primary>
											{flag || "React"}&nbsp;
										</Text>
									</Box>
								))}
							</Box>
						</Box>
					</Box>
				</Touchable>
			</Link>
		</Box>
	);
}

export default Post;
