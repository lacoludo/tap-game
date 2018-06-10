import { Component } from "@angular/core";

@Component({
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  loginFormIsVisible = true;
  registerFormIsVisible = false;

  toggleLoginFormVisibility() {
    this.loginFormIsVisible = !this.loginFormIsVisible;
    this.registerFormIsVisible = false;
  }
  toggleRegisterFormVisibility() {
    this.registerFormIsVisible = !this.registerFormIsVisible;
    this.loginFormIsVisible = false;
  }
}
