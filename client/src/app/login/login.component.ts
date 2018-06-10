import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  selector: "login-form"
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: "",
    password: ""
  };

  errors = {
    loginError: false,
    loginMsg: "",
    passwordError: false,
    passwordMsg: "",
    globalError: false,
    globalMsg: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    let hasError = false;
    this.errors = {
      loginError: false,
      loginMsg: "",
      passwordError: false,
      passwordMsg: "",
      globalError: false,
      globalMsg: ""
    };
    if (this.credentials.email.length === 0) {
      this.errors.loginError = true;
      this.errors.loginMsg = "You must specify an email address";
      hasError = true;
    }
    if (this.credentials.password.length === 0) {
      this.errors.passwordError = true;
      this.errors.passwordMsg = "You must specify a password";
      hasError = true;
    }
    if (!hasError) {
      this.auth.login(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl("/me");
        },
        err => {
          let msg = err.error.message;
          if (msg === "User not found") {
            this.errors.loginError = true;
            this.errors.loginMsg = msg;
          } else if (msg === "Password is wrong") {
            this.errors.passwordError = true;
            this.errors.passwordMsg = msg;
          } else {
            this.errors.globalError = true;
            this.errors.globalMsg = err.error.message;
          }
        }
      );
    }
  }
}
