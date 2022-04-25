import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIi5QWjiuJZQCIGPiY42PknSqVDIM-cxc",
    authDomain: "blog-react-142c5.firebaseapp.com",
    projectId: "blog-react-142c5",
    storageBucket: "blog-react-142c5.appspot.com",
    messagingSenderId: "679408661256",
    appId: "1:679408661256:web:d142cd60dd73d337acb2bd",
    measurementId: "G-BELB96NZXT"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;