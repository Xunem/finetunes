import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { db, model } from 'baqend';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls: ['./tunes.component.scss']
})
export class TunesComponent implements OnInit {
  
  currentUser = '';
  public yt_logo = 'assets/yt_icon_rgb.png';
  public sp_logo = 'assets/Spotify_Icon_RGB_Green.png';
  public tunes: Array<model.Tune>;
  tuneNav= [];

  constructor(private router: Router, private http: Http, public sanitizer: DomSanitizer) {
    db.ready().then(() => {
        if (!db.User.me) {
          this.router.navigate(['/signup']);
        } else{
           this.loadTunes().then(() => {
            for(var tune of this.tunes){
              this.tuneNav[tune.id] = 'NF';
             } 
           });
           this.getCurrentUser();
         }
        
    });

  }

  loadTunes(){
    return db.Tune
    .find()
    .descending('createdAt')
    .resultList()
    .then(tunes => this.tunes = tunes);
  }

  getArtistsString(artists){
      if(artists.length == 1){
       return artists[0];
      }else{
        let temp = artists[0];
        var first = true;
        for(let artist of artists){
          if(!first){
             temp = temp + ", "+artist;
          }
          first = false;
        }
        return temp;
      }
  }

  getUri(tune){
    return this.sanitizer.bypassSecurityTrustResourceUrl("http://www.youtube.com/embed/"+tune.ytlink);
  }

  getSpUri(tune){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed?uri=spotify:track:"+tune.splink);
  }
  
  getCurrentUser(){
    db.Profile.find().equal('user', db.User.me.id).singleResult().then(data => {
      console.log(data.Username);
      this.currentUser = data.Username;
    });
    
  }

  logout(){
    db.User.logout();
    this.router.navigate(['/signup'])
  }

  ngOnInit() {
    
  }

}