import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { app } from "../../firebase";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
	getFirestore,
	collection,
	serverTimestamp,
	addDoc,
} from "firebase/firestore";
// ! set up firebase
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export default function Save(props /** image pass along from Add */) {
	const [caption, setCaption] = useState("");
	const uploadImage = async () => {
		const uri = props.route.params.image;
		const response = await fetch(uri);
		const blob = await response.blob();
		// ? Create a reference to storage
		const storageRef = ref(
			storage,
			`post/${auth.currentUser.uid}/${Math.random().toString(36)}`
		);
		// ? Upload the image by blob
		const uploadTask = uploadBytesResumable(storageRef, blob);
		// ? Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// ? Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				switch (error.code) {
					case "storage/object-not-found":
						// ? File doesn't exist
						break;
					case "storage/unauthorized":
						// ? User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// ? User canceled the upload
						break;
					case "storage/unknown":
						// ? Unknown error occurred, inspect the server response
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					savePostData(downloadURL);
				});
			}
		);
	};
	const savePostData = (downloadURL) => {
		addDoc(
			collection(firestore, "posts/" + auth.currentUser.uid + "/userPosts"),
			{
				downloadURL,
				caption,
				creation: serverTimestamp(),
			}
		).then(() => {
			// ? Return to the Main page
			props.navigation.popToTop();
		});
	};
	return (
		<View style={{ flex: 1 }}>
			<Image source={{ uri: props.route.params.image }} />
			<TextInput
				placeholder="Write a Caption..."
				onChangeText={(caption) => setCaption(caption)}
			/>
			<Button title="Save" onPress={() => uploadImage()}></Button>
		</View>
	);
}
