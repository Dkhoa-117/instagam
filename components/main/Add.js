import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	alert,
	TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function Add({ navigation } /** access navigation from App */) {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

	const [type, setType] = useState(CameraType.back);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			// ? Request Camera Permission
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === "granted");

			// ? Request Image Picker Permission
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === "granted");
		})();
	}, []);
	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			console.log(data.uri);
			setImage(data.uri);
		}
	};
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	if (hasCameraPermission === null || hasGalleryPermission === null) {
		return <View />;
	}
	if (hasCameraPermission === false || hasGalleryPermission == false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<Camera
					style={styles.camera}
					type={type}
					ratio={"1:1"}
					ref={(ref) => setCamera(ref)}
				/>
			</View>
			<Button
				onPress={() => {
					setType(
						type === CameraType.back ? CameraType.front : CameraType.back
					);
				}}
				title="Flip Image"
			/>
			<Button title="Take Picture" onPress={() => takePicture()} />
			<Button title="Pick Image from Gallery" onPress={() => pickImage()} />
			<Button
				title="Save"
				onPress={() => navigation.navigate("Save", { image })}
			/>
			{image && <Image style={styles.imageView} source={{ uri: image }} />}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
	},
	camera: {
		// ? force it to be 1:1
		flex: 1,
		aspectRatio: 1,
	},
	imageView: {
		flex: 1,
	},
});
