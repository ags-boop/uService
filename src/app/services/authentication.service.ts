import { Injectable } from '@angular/core';
import { AngularFireAuth, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider, browserLocalPersistence, getAdditionalUserInfo } from "firebase/auth";
import { environment } from 'src/environments/environment.development';
import { firebaseApp$, initializeApp } from '@angular/fire/app';
import { browserPopupRedirectResolver } from "firebase/auth";
import { EndpointsAPI } from '../enums/EndpointsAPI';
import { Token } from '@angular/compiler';
import { User } from '../interfaces/user.interface';
import { UserToken } from '../interfaces/user_token.interface';
import { getToken } from '@angular/fire/app-check';

const URLAPI = environment.URLApi
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fireBaseAuth: AngularFireAuth) { }


  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const app = initializeApp(environment.firebase);
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userFirebase = result.user;
      // const additionalInfo = getAdditionalUserInfo(result);
      console.log(userFirebase.email)
      const userToken: UserToken = {
        login : userFirebase.email!,
        password : environment.passwordToken
      }
      const tokenAPI = await this.GetToken(userToken)
      console.log(tokenAPI)
      const userApi = await this.GetUser(userFirebase.email!,tokenAPI!)
     
      return userApi!;

    } catch (error) {
      // Maneja los errores aquí y decide cómo manejarlos o propagarlos si es necesario.
      throw error;
    }
  }




  loginWithEmail(email: string, password: string) {
    const app = initializeApp(environment.firebase)
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password);
  }


  async GetToken(userToken:UserToken) : Promise<string>  {
 

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Especifica que estás enviando JSON
      },
      body: JSON.stringify(userToken) // Convierte el objeto a JSON
    };

    const responseToken = await fetch(`${URLAPI}${EndpointsAPI.GetToken}`, requestOptions)
    
    if(!responseToken.ok){
      throw new Error('error al obtener Token')
    }
    const data = await responseToken.json()
    const token = data.token
    return token
      
  }

  async GetUser(login:string,token:string) : Promise<User> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que estás enviando JSON
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(login) // Convierte el objeto a JSON
    };
    const responseUserApi = await fetch(`${URLAPI}${EndpointsAPI.GetUser}`, requestOptions)
    if(!responseUserApi.ok){
      throw new Error('error al obtener el Usuario')
    }
    
    const data = await responseUserApi.json()
    const user = data
    return user
  }
}

