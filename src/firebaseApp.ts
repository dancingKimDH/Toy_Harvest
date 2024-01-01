import {initializeApp, FirebaseApp, getApp} from "firebase/app";
import "firebase/auth";
import {getFirestore} from "firebase/firestore";


export let app: FirebaseApp;

const firebaseConfig = {
    apiKey: "AIzaSyDLESmzFKIMT-e_zpAxBpqPa82Cuvoo49o",
    authDomain: "toy-harvest.firebaseapp.com",
    projectId: "toy-harvest",
    storageBucket: "toy-harvest.appspot.com",
    messagingSenderId: "702289016303",
    appId: "1:702289016303:web:6f252a4611cff91305321a",
    measurementId: "G-45YDVWFY59"
  };

try {
    app = getApp("app");
} catch (error) {
    app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);
export default firebase;

export const db = getFirestore(app);
