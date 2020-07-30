import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBimIG8QPAnc4a1nob_JSvn1Owh8Bij3cg",
    authDomain: "insta-clone-7e098.firebaseapp.com",
    databaseURL: "https://insta-clone-7e098.firebaseio.com",
    projectId: "insta-clone-7e098",
    storageBucket: "insta-clone-7e098.appspot.com",
    messagingSenderId: "263615288519",
    appId: "1:263615288519:web:8c41f491d9a458d9fd5ae2",
    measurementId: "G-Y3LD3Y1XR6"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db,auth,storage }