import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const auth = getAuth(app);
const firestore = getFirestore(app);
export default function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [isValid, setIsValid] = useState(true);

	const onRegister = () => {
		if (
			name.length == 0 ||
			username.length == 0 ||
			email.length == 0 ||
			password.length == 0
		) {
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
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				setDoc(doc(firestore, "users", auth.currentUser.uid), {
					email,
					username,
					name,
				});
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<TextInput
				placeholder="Username"
				value={username}
				keyboardType="twitter"
				onChangeText={(username) =>
					setUsername(
						username
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
							.replace(/\s+/g, "")
							.replace(/[^a-z0-9]/gi, "")
					)
				}
			/>
			<TextInput placeholder="name" onChangeText={(name) => setName(name)} />
			<TextInput
				placeholder="email"
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="password"
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>

			<Button onPress={() => onRegister()} title="Register" />
		</View>
	);
}
