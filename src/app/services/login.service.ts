import { Injectable } from '@angular/core';
import { AngularFireAuth, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider, browserLocalPersistence, getAdditionalUserInfo, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp$, initializeApp } from '@angular/fire/app';
import { browserPopupRedirectResolver } from "firebase/auth";
import { EndpointsAPI } from '../enums/EndpointsAPI.enums';
import { User } from '../interfaces/user.interface';
import { UserToken } from '../interfaces/user_token.interface';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpsStatusCodes } from '../enums/https-status-codes.enums';
import { UserAdministrator} from '../Class/UserAdministrator';
import { UserExistException } from '../Excepcion/UserExistExcepcion';

var URLAPI= environment.production?environment.URLApi:environment.URLApiTest
const passwordToken = environment.passwordToken
const fireBase = environment.firebase

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService:UserService,private authService:AuthenticationService) { }


  async signInWithGoogle(): Promise<User> {

    const provider = new GoogleAuthProvider();
    const app = initializeApp(fireBase);
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userFirebase = result.user;
      // const additionalInfo = getAdditionalUserInfo(result);
      console.log(userFirebase.email)
      const requestUserToken: UserToken = {
        login : userFirebase.email!,
        password : passwordToken
      }
      const responseToken = await this.authService.GetToken(requestUserToken)
      console.log(responseToken)
      if(responseToken == HttpsStatusCodes.NOCONTENT.toString()){
        const responseUser:User=null!
        return responseUser!;
      }
      const responseUser = await this.userService.GetUser(userFirebase.email!,responseToken!)
      
      return responseUser!;

    } catch (error) {
      throw new Error(`Error en el servicio de login ${error}`)
    }

  }


  async loginWithEmail(email: string, password: string) : Promise<User> {

    const app = initializeApp(fireBase)
    const auth = getAuth(app);

    try{
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userFirebase = result.user
      console.log(userFirebase.email)
      const requestUserToken: UserToken = {
        login : userFirebase.email!,
        password : passwordToken
      }
      const responseToken = await this.authService.GetToken(requestUserToken)
      console.log(responseToken)
      if(responseToken == HttpsStatusCodes.NOCONTENT.toString()){
        const responseUser:User=null!
        return responseUser!;
      }      
      const responseUser = await this.userService.GetUser(userFirebase.email!,responseToken!)
     
      return responseUser!;
    }
    catch(error){
      throw new Error(`Error en el servicio de login ${error}`)
    }

  }

  async signUpWithGoogle(user:User) : Promise<User> {
    const provider = new GoogleAuthProvider();
    const app = initializeApp(fireBase);
    const auth = getAuth(app);
    var UserManagement = new UserAdministrator();

    try {
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userFirebase = result.user;
      // const additionalInfo = getAdditionalUserInfo(result);
      console.log(userFirebase)
      console.log(userFirebase.email)
      user = UserManagement.FillUser(user,userFirebase)
      const responseUser = await this.userService.CreateUser(user)
      
      
      return responseUser
    }
    catch(error){
      if(error instanceof UserExistException){
        return user=null!
      }
      return user
    }
  }


  async singUpWithEmail(user:User) : Promise<User> {

    const app = initializeApp(fireBase)
    const auth = getAuth(app);

    try{
      const result = await createUserWithEmailAndPassword(auth, user.login, user.password);
      const userFirebase = result.user
      console.log(userFirebase)
      const responseUserRegister = await this.userService.CreateUser(user)
      console.log(responseUserRegister)
      
      return responseUserRegister!;
    }
    catch(error){
      if(error instanceof UserExistException){
        return user=null!
      }
      return user=null!
    }

  }
}


