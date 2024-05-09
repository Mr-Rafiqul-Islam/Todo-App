// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzCWIYSoQEKbkXvUdIQgkcaxI7eSgS51k",
  authDomain: "todo-list-48935.firebaseapp.com",
  projectId: "todo-list-48935",
  storageBucket: "todo-list-48935.appspot.com",
  messagingSenderId: "302366977573",
  appId: "1:302366977573:web:3ddf83db20e96aeb2599cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig