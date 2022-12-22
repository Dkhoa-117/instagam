import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: env.process.API_KEY,
	authDomain: env.process.AUTH_DOMAIN,
	projectId: env.process.PROJECT_ID,
	storageBucket: env.process.STORE_BUCKET,
	messagingSenderId: env.process.MESSAGING_SENDER_ID,
	appId: env.process.APP_ID,
	measurementId: env.process.MEASUREMENT_ID,
};
export const app = initializeApp(firebaseConfig);
