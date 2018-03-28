import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { db, model } from 'baqend';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls: ['./tunes.component.scss']
})
export class TunesComponent implements OnInit {
  client_id = "3a95841906b141b9a5e10014744ae040";
  client_secret = "36ec021cbd9948749d0a02abf9deaeba";
  private accessToken: any;
  private tokenType: string;

  private spApiUrl = "https://api.spotify.com/v1/search?q=herbert&type=track"
  public tunes: Array<model.Tune>;

  constructor(private router: Router, private http: Http) {
    db.ready().then(() => {
        if (!db.User.me) {
          this.router.navigate(['/signup']);
        } else{
            db.Tune
            .find()
            .resultList()
            .then(tunes => this.tunes = tunes);

            this.login().subscribe(() => {
              this.searchAlbums();
            });
           
        }
        
    });

  }

  login() {
    let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;

    let header = new Headers();
    header.append('Authorization', 'Basic  ' + btoa(this.client_id + ':' + this.client_secret));
    header.append('Content-Type', 'application/x-www-form-urlencoded;');

    let options = new RequestOptions({ headers: header });
    let body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, options)
      .map(data => data.json())
      .do(token => {
        this.accessToken = token.access_token;
        this.tokenType = token.token_type;
      }, error => console.log(error));
    
  }

  searchAlbums() {
    const options = this.getOptions();
    return this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
    
  }

  private getOptions() {
    console.log(this.accessToken);
    console.log(this.tokenType);

    let header = new Headers();
    header.append('Authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: header });

    return options;
  }

}