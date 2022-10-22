import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseObj from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA7Pl4VAqS6behM28bCiRDFTzF0-889RUc",
    authDomain: "sortpaginate.firebaseapp.com",
    projectId: "sortpaginate",
    storageBucket: "sortpaginate.appspot.com",
    messagingSenderId: "494814796787",
    appId: "1:494814796787:web:d3fca231d16dac53b95086"


  };
const app = firebase.initializeApp(firebaseConfig);
export default app;
export { firebaseObj };