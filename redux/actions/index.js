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
	USERS_DATA_STATE_CHANGE,
	USERS_POSTS_STATE_CHANGE,
	CLEAR_DATA,
} from "../constants";
const firestore = getFirestore(app);
const auth = getAuth(app);

export function clearData() {
	return (dispatch) => {
		dispatch({ type: CLEAR_DATA });
	};
}
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
				console.log({ error });
			});
	};
}

export function fetchUserPosts() {
	return async (dispatch) => {
		getDocs(
			query(
				collection(firestore, "posts", auth.currentUser.uid, "userPosts"),
				orderBy("creation", "asc")
			)
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
			collection(firestore, "following", auth.currentUser.uid, "userFollowing"),
			(snapshot) => {
				let following = snapshot.docs.map((doc) => {
					const id = doc.id;
					return id;
				});
				dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
				// ? Call on fetch users data
				for (let i = 0; i < following.length; i++) {
					dispatch(fetchUsersData(following[i]));
				}
			}
		),
			(error) => {
				console.log({ fetch_user_following: error });
			};
	};
}

// ? fetching the data of users that the current user is following
export function fetchUsersData(uid) {
	return (dispatch, getState) => {
		const found = getState().usersState.users.some((el) => el.uid === uid);
		if (!found) {
			getDoc(doc(firestore, "users", uid))
				.then((snapshot) => {
					if (snapshot.exists) {
						let user = snapshot.data();
						user.uid = snapshot.id;
						dispatch({
							type: USERS_DATA_STATE_CHANGE,
							user,
						});
						// ? Call on fetch users following posts
						dispatch(fetchUsersFollowingPosts(user.uid));
					} else {
						console.log("user does not exists");
					}
				})
				.catch((error) => {
					console.log({ fetch_users_data: error });
				});
		}
	};
}

// ? fetching posts of users that the current user is following
export function fetchUsersFollowingPosts(uid) {
	return async (dispatch, getState) => {
		await getDocs(
			query(
				collection(firestore, "posts", uid, "userPosts"),
				orderBy("creation", "asc")
			)
		)
			.then((snapshot) => {
				// ? the uid is changing in runtime, re-define the uid to make sure it works.
				const uid = snapshot.docs[0].ref.path.split("/")[1];
				let user = getState().usersState.users.find((el) => el.uid === uid);
				// *            const uid = snapshot.query._.C_.path.segments[1] # this may work as well
				let posts = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return {
						id,
						...data,
						// ? make sure posts include user data to keep track on post
						user,
					};
				});
				dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
			})
			.catch((error) => {
				console.log({ fetch_following_posts: error });
			});
	};
}
