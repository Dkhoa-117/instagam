import { combineReducers } from "redux";
import { user } from "./user";
import { users } from "./users";

const Reducers = combineReducers({
	userState: user,
	// ? another state for users that the current user is following.
	usersState: users,
});

export default Reducers;
