import React from "react";
import { Link } from "react-router-dom";
import { Box, Pog, Touchable } from "gestalt";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Text from "./Text";
import ColoredBox from "./ColoredBox";

function withTapEffectIf(condition, link, jsx) {
	if (!condition) return jsx;
	else
		return (
			<Link to={link}>
				<Touchable mouseCursor="pointer">{jsx}</Touchable>
			</Link>
		);
}

const Wrapper = ({ children, condition, link }) => (
	<Box width={"90%"} minHeight="50vmin">
		<SkeletonTheme color="#192D4B" highlightColor="#132239">
			{withTapEffectIf(condition, link, children)}
		</SkeletonTheme>
	</Box>
);

function Post({ item }) {
	return (
		<Wrapper link={`/blog/${item?.id}`} condition={item?.id && item?.title}>
			<Box
				dangerouslySetInlineStyle={{
					__style: {
						borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
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
							src={item.image.url}
							height="100%"
							width="auto"
						/>
					) : (
						<Box margin={10}>
							<Skeleton width={120} height={120} circle={true} />
						</Box>
					)}
				</Box>
				<Box display="flex" direction="column" flex="grow">
					<Box marginBottom={3}>
						<Text lg weight="normal" secondary>
							{item?.title || <Skeleton width="40vmin" />}
						</Text>
					</Box>
					<Text md weight="light" color="rgba(255, 255, 255, 0.4)">
						{item?.description || <Skeleton count={2} />}
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
					<Box display="flex" alignItems="center" paddingY={7} wrap>
						{(item?.flags?.data || ["", "", ""]).map((flag, i) => (
							<ColoredBox
								color={flag !== "" ? "white" : "#192D4B"}
								minWidth={100}
								display="flex"
								alignItems="center"
								rounding={5}
								paddingX={2}
								marginEnd={1}
								marginTop={1}
								key={i}
							>
								<Pog icon="tag" color="darkGray" />
								{flag !== "" && (
									<>
										<Text sm primary>
											{flag}&nbsp;
										</Text>
									</>
								)}
							</ColoredBox>
						))}
					</Box>
				</Box>
			</Box>
		</Wrapper>
	);
}

export default Post;
