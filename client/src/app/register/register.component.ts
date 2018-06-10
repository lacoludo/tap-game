import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html",
  selector: "register-form"
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: "",
    firstname: "",
    lastname: "",
    password: ""
  };

  errors = {
    firstnameError: false,
    firstnameMsg: "",
    lastnameError: false,
    lastnameMsg: "",
    emailError: false,
    emailMsg: "",
    passwordError: false,
    passwordMsg: "",
    globalError: false,
    globalMsg: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    let hasError = false;

    this.errors = {
      firstnameError: false,
      firstnameMsg: "",
      lastnameError: false,
      lastnameMsg: "",
      emailError: false,
      emailMsg: "",
      passwordError: false,
      passwordMsg: "",
      globalError: false,
      globalMsg: ""
    };

    if (this.credentials.firstname.length == 0) {
      this.errors.firstnameError = true;
      this.errors.firstnameMsg = "You must specify your firstname";
      hasError = true;
    }
    if (this.credentials.lastname.length == 0) {
      this.errors.lastnameError = true;
      this.errors.lastnameMsg = "You must specify your lastname";
      hasError = true;
    }
    if (this.credentials.email.length == 0) {
      this.errors.emailError = true;
      this.errors.emailMsg = "You must specify your email address";
      hasError = true;
    }
    if (this.credentials.password.length == 0) {
      this.errors.passwordError = true;
      this.errors.passwordMsg = "You must specify a password";
      hasError = true;
    }

    if (!hasError) {
      this.auth.register(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl("/me");
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
