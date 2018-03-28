import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { db } from 'baqend';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-addtune',
  templateUrl: './addtune.component.html',
  styleUrls: ['./addtune.component.scss']
})
export class AddtuneComponent implements OnInit {

    accessToken: any;
    tokenType: string;
  
    private spApiUrl = "https://api.spotify.com/v1/search?q=herbert&type=track"

  tune = {
    artist: '',
    title: ''
  };
  error;
  

  constructor(private router: Router, private http: Http) {
    
    db.ready().then(() => {
        this.spauth().then((value) => {
            console.log(value);
            this.accessToken = value.access_token;
            this.tokenType = value.token_type;
            console.log(this.accessToken);
        });
        
    });
   
  }

  ngOnInit(){

  }

  search() {
    const options = this.getOptions();
    this.spApiUrl = "https://api.spotify.com/v1/search?q="+this.tune.artist+"%20"+this.tune.title+"&type=artist,track"
    return this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
      });
  }

    spauth() {
        return db.modules.get('spauth');
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
