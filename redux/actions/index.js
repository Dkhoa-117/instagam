import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { USER_STATE_CHANGE } from "../constants";
const firestore = getFirestore(app);
const auth = getAuth(app);

export function fetchUser() {
	return (dispatch) => {
		getDoc(doc(firestore, "users", auth.currentUser.uid))
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
				} else {
					console.log("does not exists");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
