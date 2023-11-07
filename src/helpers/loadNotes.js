import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error('EL UID del usuario no existe'); 
    
    //para traerlo de firebase v8
    // const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`); 
    // const docs = await getDocs(collectionRef);
  
    //para traerlo de firebase: 
    const docs = await getDocs(query(collection(FirebaseDB, `${uid}/journal/notes`))) 
    const notes = [];
    docs.forEach(doc => 
            notes.push({id: doc.id, ...doc.data()})
        ); 
        
        return notes

}