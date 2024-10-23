import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
import "firebase/compat/database"; // Import the database module


const firebaseConfig = {
    apiKey: "AIzaSyDKN_-tUMGAChF7djJ7dubVApFzwwZcnos",
    authDomain: "cdps-manger.firebaseapp.com",
    projectId: "cdps-manger",
    storageBucket: "cdps-manger.appspot.com",
    messagingSenderId: "660493433374",
    appId: "1:660493433374:web:efa221b1bef559b9724c0f",
    measurementId: "G-JG3BVNSC15"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}; 