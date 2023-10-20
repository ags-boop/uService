import { Injectable } from '@angular/core';
import { AngularFireAuth, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider, browserLocalPersistence, getAdditionalUserInfo } from "firebase/auth";
import { firebaseApp$, initializeApp } from '@angular/fire/app';
import { browserPopupRedirectResolver } from "firebase/auth";
import { EndpointsAPI } from '../enums/EndpointsAPI.enums';
import { User } from '../interfaces/user.interface';
import { UserToken } from '../interfaces/user_token.interface';
import { UserService } from './user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { HttpsStatusCodes } from '../enums/https-status-codes.enums';

var URLAPI= environment.production?environment.URLApi:environment.URLApiTest


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fireBaseAuth: AngularFireAuth) { }
  
  


  async GetToken(requestUserToken:UserToken) : Promise<string>  {

    const tokenRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Especifica que estás enviando JSON
      },
      body: JSON.stringify(requestUserToken) // Convierte el objeto a JSON
    };

    
      const responseToken = await fetch(`${URLAPI}${EndpointsAPI.GetToken}`, tokenRequest)
      
      if(!responseToken.ok && responseToken.status != HttpsStatusCodes.NOCONTENT){
        throw new Error('error al obtener Token')
      }
      else if (responseToken.status == HttpsStatusCodes.NOCONTENT){
        return responseToken.status.toString()
      }
      const data = await responseToken.json()
      const token = data.token
      console.log(token)
      return token
      
  }

}

