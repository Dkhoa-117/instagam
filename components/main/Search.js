import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { app } from "../../firebase";
import {
	getFirestore,
	getDocs,
	collection,
	where,
	query,
} from "firebase/firestore";
const firestore = getFirestore(app);

export default function Search(props) {
	const [users, setUsers] = useState([]);
	// ? search on user type
	const fetchUsers = (search) => {
		getDocs(
			query(collection(firestore, "users"), where("name", ">=", search))
		).then((snapshot) => {
			let users = snapshot.docs.map((doc) => {
				const id = doc.id;
				const data = doc.data();
				return { id, ...data };
			});
			setUsers(users);
		});
	};
	return (
		<View>
			<TextInput
				placeholder="Search Here..."
				onChangeText={(search) => fetchUsers(search)}
			/>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate("Profile", { uid: item.id })
						}
					>
						<Text>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
