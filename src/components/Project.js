import React, { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Box, IconButton, Mask } from "gestalt";

import Text from "./ui/Text";
import StyledProject from "./ui/Project";
import ColoredBox from "./ui/ColoredBox";

const Project = ({ item, ...props }) => {
	const [toggle, setToggle] = useState(false);
	const { big } = React.useMemo(() => props, [props]);
	const [fallback, setFallback] = useState(true);
	// eslint-disable-next-line
	const handleToggle = useCallback(() => setToggle(!toggle), [toggle]);
	const _onSrcError = useCallback(() => {
		setFallback(false);
	}, []);
	const { opacity } = useSpring({
		from: { opacity: 0 },
		opacity: toggle ? 1 : 0,
		config: { duration: 200 },
	});
	return (
		<SkeletonTheme color="#192D4B" highlightColor="#132239">
			<StyledProject
				big={big}
				color={item?.color || "transparent"}
				onMouseEnter={handleToggle}
				onMouseLeave={handleToggle}
			>
				{item?.color && item?.title && item?.image ? (
					<Box
						width="100%"
						height="100%"
						display="flex"
						alignItems="center"
						justifyContent="center"
						position="relative"
						padding={7}
						rounding={7}
					>
						{item.image?.url && fallback ? (
							<img
								src={`${item.image.url}`}
								onError={_onSrcError}
								alt={item?.title}
								width="auto"
								height="90%"
							/>
						) : null}
						<animated.div
							style={{
								width: "100%",
								height: "100%",
								position: "absolute",
								top: 0,
								left: 0,
								opacity,
							}}
						>
							<ColoredBox
								position="static"
								width="100%"
								height="100%"
								rounding={7}
								borderSize="sm"
								color="rgb(13, 22, 36)"
								display="flex"
								direction="column"
								alignItems="center"
								justifyContent="center"
							>
								<Text md weight="bold">
									{item?.title && item.title}
								</Text>
								<Box margin={5}>
									<a
										href={item?.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<IconButton
											accessibilityLabel="see more"
											icon="ellipsis"
											iconColor="white"
										/>
									</a>
								</Box>
							</ColoredBox>
						</animated.div>
					</Box>
				) : (
					<Mask width="100%" height="100%" rounding={7}>
						<Skeleton width="100%" height="100%" />
					</Mask>
				)}
			</StyledProject>
		</SkeletonTheme>
	);
};

export default React.memo(Project);
