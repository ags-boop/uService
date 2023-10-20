import { User } from "../interfaces/user.interface";

export class UserAdministrator implements User {
    id: number = 0;
    fullName: string = '';
    login: string = '';
    password: string = '';
    providerIdRegister: number = 0;
    emailVerified: number = 0;
    userProviderId: string = '';
  
    FillUser(user:User,userFirebase:any):User {
        user.fullName = userFirebase.displayName!
        user.login = userFirebase.email!
        user.password = user.password
        user.emailVerified =  this.BooleanByte(userFirebase.emailVerified)
        user.userProviderId = userFirebase.providerId
        // user.providerIdRegister = userFirebase.providerData[0].providerId"
        return user
    }

    BooleanByte(boolean:boolean):number{
        if(boolean){
            return 1 
        }else{
            return 0
        }
    }

}