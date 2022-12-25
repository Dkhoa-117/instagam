import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
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
} from "firebase/firestore";
const auth = getAuth(app);
const firestore = getFirestore(app);

function Profile(props) {
	// ? Display user searched profile
	const [user, setUser] = useState(null);
	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const { currentUser, posts } = props;
		console.log({ currentUser, posts });

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
					console.log(error);
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
					console.log(posts);
					dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
					setUserPosts(posts);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [props.route.params.uid]);
	if (user === null) {
		return <View />;
	}
	return (
		// <FlatList>

		// </FlatList>
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text>{user.name}</Text>
				<Text>{user.email}</Text>
			</View>
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
