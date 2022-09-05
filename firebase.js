import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDBnpZ-6vuz69rOeHVC8J42DRJBN11x90Y",
    authDomain: "ytshortsclone.firebaseapp.com",
    projectId: "ytshortsclone",
    storageBucket: "ytshortsclone.appspot.com",
    messagingSenderId: "837631274333",
    appId: "1:837631274333:web:1cebcf11755df6d8b20cb4"
  };

  let app;

  if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  export const db = app.firestore();
  export const auth = app.auth();
  export const storage = getStorage(app,'gs://ytshortsclone.appspot.com')