import {initializeApp, FirebaseApp, getApp} from "firebase/app";
import "firebase/auth";
import {getFirestore} from "firebase/firestore";


export let app: FirebaseApp;



try {
    app = getApp("app");
} catch (error) {
    app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);
export default firebase;

export const db = getFirestore(app);
