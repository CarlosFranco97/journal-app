import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//Función para la autenticación de Google
export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    
    //si necesito algo del credencial credencial
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
   
    const { uid, email, photoURL, displayName } = result.user;
      
    return {
        ok: true,
        //User info
        uid, 
        email,
        photoURL, 
        displayName
    }


  } catch(error) {
    
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
        ok: false, 
        errorMessage
    }
    
  }
};

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
  try {
     
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    
    const {uid, photoURL} = resp.user;

    await updateProfile(FirebaseAuth.currentUser, {displayName})
    
    
    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch(error) {
   
    return {
      ok: false, 
      errorMessage: error.message   
    }
  }
}

export const loginWithEmailPassword = async({email, password}) => {
  //funcion a llamar signInWithEmailAndPassword
  
  try {
   
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    
    const {displayName, photoURL, uid} = result.user;

   return {
    ok: true,
    email, displayName, photoURL, uid
   }
  } catch(error) {
    
    return {
      ok: false,
      errorMessage: error.message
    }
  }
  
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut()
}