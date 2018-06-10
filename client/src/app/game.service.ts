import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface ScoreDetails {
  _id: string;
  firstname: string;
  lastname: string;
  points: number;
}

export interface ScorePayload {
  email: string;
  points: number;
}

@Injectable()
export class GameService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  private request(
    method: "post" | "get",
    type: "saveScore" | "getScores",
    score?: ScorePayload
  ): Observable<any> {
    let base;

    if (method === "post") {
      base = this.http.post(`/api/${type}`, score);
    } else {
      base = this.http.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      map(data => {
        return data;
      })
    );

    return request;
  }

  public saveScore(score: ScorePayload): Observable<any> {
    return this.request("post", "saveScore", score);
  }

  public getScores(): Observable<any> {
    return this.request("get", "getScores");
  }
}
