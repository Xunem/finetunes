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
            this.login();
            this.login().then((value) => {
                this.accessToken = value.accessToken;
                this.tokenType = value.tokenType;
                this.searchAlbums();
            });
           
        }
        
    });

  }

  login() {
    return db.modules.get('spauth');
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