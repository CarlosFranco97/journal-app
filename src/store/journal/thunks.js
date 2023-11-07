import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
export const startNewNote = () => {
    return async(dispatch, getState) => {
        
        dispatch(savingNewNote())

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        };
        const {uid} = getState().auth;
        
        const newDoc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote);
        newNote.id = newDoc.id
        
        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))
        
         //de esta forma se maneja con firebase v8
        // const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        // const setDocResp = await setDoc(newDoc, newNote);
        // newNote.id = newDoc.id
        // console.log({newDoc})
        
            
        //codigo version firebase v9
        // try {
        //      const newDoc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote)
        //      console.log({newDoc})
        //      newNote.id = newDoc.id; 
        //     }  catch(error) {
        //         console.log(error)
        //     } 
            
            

    } 
};

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        if(!uid) throw new Error('El UID del usuario no existe');
        //lamando el helper en mi thunk, aqui estoy cargando la nota. (lo hice en el helper para evitar tanto codigo)
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
};

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())
        //necesito ocupar nuevamente el uid del usuario para poder llegar a la ruta correspondiente
        const {uid} = getState().auth;
        //luego ocupare la nota activa
        const {active:note} = getState().journal;

        const noteToFirestore = {...note}
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true}); 
        
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = []; 
        for(const file of files) {
            fileUploadPromises.push(fileUpload(file))
        };
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls))
    }
};

export const startDeletingToNote = () => {
    return async(dispatch, getState) => {
        //obteniendo el uid
        const {uid} = getState().auth;
        //obteniendo la nota activa.
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        const resp = await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))
    }
}