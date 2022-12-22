import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import React, { Component } from "react";
import MainScreen from "./components/Main";
import { View, Text } from "react-native";

// ? Configure Redux
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

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
				<MainScreen />
			</Provider>
		);
	}
}
