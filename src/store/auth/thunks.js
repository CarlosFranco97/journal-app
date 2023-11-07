import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"
export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

    }
};

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

       const result = await signInWithGoogle();
       console.log(result)
       if(!result.ok) return dispatch( logout( result.errorMessage ) );

       delete result.ok;    

       dispatch(login(result))

    }
};

//Funcion 'thunk' para crear el usuario y password cuando no se tiene usuario. Recibe el email, password y displayName. 
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if(!ok) return dispatch(logout({errorMessage}))
        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    //depende de lo que despache mi funcion de mi provider, se despachara el login o el logout 
    return async(dispatch) => {
       //para bloquear botones 
       dispatch(checkingCredentials());

       const {ok, errorMessage, displayName, photoURL, uid} = await loginWithEmailPassword({email, password});
        
       if(!ok) return dispatch(logout({errorMessage}))

       dispatch(login({email, password, displayName, photoURL, uid}))


    }

};

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase()
        dispatch(clearNotesLogout())
        dispatch(logout())
    }
}