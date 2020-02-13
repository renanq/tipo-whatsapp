import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBf3p9J12i1eOrND4Ytz8seRqTsjgrCGUs",
  authDomain: "tipozap.firebaseapp.com",
  databaseURL: "https://tipozap.firebaseio.com",
  projectId: "tipozap",
  storageBucket: "tipozap.appspot.com",
  messagingSenderId: "694475003911",
  appId: "1:694475003911:web:57e9ae353bfb7b9218f2a2",
  measurementId: "G-FDJN99HXGK"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();