// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFaEJKSCrfyrO7o8m2uqFuNX5nwr0M7bs",
  authDomain: "imageupload-ebab7.firebaseapp.com",
  projectId: "imageupload-ebab7",
  storageBucket: "imageupload-ebab7.appspot.com",
  messagingSenderId: "309508967675",
  appId: "1:309508967675:web:e553eb9f321b173af4745e",
  measurementId: "G-EFCR89R247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);