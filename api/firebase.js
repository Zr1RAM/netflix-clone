// const admin = require('firebase-admin');

// admin.initializeApp({
//     credential: admin.credential.cert({

//     }),
//     databaseURL: "gs://netflix-clone-7b618.appspot.com"
// });
// const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require('../dont/netflix-clone-7b618-firebase-adminsdk-3ow50-fa3f41d393.json');

//const app = initializeApp();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_URL,
    databaseURL: process.env.REALTIME_DATABASE_URL,
});

const bucket = admin.storage().bucket();

const db = admin.database();

// const setCustomClaims = async (uid) => {
//     try {
//         await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
//         console.log(`Custom claims set for user ${uid}`);
//     } catch (error) {
//         console.error('Error setting custom claims: ', error);
//     }
// }

// // Sign Up
// const signUpFirebase = async (email, password) => {
//     try {
//       const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
//       console.log(userCredential.user);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   // Login
//   const loginFirebase = async (email, password) => {
//     try {
//       const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
//       console.log(userCredential.user);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

module.exports = { admin, bucket, db };

