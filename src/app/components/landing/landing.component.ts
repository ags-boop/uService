import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageToRedirect } from 'C:/uService/uService/src/app/enums/page-to-redirect.enum';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) { }

  redirectToLogin() {
    this.router.navigate([PageToRedirect.Login]);
  }
}
