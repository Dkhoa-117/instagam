import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import MainScreen from "./components/Main";
import React, { Component } from "react";
import { View, Text } from "react-native";

// ? Configure Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
const store = configureStore({
	reducer: rootReducer,
});

import app from "./firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);

const Stack = createNativeStackNavigator();
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		};
	}
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					isLoadedIn: false,
					loaded: true,
				});
			} else {
				this.setState({
					isLoadedIn: true,
					loaded: true,
				});
			}
		});
	}
	render() {
		const { loaded, isLoadedIn } = this.state;
		if (!loaded) {
			return (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text>Loading...</Text>
				</View>
			);
		}
		if (!isLoadedIn) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							option={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
						></Stack.Screen>
						<Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			);
		}
		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
						<Stack.Screen
							name="Add"
							component={AddScreen}
							navigation={this.props.navigation}
						></Stack.Screen>
						<Stack.Screen
							name="Save"
							component={SaveScreen}
							navigation={this.props.navigation}
						></Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}
}
