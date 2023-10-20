import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { EndpointsAPI } from '../enums/EndpointsAPI.enums';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpsStatusCodes } from '../enums/https-status-codes.enums';
import { UserExistException } from '../Excepcion/UserExistExcepcion';

var URLAPI= environment.production?environment.URLApi:environment.URLApiTest

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  constructor() { }
  
  
  async GetUser(login:string,token:string) : Promise<User> {

    const userRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que estás enviando JSON
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(login) // Convierte el objeto a JSON
    };
    const responseUser = await fetch(`${URLAPI}${EndpointsAPI.GetUser}`, userRequest)
    console.log(responseUser.status)
    if(!responseUser.ok && responseUser.status != HttpsStatusCodes.NOCONTENT){
      throw new Error('error al obtener el Usuario')
    }
    
    const data = await responseUser.json()
    const user = data
    return user
  }

  async CreateUser(user:User) : Promise<User> {

    const userRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que estás enviando JSON
        // 'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(user) // Convierte el objeto a JSON
    };
    const responseRegisterUser = await fetch(`${URLAPI}${EndpointsAPI.CreateUser}`, userRequest)
    console.log(responseRegisterUser.status)
    if(!responseRegisterUser.ok && responseRegisterUser.status != HttpsStatusCodes.CONFLICT){
      throw new Error('error al crear el usuario')
    }
    else if(responseRegisterUser.status == HttpsStatusCodes.CONFLICT){
      throw new UserExistException(HttpsStatusCodes.CONFLICT.toString())
    }
    
    return await responseRegisterUser.json()

  }
}
