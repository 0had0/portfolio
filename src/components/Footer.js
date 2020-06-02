import React from "react";

import { Box } from "gestalt";
import Button from "./ui/Button";
import ColoredBox from "./ui/ColoredBox";
import Text from "./ui/Text";
import Social from "./Social";

function Footer() {
	return (
		<ColoredBox id="contact" width="100%" minHeight="30vh" darker>
			<Box
				width="100%"
				height="30vh"
				padding={3}
				display="flex"
				direction="column"
				alignItems="center"
				justifyContent="between"
			>
				<Box margin={2}>
					<Button
						target="_blank"
						href="https://api.whatsapp.com/send?phone=96181841019"
						color="#33de4a"
					>
						Whatsapp
					</Button>
				</Box>
				<Social />
				<a
					href="https://hadi.engineer"
					style={{ textDecoration: "none" }}
				>
					<Text color="rgba(255, 255, 255, 0.8)">
						Hadi Houssainy
						<Text color="rgba(255, 255, 255,0.4)"> @2020</Text>
					</Text>
				</a>
			</Box>
		</ColoredBox>
	);
}

export default Footer;
