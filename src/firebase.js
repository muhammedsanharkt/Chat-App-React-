import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtAeItr0FE05zE-wKIdobmniacLvWgOFY",
  authDomain: "chat-app-d201a.firebaseapp.com",
  databaseURL: "https://chat-app-d201a-default-rtdb.firebaseio.com",
  projectId: "chat-app-d201a",
  storageBucket: "chat-app-d201a.firebasestorage.app",
  messagingSenderId: "12949198330",
  appId: "1:12949198330:web:3291671c52af7001cac043"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);



export default app;