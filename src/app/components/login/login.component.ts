import { Component,Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons'
import { User } from 'src/app/interfaces/user.interface';

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
  
  constructor(private authService: AuthenticationService,private renderer:Renderer2) {}
  

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
    user = await this.authService.signInWithGoogle();
    
    if(user == null){
      alert('usuario vacio')
    }
    else{
      console.log(JSON.stringify(user))
    }
    
  }
}



