// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // ✅ Add Storage

const firebaseConfig = {
  apiKey: "AIzaSyDtAeItr0FE05zE-wKIdobmniacLvWgOFY",
  authDomain: "chat-app-d201a.firebaseapp.com",
  databaseURL: "https://chat-app-d201a-default-rtdb.firebaseio.com",
  projectId: "chat-app-d201a",
  storageBucket: "chat-app-d201a.appspot.com", // ✅ fix here (.app not needed)
  messagingSenderId: "12949198330",
  appId: "1:12949198330:web:3291671c52af7001cac043"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app); // ✅

export default app;
