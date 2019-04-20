import firebase from "../configs/firebase";
import axios from 'axios';
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
              userRef.set(payload);
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
  db.collection('users').orderBy('star',"desc").onSnapshot((snap)=>{
    var usersList = []
    snap.forEach((userRef)=> {
      usersList.push({ data: userRef.data(), id: userRef.id });
    })
    dispatch({type:FETCH_CONTENT_SUCCESS,payload:usersList})
  })
}
export const fetchUserScore = (uid) => new Promise((resolve, reject) => {
  
  
  db.collection("lotto")
   .where("ownerUid", "==", uid)
    .onSnapshot(snap => {
      var list = [];
      snap.forEach(lottoRef => {
        list.push({ ...lottoRef.data() ,id:lottoRef.id});
      });
      list = list.sort((a, b) => {
        return b.date.toDate()-a.date.toDate();
      });
      resolve(list);
    });
});


//!--------------------------Lotto ------------------------//

export const sendLotto = (image) => (dispatch,getState) => {
  return new Promise((resolve, reject) => {
      const { auth } = getState();
      var payload = {
        ownerUid: auth.data.uid,
        date: new Date()
      };
      db.collection("lotto")
        .add(payload)
        .then(ref => {
          //upload image to Storage
          //firebase.storage().ref('lotto').child(ref.id+".jpg").put(  image file   )
          firebase
            .storage()
            .ref()
            .child("/" + ref.id + ".jpg")
            .put(image)
            .then(() => {
              axios
                .get(
                  "https://us-central1-stupidhackth3-a65a8.cloudfunctions.net/Dignumber",
                  { params: { data: ref.id + ".jpg" } }
                )
                .then(res => {
                  let ResponseData = res.data[0].textAnnotations;
                  ResponseData.map((item)=>{
                    function onlyUnique(value, index, self) { 
                      return self.indexOf(value) === index;
                  }
                    let Huay = item.description.match(/\d/g).map(Number)
                    let uniqueHuay = Huay.filter( onlyUnique );
                    console.log(uniqueHuay.sort())
                    // เอา uniqueHuay ไปใช้ได้เลย
                  })
                  resolve({ data: res.data ,id:ref.id});
                }).catch(err =>{});
            });
        }); 

  });
}
export const sendNumLotto = (numList,Lid) => (dispatch,getState) => {
  const { auth } = getState()
  db.collection('lottto').doc(Lid).update({
    lotto:numList
  })
}









export const getImgfromStorage = (fileName) => {
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref()
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        return resolve(url);
      })
      .catch(e => console.warn(e));
  });
};