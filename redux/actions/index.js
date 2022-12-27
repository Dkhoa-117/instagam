import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	orderBy,
	query,
	onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import {
	USER_STATE_CHANGE,
	USER_POSTS_STATE_CHANGE,
	USER_FOLLOWING_STATE_CHANGE,
} from "../constants";
const firestore = getFirestore(app);
const auth = getAuth(app);

export function fetchUser() {
	return (dispatch) => {
		getDoc(doc(firestore, "users", auth.currentUser.uid))
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
				} else {
					console.log("user does not exists");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchUserPosts() {
	return async (dispatch) => {
		getDocs(
			query(collection(firestore, "posts", auth.currentUser.uid, "userPosts")),
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
				dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchUserFollowing() {
	return async (dispatch) => {
		onSnapshot(
			collection(firestore, "following", auth.currentUser.uid, "userFollowing")
		)
			.then((snapshot) => {
				let following = snapshot.docs.map((doc) => {
					const id = doc.id;
					return id;
				});
				dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
