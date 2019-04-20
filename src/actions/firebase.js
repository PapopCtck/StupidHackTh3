import firebase from "../configs/firebase";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_CLEAR
} from "../configs/constants";
import { hist } from "../index.js";
const db = firebase.firestore();

//!---------------------------- AUTH ---------------------------------

export const checkAuth = dispatch =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const dataUser = user.providerData[0];
        var payload = {
          displayName: dataUser.displayName,
          uid: user.uid,
          photoURL: dataUser.photoURL
        };

        const userRef = db.collection("users").doc(user.uid);
        db.runTransaction(transaction => {
          transaction.get(userRef).then(userDoc => {
            if (!userDoc.exists) {
              userRef.set(payload);
            } else {
              // เผื่อดึงข้อมูล
              transaction.update(userRef, payload);
            }

            dispatch({
              type: FETCH_USER_SUCCESS,
              payload: payload
            });
          });
          return resolve("SUCCESS");
        });
      } else {
        dispatch({ type: FETCH_USER_CLEAR });
        // not login yet
        return resolve("please login");
      }
    });
  });

export const signOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: FETCH_USER });
    });
  hist.push("/login");
};
