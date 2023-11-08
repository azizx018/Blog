import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-YQwIMpSTb09fsHzY9GeHQklNMd0S0Pc",
  authDomain: "react-blog-c1dfe.firebaseapp.com",
  projectId: "react-blog-c1dfe",
  storageBucket: "react-blog-c1dfe.appspot.com",
  messagingSenderId: "607333188413",
  appId: "1:607333188413:web:68672df87b5c2dcce77b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


