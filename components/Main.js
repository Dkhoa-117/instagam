import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// ? Bottom Tab Navigator Initialize
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

const EmptyComponent = () => {
	return null;
};
export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<Tab.Navigator initialRouteName="Feed" labeled={false}>
				<Tab.Screen
					name="Feed"
					component={FeedScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" size={26} color={color} />
						),
					}}
				/>
				<Tab.Screen
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault();
							navigation.navigate("Add");
						},
					})}
					name="AddContainer"
					component={EmptyComponent}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="plus-box" size={26} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="account-circle"
								size={26}
								color={color}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		);
	}
}
const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
	bindActionCreators({ fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Main);
