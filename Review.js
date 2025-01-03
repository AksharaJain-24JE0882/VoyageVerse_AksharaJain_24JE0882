    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
    
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
          
    import { getFirestore, collection, getDoc , doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
    import { addDoc ,query, where , getDocs} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
          
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    
    // For saving data in cloud storage
    let addsub=document.querySelector(".addsub");
    
    // uploading photos of reviews in cloudinary
    
    let file=document.querySelector(".image");
    
    let reviewtext;
    let cloundinary_image_url;
    
    file.addEventListener("change", async (event) => {
      const image = event.target.files[0];
      let x = searchbar.value;
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Review_Images");
      data.append("cloud_name", "dsbh1drvf");
      const cloudinary = await fetch("https://api.cloudinary.com/v1_1/dsbh1drvf/image/upload", {
        method: "POST",
        body: data,
      });
      const uploadedImageURL = await cloudinary.json();
      alert("File Uploaded");
      cloundinary_image_url = uploadedImageURL.url;
    });
    
    addsub.addEventListener("click", async (event) => {
      event.preventDefault();
      let feedback = document.querySelector(".Feedback");
      reviewtext = feedback.value.trim();
      let x = searchbar.value;
      if (reviewtext === '') {
        alert("Enter Text");
      } else {
        alert("Review Submitted");
        const docRef = await addDoc(collection(db, x), {
          Reviews: reviewtext,
          urls: cloundinary_image_url,
        });
      }
    });
    
    
    
    // To retreive add back and show it on screen
    
    let read=document.querySelector(".Read");
    let publicreview=document.querySelector(".publicreview");
    let textAreaOfReview=document.querySelector(".reviewcontent");
    let explore=document.querySelector(".explore");
    let reviewimagebypublic=document.querySelector(".reviewimagebypublic");
    let Publicity=document.querySelector(".public");
    
    read.addEventListener("click",async(event)=>{
      event.preventDefault();
      publicreview.classList.remove("hide5");
      explore.classList.add("hide5");
      reviewform.classList.add("hidden");
    
      let x = searchbar.value ;
    
      const querySnapshot = await getDocs(collection(db, x));
      querySnapshot.forEach((doc) => {
    

      let a = doc.data().Reviews;
      let b = doc.data().urls;

      textAreaOfReview.innerHTML =  textAreaOfReview.innerHTML + `<u>${doc.id}</u>` + "  =>  " + "<br>"  + `<u>"Photo link"</u>` + "  =>  "  + ` "${b}" ` + "<br><br>" + a ;
      textAreaOfReview.innerHTML = textAreaOfReview.innerHTML+ "<br></br>" + "<hr><hr>" + "<br></br>" ;  
    
      });
    
    });
    
    