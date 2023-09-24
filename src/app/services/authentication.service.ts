import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase  from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, FacebookAuthProvider, browserLocalPersistence } from "firebase/auth";
import { environment } from 'src/environments/environment.development';
import { firebaseApp$, initializeApp } from '@angular/fire/app';
import { browserPopupRedirectResolver } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private fireBaseAuth: AngularFireAuth) { }
  
  
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const app = initializeApp(environment.firebase)
    const auth = getAuth(app);

    signInWithPopup(auth, provider,browserPopupRedirectResolver)
    .then((result) => {
      console.log(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // console.log(result)
      const token = credential?.accessToken;
      console.log(token)
      // The signed-in user info.
      const user = result.user;
      console.log(user)

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }




  loginWithEmail(email: string, password: string) {
    const app = initializeApp(environment.firebase)
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth,email, password);
  }

}

