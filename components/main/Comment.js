import React, { useEffect, useState } from "react";
import {
	FlatList,
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
} from "react-native";

// Firestore configuration
import { app } from "../../firebase";
import {
	getFirestore,
	doc,
	getDocs,
	collection,
	addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firestore = getFirestore(app);
const auth = getAuth(app);

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsersData } from "../../redux/actions/index";

function Comment(props) {
	const [comments, setComments] = useState([]);
	const [postID, setPostID] = useState(); // ? Đảm bảo postID thay đổi để fetch data
	const [text, setText] = useState();
	useEffect(() => {
		if (props.route.params.postID !== postID) {
			getDocs(
				collection(
					firestore,
					"posts",
					props.route.params.uid,
					"userPosts",
					props.route.params.postID,
					"comments"
				)
			)
				.then((snapshot) => {
					let comments = snapshot.docs.map((doc) => {
						const id = doc.id;
						const data = doc.data();
						return { id, ...data };
					});
					matchUserToComment(comments);
				})
				.catch((error) => console.error({ error }));
			setPostID(props.route.params.postID);
		}
	}, [props.route.params.postID, props.users]);
	const matchUserToComment = (comments) => {
		for (let i = 0; i < comments.length; i++) {
			if (comments[i].hasOwnProperty("user")) {
				continue;
			}
			const user = props.users.find((x) => x.uid === comments[i].creator);
			if (user == undefined) {
				props.fetchUsersData(comments[i].creator, false);
			} else {
				comments[i].user = user;
			}
		}
		setComments(comments);
	};
	const sendComment = () => {
		addDoc(
			collection(
				firestore,
				"posts",
				props.route.params.uid,
				"userPosts",
				props.route.params.postID,
				"comments"
			),
			{ creator: auth.currentUser.uid, text }
		);
	};
	return (
		<View>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={comments}
				renderItem={({ item }) => (
					<View>
						{item.user == undefined ? null : <Text>{item.user.name}</Text>}
						<Text>{item.text}</Text>
					</View>
				)}
			></FlatList>
			<View>
				<TextInput
					placeholder="comment..."
					onChangeText={(text) => setText(text)}
				/>
				<Button onPress={() => sendComment()} title="Send" />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

// ? cập nhật khi state của user thay đổi
const mapStateToProps = (store) => ({
	users: store.usersState.users,
});
const mapDispatchProps = (dispatch) =>
	bindActionCreators({ fetchUsersData }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Comment);
