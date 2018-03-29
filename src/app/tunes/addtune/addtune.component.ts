import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { model, db } from 'baqend';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { DomSanitizer } from '@angular/platform-browser';

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
      title: '',
      splink: ''
    };

    addBtn = false;
  error;

  spsuggest = [];
  

  constructor(private router: Router, private http: Http, public sanitizer: DomSanitizer) {
    
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
    this.spApiUrl = "https://api.spotify.com/v1/search?q="+this.tune.artist+"*%20"+this.tune.title+"*&type=track&limit=5"
    this.addBtn = true;
    return this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data.tracks);

        this.spsuggest = [];
        for(let track of data.tracks.items){
          this.spsuggest.push({
            uri: "https://open.spotify.com/embed?uri="+track.uri+"&view=coverart",
            id: track.id
          });
        }
      });
     
  }

    spauth() {
        return db.modules.get('spauth');
    }

   add(){
     var t = new db.Tune({
       title : this.tune.title,
       artist : this.tune.artist,
       splink : this.tune.splink
     })
      t.insert();
      this.tune = {
        artist: '',
        title: '',
        splink: ''
      };
      this.spsuggest = [];
      this.addBtn = false;
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
