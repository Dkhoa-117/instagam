import React from "react";
import { Text, View, Button } from "react-native";
export default function Landing({ navigation }) {
	return (
		<View style={{ justifyContent: "center", flex: 1 }}>
			<Button
				title="Register"
				onPress={() => navigation.navigate("Register")}
			/>
			<Button
				title="Login"
				onPress={() => navigation.navigate("Login")}
			></Button>
		</View>
	);
}
