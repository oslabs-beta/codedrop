import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = {
  apiKey: "AIzaSyDHCoQ7eB6UDJk508a3Kr_KLQHVEaDnpn4",
  authDomain: "salesforce-363a7.firebaseapp.com",
  projectId: "salesforce-363a7",
  storageBucket: "salesforce-363a7.appspot.com",
  messagingSenderId: "104852192973",
  appId: "1:104852192973:web:eb2f587de8c71327d37384"
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;