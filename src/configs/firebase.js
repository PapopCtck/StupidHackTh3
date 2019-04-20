// Initialize Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// Required for side-effects
//require("firebase/firestore");
export const config = {
         apiKey: "AIzaSyD2xCm2jjZl6ZAGPB5ePPLjQpBKYNhJpjM",
         authDomain: "stupidhackth3-a65a8.firebaseapp.com",
         databaseURL: "https://stupidhackth3-a65a8.firebaseio.com",
         projectId: "stupidhackth3-a65a8",
         storageBucket: "stupidhackth3-a65a8.appspot.com",
         messagingSenderId: "773734968869"
       };

firebase.initializeApp(config);

export default firebase;
