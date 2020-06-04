import React, { useState, useEffect } from "react";
import { Box, Button, TextField, TextArea, Spinner } from "gestalt";

import ColoredBox from "../components/ui/ColoredBox";
import Text from "../components/ui/Text";

import AppContext from "../contexts/appContext";

function Contact() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(false);
	const [sent, setSent] = useState(false);

	const { _toggleError } = React.useContext(AppContext);

	useEffect(() => {
		if (sent) setTimeout(() => setSent(false), 1000);
	}, [sent]);

	useEffect(() => {
		document.getElementsByTagName("meta")["theme-color"].content =
			"#10EFD4";
		document.getElementsByTagName("title")[0].text = "Contact";
	}, []);

	const sendMessage = async () => {
		await fetch(`${process.env.REACT_APP_API}/messages`, {
			method: "POST",

			body: JSON.stringify({
				name,
				email,
				message,
			}),

			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then(() => {
				setName("");
				setEmail("");
				setMessage("");
				setLoading(false);
				setSent(true);
			})
			.catch((error) => {
				setLoading(false);
				_toggleError();
			});
	};

	return (
		<Box width="100%" height="100vh" display="flex" alignItems="center">
			<ColoredBox
				width="100%"
				height="100vh"
				display="flex"
				direction="column"
				alignItems="center"
				justifyContent="center"
				color="#10EFD4"
				padding={10}
			>
				<Text primary size="10vmin" weight="light">
					Contact
					<span rol="img" accessibiltylabel="letter">
						{" "}
						💌
					</span>
				</Text>
				<Box>
					<Box marginTop={5}>
						<TextField
							id="name"
							onChange={({ value }) => setName(value)}
							placeholder="Your name.."
							label="Name"
							value={name}
							errorMessage={
								value && !name ? "how will i know you?" : null
							}
							type="text"
						/>
					</Box>
					<Box marginTop={5}>
						<TextField
							id="email"
							onChange={({ value }) => setEmail(value)}
							placeholder="Add email"
							label="Email"
							value={email}
							errorMessage={
								value && !email
									? "what if i want to reply?"
									: null
							}
							type="email"
						/>
					</Box>
					<Box marginTop={5}>
						<TextArea
							id="messsage"
							onChange={({ value }) => setMessage(value)}
							placeholder="Great Words..."
							label="Messsage"
							value={message}
							errorMessage={
								value && !message
									? "why are you here if you don't want to send a message?"
									: null
							}
						/>
					</Box>
					{sent && (
						<Text sm weight="light">
							Send!
						</Text>
					)}
					<Box marginTop={5}>
						{loading ? (
							<Spinner
								show={loading}
								accessibilityLabel="loading"
							/>
						) : (
							<Button
								text="Send"
								onClick={() => {
									setLoading(true);
									if (
										name !== "" &&
										email !== "" &&
										message !== ""
									)
										sendMessage();
									else {
										setValue(true);
										setLoading(false);
									}
								}}
								inline
								iconEnd={loading ? null : "send"}
								color="transparent"
							/>
						)}
					</Box>
				</Box>
			</ColoredBox>
		</Box>
	);
}

export default React.memo(Contact);
