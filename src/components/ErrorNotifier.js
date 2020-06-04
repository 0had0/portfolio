import React from "react";
import { Box } from "gestalt";
import Text from "./ui/Text";

const ErrorNotifier = ({ error, toggleError }) => {
	React.useEffect(() => {
		error && setTimeout(() => toggleError(), 2000);
	}, [error]);
	return (
		error && (
			<Box
				position="fixed"
				width="100%"
				top
				left
				color="red"
				padding={2}
				display="flex"
				alignItems="center"
				justifyContent="center"
				dangerouslySetInlineStyle={{
					__style: {
						zIndex: 1000,
					},
				}}
			>
				<Text>error occurred please refresh the page</Text>
			</Box>
		)
	);
};

export default React.memo(ErrorNotifier);
