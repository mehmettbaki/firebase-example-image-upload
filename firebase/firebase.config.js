/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
require('dotenv').config()

const { initializeApp } = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// eslint-disable-next-line no-unused-expressions

async function uploader(file) {

  try {
    const storageRef = ref(storage, `images/${Date.now()+file.originalname }`);

    // Create file metadata including the content type
    const metadata = {
      contentType: 'image/jpeg',
    };
  
    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
  
    return downloadURL
    
  } catch (error) {
     throw new Error(error)
  }
  
}



module.exports = {firebaseApp, storage, uploader};
