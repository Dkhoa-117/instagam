import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Button, StyleSheet } from "react-native";
// ? Connect to redux
import { connect } from "react-redux";
import app from "../../firebase";
import { getAuth } from "firebase/auth";
import {
	getFirestore,
	getDoc,
	getDocs,
	doc,
	query,
	collection,
	orderBy,
	deleteDoc,
	setDoc,
} from "firebase/firestore";
const auth = getAuth(app);
const firestore = getFirestore(app);

function Profile(props) {
	// ? Display user searched profile
	const [user, setUser] = useState(null);
	const [userPosts, setUserPosts] = useState([]);
	const [following, setFollowing] = useState(false);

	useEffect(() => {
		const { currentUser, posts, following } = props;
		const uid = props.route.params.uid;
		if (props.route.params.uid === auth.currentUser.uid) {
			setUser(currentUser);
			setUserPosts(posts);
		} else {
			// ? get user searched data
			getDoc(doc(firestore, "users", auth.currentUser.uid))
				.then((snapshot) => {
					if (snapshot.exists) {
						setUser(snapshot.data());
					} else {
						console.log("user does not exists");
					}
				})
				.catch((error) => {
					console.log("Something went wrong");
				});
			// ? get user searched posts
			getDocs(
				query(
					collection(firestore, "posts", auth.currentUser.uid, "userPosts")
				),
				orderBy("creation", "asc")
			)
				.then((snapshot) => {
					let posts = snapshot.docs.map((doc) => {
						const data = doc.data();
						const id = doc.id;
						return {
							id,
							...data,
						};
					});
					setUserPosts(posts);
				})
				.catch((error) => {
					console.log("Something went wrong");
				});
		}
		console.log(props.following);
		if (props.following.indexOf(props.route.params.uid) > -1) {
			setFollowing(true);
		} else {
			setFollowing(false);
		}
	}, [props.route.params.uid, props.following]);

	const followUser = () => {
		setDoc(
			doc(
				firestore,
				"following",
				auth.currentUser.uid,
				"userFollowing",
				props.route.params.uid
			),
			{}
		); //.then(() => console.log("Follow"))
	};
	const unfollowUser = () => {
		deleteDoc(
			doc(
				firestore,
				"following",
				auth.currentUser.uid,
				"userFollowing",
				props.route.params.uid
			)
		); //.then(() => console.log("Unfollow"))
	};
	const signOut = () => {
		auth.signOut();
	};
	if (user === null) {
		return <View />;
	}
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text>{user.name}</Text>
				<Text>{user.email}</Text>
			</View>
			{props.route.params.uid !== auth.currentUser.uid ? (
				<View>
					{following ? (
						<Button title="Following" onPress={() => unfollowUser()} />
					) : (
						<Button title="Follow" onPress={() => followUser()} />
					)}
				</View>
			) : (
				<Button title="Sign Out" onPress={() => signOut()} />
			)}
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={3}
					horizontal={false}
					data={userPosts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: item.downloadURL }} />
						</View>
					)}
				/>
			</View>
		</View>
	);
}
// ? cập nhật khi state của user thay đổi
const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
	following: store.userState.following,
});

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
export default connect(
	mapStateToProps,
	null /* call on any action, so this be null */
)(Profile);
