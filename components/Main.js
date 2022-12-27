import React, { Component } from "react";
import { View, Text } from "react-native";
// ? Connect to redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	fetchUser,
	fetchUserPosts,
	fetchUserFollowing,
} from "../redux/actions";
import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);

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
		this.props.fetchUserPosts();
		this.props.fetchUserFollowing();
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
					name="Search"
					component={SearchScreen}
					navigation={this.props.navigation}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="magnify" size={26} color={color} />
						),
					}}
				/>
				<Tab.Screen
					// ? Custom the default navigation, open the new screen other than change it
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
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault();
							navigation.navigate("Profile", { uid: auth.currentUser.uid });
						},
					})}
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
	bindActionCreators(
		{ fetchUser, fetchUserPosts, fetchUserFollowing },
		dispatch
	);
export default connect(mapStateToProps, mapDispatchProps)(Main);
