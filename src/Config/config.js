import * as firebase from "firebase";

const DB_CONFIG = {
  apiKey: "AIzaSyBEWLtwoWqSSFZvp7NoIyGUsPKpMa9hOdQ",
  apiSecret: "new-shopping-cart-1db9a.firebaseapp.com",
  authDomain: "new-shopping-cart-1db9a.firebaseapp.com",
  databaseURL: "https://new-shopping-cart-1db9a.firebaseio.com",
  projectId: "new-shopping-cart-1db9a",
  storageBucket: "new-shopping-cart-1db9a.appspot.com",
  messagingSenderId: "978677052518"
};

let output = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();

export default output;