// eslint-disable-next-line import/no-extraneous-dependencies
const admin = require('firebase-admin');

// eslint-disable-next-line import/no-unresolved
const serviceAccount = require('./serviceAccount.json');
const {getStorage, ref, getDownloadURL, uploadBytesResumable } = require('@firebase/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket : "gs://memoli-4611d.appspot.com"
});





module.exports = { admin }