import { Component,Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons'
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { UserAdministrator } from 'src/app/Class/UserAdministrator';


let user: User = {
  id: 0,
  fullName: '',
  emailVerified:0,
  userProviderId: '',
  login:'',
  password:'',
  providerIdRegister:0
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  
  GoogleIcon  = faGooglePlusG
  userForm:User=new UserAdministrator();
  
  constructor(private loginService:LoginService,private renderer:Renderer2) {}
  

  clickSinUp(){
    const element = this.renderer.selectRootElement('#container',true);
    // this.renderer.removeClass(element,"container")
    this.renderer.addClass(element,"right-panel-active")
  }
  

  clickSinIn(){
    const element = this.renderer.selectRootElement('#container',true);
    this.renderer.removeClass(element,"right-panel-active")
    this.renderer.addClass(element,"container")
  }

  async signInWithGoogle() {
    user = await this.loginService.signInWithGoogle();
    
    if(user == null){
      alert('usuario vacio')
      this.clickSinUp()
    }
    else{
      console.log(JSON.stringify(user))
    }
    
  }
  
  async signInWithEmail(email:string,password:string) {
    console.log(email)
    user = await this.loginService.loginWithEmail(email,password);
    
    if(user == null){
      alert('usuario vacio')
      this.clickSinUp()
    }
    else{
      console.log(JSON.stringify(user))
    }
    
  }

  async signUpWithGoogle(){
    user = await this.loginService.signUpWithGoogle(user);
    
    if(user == null){
      alert('Parece que ya estas registrado')
      this.clickSinIn()
    }
    else{
      console.log(JSON.stringify(user))
    }
    
  }


  async signUpWithEmail(){

    console.log(this.userForm)
    user = await this.loginService.singUpWithEmail(this.userForm);
    
    if(user == null){
      alert('Parece que ya estas registrado')
      this.clickSinIn()
    }
    else{
      console.log(JSON.stringify(user))
    }
    
  }
}



