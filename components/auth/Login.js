import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isValid, setIsValid] = useState(true);

	const onLogin = () => {
		if (email.length == 0 || password.length == 0) {
			setIsValid({
				bool: true,
				boolSnack: true,
				message: "Please fill out everything",
			});
			return;
		}
		if (password.length < 6) {
			setIsValid({
				bool: true,
				boolSnack: true,
				message: "passwords must be at least 6 characters",
			});
			return;
		}
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<TextInput
				placeholder="email"
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="password"
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>

			<Button onPress={() => onLogin()} title="Login" />
		</View>
	);
}
