import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Button, StyleSheet } from "react-native";
// ? Connect to redux
import { connect } from "react-redux";

function Feed(props) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let posts = [];
		// ? if users loaded, update posts to display
		if (props.usersLoaded === props.following.length) {
			for (let i = 0; i < props.following.length; i++) {
				const user = props.users.find((el) => el.uid === props.following[i]);
				if (user !== undefined) {
					posts = [...posts, ...user.posts];
				}
			}
			posts.sort((x, y) => {
				// ? if x.creation is bigger -> return possitive
				return x.creation - y.creation;
			});
		}
		setPosts(posts);
	}, [props.usersLoaded]);
	return (
		<View style={styles.container}>
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Text style={styles.container}>{item.user.name}</Text>
							<Image style={styles.image} source={{ uri: item.downloadURL }} />
						</View>
					)}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	infoContainer: {
		margin: 20,
	},
	galleryContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
	imageContainer: {
		flex: 1 / 3,
	},
});
// ? cập nhật khi state của user thay đổi
const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	following: store.userState.following,
	users: store.usersState.users,
	usersLoaded: store.usersState.usersLoaded,
});

export default connect(
	mapStateToProps,
	null /* call on any action, so this be null */
)(Feed);
