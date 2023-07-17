// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTHDOMAIN,
//   projectId: process.env.FIREBASE_PROJECTID,
//   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.FIREBASE_APPID,
//   measurementId: process.env.FIREBASE_MEASUREMENTID,
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcq375PoKr-09DU1-8GWwILmyg39frMYM",
  authDomain: "admin-fmp-storage.firebaseapp.com",
  projectId: "admin-fmp-storage",
  storageBucket: "admin-fmp-storage.appspot.com",
  messagingSenderId: "116724955783",
  appId: "1:116724955783:web:add5138d5b33c3dc855622",
  measurementId: "G-2JYBC929J3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
