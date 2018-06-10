import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { GameComponent } from "./game/game.component";
import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from "./auth-guard.service";
import { GameService } from "./game.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "me", component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: "tap", component: GameComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuardService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
