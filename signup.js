    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx2QRNIFHudyl3hE_tE-Tn42TEWxYgtdI",
  authDomain: "voyageverse-55c42.firebaseapp.com",
  projectId: "voyageverse-55c42",
  storageBucket: "voyageverse-55c42.firebasestorage.app",
  messagingSenderId: "449904473607",
  appId: "1:449904473607:web:fa5dcaa7a682caa3d95ca2",
  measurementId: "G-GSXNLKXHR4"
};

      
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const signing=document.querySelector("#signingbtn");

signing.addEventListener("click", function(event){
  event.preventDefault();

  const gmail=document.querySelector(".gmail").value;
  const gpassword=document.querySelector(".gpassword").value;

  createUserWithEmailAndPassword(auth, gmail, gpassword)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Creating Account......");
    window.location.href="grand.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });

});