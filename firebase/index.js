import { initializeApp } from "firebase/app";
import { env } from "../customEnv";
const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORE_BUCKET,
	messagingSenderId: env.MESSAGING_SENDER_ID,
	appId: env.APP_ID,
	measurementId: env.MEASUREMENT_ID,
};
export const app = initializeApp(firebaseConfig);
