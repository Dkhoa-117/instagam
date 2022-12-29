import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

// Firestore configuration
import { app } from "../../firebase";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";
const firestore = getFirestore(app);

export default function Comment(props) {
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
					setComments(comments);
				})
				.catch((error) => console.error({ error }));
			setPostID(props.route.params.postID);
		}
	}, [props.route.params.postID]);
	return (
		<View>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={comments}
				renderItem={({ item }) => <Text>{item.text}</Text>}
			></FlatList>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
