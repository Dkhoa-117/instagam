import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Button, StyleSheet } from "react-native";
import { container, utils } from "../../styles";
// ? Connect to redux
import { connect } from "react-redux";
//firebase
import {
	getFirestore,
	doc,
	setDoc,
	deleteDoc,
	updateDoc,
	increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
const firestore = getFirestore(app);
const auth = getAuth(app);

function Feed(props) {
	const [posts, setPosts] = useState([]);

	const onUserLike = (uid, postID) => {
		setDoc(
			doc(
				firestore,
				"posts",
				uid,
				"userPosts",
				postID,
				"likes",
				auth.currentUser.uid
			),
			{}
		).then(() => {
			console.log("like");
			updateDoc(doc(firestore, "posts", uid, "userPosts", postID), {
				likesCount: increment(1),
			});
		});
	};

	const onUserDislike = (uid, postID) => {
		deleteDoc(
			doc(
				firestore,
				"posts",
				uid,
				"userPosts",
				postID,
				"likes",
				auth.currentUser.uid
			)
		).then(() => {
			console.log("dislike");
			updateDoc(doc(firestore, "posts", uid, "userPosts", postID), {
				likesCount: increment(-1),
			});
		});
	};

	useEffect(() => {
		// ? if users loaded, update posts to display
		if (
			props.usersFollowingLoaded === props.following.length &&
			props.following.length !== 0
		) {
			props.feed.sort((x, y) => {
				// ? if x.creation is bigger -> return possitive
				return x.creation - y.creation;
			});
		}
		setPosts(props.feed);
		console.log(props.feed);
	}, [props.usersFollowingLoaded, props.feed]);
	return (
		<View style={[container.container, utils.backgroundWhite]}>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={posts}
				renderItem={({ item }) => (
					<View style={[container.container, utils.backgroundWhite]}>
						<Text style={styles.container}>{item.user.name}</Text>
						<Image
							style={{ marginTop: 4, flex: 1, aspectRatio: 1 / 1 }}
							source={{ uri: item.downloadURL }}
						/>
						{item.isCurrentUserLiked ? (
							<Button
								title="Dislike"
								onPress={() => onUserDislike(item.user.uid, item.id)}
							/>
						) : (
							<Button
								title="Like"
								onPress={() => onUserLike(item.user.uid, item.id)}
							/>
						)}
						<Text
							onPress={() =>
								props.navigation.navigate("Comment", {
									postID: item.id,
									uid: item.user.uid,
								})
							}
						>
							View Comments...
						</Text>
					</View>
				)}
			/>
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
	feed: store.usersState.feed,
	usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(
	mapStateToProps,
	null /* call on any action, so this be null */
)(Feed);
