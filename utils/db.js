import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';


var config = {
  apiKey: "AIzaSyBBty-qXLyyvTu9WZXbcdgHIxSLG1dp-Pk",
  authDomain: "family-6e10b.firebaseapp.com",
  databaseURL: "https://family-6e10b.firebaseio.com",
  projectId: "family-6e10b",
  storageBucket: "family-6e10b.appspot.com",
  messagingSenderId: "781054877135"
};
firebase.initializeApp(config);



const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export { db, firebase }