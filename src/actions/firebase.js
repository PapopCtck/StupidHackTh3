import firebase from "../configs/firebase";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_CLEAR,
  FETCH_CONTENT_SUCCESS
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
              payload= { ...payload,
                digged:0,
                star :0
              }
              userRef.update(payload);
            } else {
              // เผื่อดึงข้อมูล 
              payload = {
                ...payload,
                digged: userDoc.data().digged,
                star: userDoc.data().star
              };
              transaction.update(userRef, payload);
            }

            dispatch({
              type: FETCH_USER_SUCCESS,
              payload: payload
            });
             return resolve("SUCCESS");
          });
         
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


//!--------------------------Leaderboards ------------------------//

export const fetchLeaderboards = () => (dispatch,getState)=> {
  db.collection('users').onSnapshot((snap)=>{
    var usersList = []
    snap.forEach((userRef)=> {
      usersList.push({ data: userRef.data(), id: userRef.id });
    })
    dispatch({type:FETCH_CONTENT_SUCCESS,payload:usersList})
  })
}



//!--------------------------Lotto ------------------------//

export const sendLotto = (lotto,image) => (dispatch,getState) => {
  const {auth} =getState()
  var payload = {
    ownerUid : auth.data.uid,
    date: new Date(),
    lotto:lotto
  }
    db.collection('lotto').add(payload).then((ref)=>{
      //upload image to Storage
      //firebase.storage().ref('lotto').child(ref.id+".jpg").put(  image file   )
      console.log(ref.id);
    })
    
}
