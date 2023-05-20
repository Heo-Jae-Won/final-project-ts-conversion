import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAqBDwEwraZ3MHB-khZr29VxlUG_fGMON4",
  authDomain: "realproject-e311b.firebaseapp.com",
  projectId: "realproject-e311b",
  storageBucket: "realproject-e311b.appspot.com",
  messagingSenderId: "845497998235",
  appId: "1:845497998235:web:95c66bce181c450ec2df3e",
  measurementId: "G-DKS7K63BQS"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
