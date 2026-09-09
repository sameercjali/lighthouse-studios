// dynamic-content.js
// Include this script as type="module" in public pages.
// It loads website settings and collection content from Firestore.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getSiteSettings(){
  const s = await getDoc(doc(db,"site","settings"));
  return s.exists() ? s.data() : {};
}

export async function getCollection(name, sortField="createdAt"){
  try{
    const snap = await getDocs(query(collection(db,name), orderBy(sortField,"asc")));
    return snap.docs.map(d=>({id:d.id,...d.data()}));
  }catch{
    const snap = await getDocs(collection(db,name));
    return snap.docs.map(d=>({id:d.id,...d.data()}));
  }
}
