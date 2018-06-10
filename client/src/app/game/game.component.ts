import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./../authentication.service";
import { GameService } from "./../game.service";

@Component({
  selector: "game-list",
  templateUrl: "./game.component.html"
})
export class GameComponent {
  scores;

  constructor(
    private game: GameService,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.game.getScores().subscribe(
      scores => {
        this.scores = scores;
      },
      err => {
        console.error(err);
      }
    );
  }
}
