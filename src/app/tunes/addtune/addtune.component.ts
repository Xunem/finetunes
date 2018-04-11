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

    currentUser: model.Profile;
    accessToken: any;
    tokenType: string;
  
    private spApiUrl = "https://api.spotify.com/v1/search?q=herbert&type=track"

    tune = {
      artistq: '',
      artists: [],
      title: '',
      genre: '',
      splink: '',
      sptitle:'',
      spartists: '',
      spgenre:'',
      spuri:'',
      ytlink:'',
      yturi:'',
      yttitle:'',
      img:''
    };

    spdata = {
      artists: [],
      title: "",
      id: ""
    }


    results = false;
    addSrc = 'YT';

    ytsaved = false;
    spsaved = false;
    addBtn = false;
    showSpSuggest = false;
    showDetails = [];
  error;

  spsuggest = [];

  ytsuggest = [];
  

  constructor(private router: Router, private http: Http, public sanitizer: DomSanitizer) {
    
    db.ready().then(() => {
        this.spauth().then((value) => {
            console.log(value);
            this.accessToken = value.access_token;
            this.tokenType = value.token_type;
            console.log(this.accessToken);
        });
        this.getCurrentUser();
        
    });
   
  }

  ngOnInit(){

  }

  search() {
    const options = this.getOptions();
    var artistTrimmed = this.tune.artistq.replace(/\s/g,"%20");
    var titleTrimmed = this.tune.title.replace(/\s/g, "%20");
    console.log(artistTrimmed + " " + titleTrimmed);
    this.spApiUrl = "https://api.spotify.com/v1/search?q="+artistTrimmed+"%20"+titleTrimmed+"&type=artist,track&limit=5&market=DE"
    this.addBtn = true;
    this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data.tracks);
        console.log(data.artists);

        this.spsuggest = [];
        for(let track of data.tracks.items){
          this.showDetails[track.id] = false;
          this.spsuggest.push({
            uri: "https://open.spotify.com/embed?uri="+track.uri+"&view=coverart",
            id: track.id,
            title: track.name,
            artists: this.getArtistsStringFromArray(track.artists)
          });
        }
      });
      const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
      const API_TOKEN = 'AIzaSyChaS5oQ8oAe3KdA4sNPGGWxjJRxeHHcxo';
      var query = artistTrimmed + "%20" + titleTrimmed;
      var result = this.http.get(`${BASE_URL}?q=${query}&part=snippet&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items)
      .subscribe(data =>{
        console.log(data);
        this.ytsuggest = [];
        for(let track of data){
          this.showDetails[track.id] = false;
          this.ytsuggest.push({
            id: track.id.videoId,
            title: track.snippet.title,
            uri: "https://www.youtube.com/embed/"+track.id.videoId
          });
        }
        this.results = true;
      });
      

     
  }

    spauth() {
        return db.modules.get('spauth');
    }

   addSp(){
    const options = this.getOptions();
    this.spApiUrl = "https://api.spotify.com/v1/tracks/"+this.tune.splink;
    this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        for(let artist of data.artists){
          this.tune.artists.push(artist.name);
        }
        this.tune.spartists = this.getArtistsString();
        console.log(this.tune.spartists);
        console.log(db.User.me.id);
        this.tune.img = data.album.images[0].url;
        this.tune.sptitle = data.name;
        this.tune.spgenre = this.getGenre(data.album.id);
        this.tune.spuri = "https://open.spotify.com/embed?uri="+data.uri+"&view=coverart";
        this.spsaved = true;

        
        this.spApiUrl = "https://api.spotify.com/v1/users/xunem/playlists/6Ai5PGwlUD9nJgD5FbT0vg/tracks?uris=spotify%3Atrack%3"+this.tune.splink;
        var temp = this.http.post(this.spApiUrl, this.getOptions).map(res => res.json())
        .subscribe(data => {
          console.log(data);
        });
       
        
      });
    
     
   }

   getGenre(id){
    const options = this.getOptions();
    this.spApiUrl = "https://api.spotify.com/v1/albums/"+id;
    this.http.get(this.spApiUrl, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        
      });
    
     return 'jazz';
   }

   getArtistsString(){
     if(this.tune.artists.length == 1){
      return this.tune.artists[0];
     }else{
       let temp = this.tune.artists[0];
       var first = true;
       for(let artist of this.tune.artists){
         if(!first){
            temp = temp + ", "+artist;
         }
         first = false;
       }
       return temp;
     }
     
   }

   getArtistsStringFromArray(artists){
    if(artists.length == 1){
      return artists[0].name;
     }else{
       let temp = artists[0].name;
       var first = true;
       for(let artist of artists){
         if(!first){
            temp = temp + ", "+artist.name;
         }
         first = false;
       }
       console.log(temp);
       return temp;
     }
   }

   showListenBar(id){
    this.showDetails[id] = ! this.showDetails[id];
   }

   addYt(){
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';
    const API_TOKEN = 'AIzaSyChaS5oQ8oAe3KdA4sNPGGWxjJRxeHHcxo';
    const YTID = this.tune.ytlink;
    var result = this.http.get(`${BASE_URL}?id=${YTID}&key=${API_TOKEN}&part=snippet`)
    .map((res:Response) => res.json())
    .map(json => json.items)
    .subscribe(data =>{
      for(let track of data){
        console.log(track);
        this.tune.yttitle = track.snippet.title;
        this.tune.yturi = "https://www.youtube.com/embed/"+this.tune.ytlink;
        this.ytsaved = true;
      }
    });
  }

   add(){
     console.log(this.tune.artists);
    var t = new db.Tune({
      author: this.currentUser.Username,
      title : this.tune.sptitle,
      artists : JSON.parse(JSON.stringify(this.tune.artists)),
      splink : this.tune.splink,
      ytlink : this.tune.ytlink,
      img: this.tune.img,
      genre: this.tune.genre
    });
    console.log(t);
     t.insert();
     this.tune = {
      artistq: '',
      artists:[],
      title: '',
      genre: '',
      splink: '',
      spartists: '',
      sptitle:'',
      spgenre:'',
      spuri:'',
      ytlink:'',
      yturi:'',
      yttitle:'',
      img:''
     };
     this.spsuggest = [];
     this.addBtn = false;
     this.results = false;
   }

   private getOptions() {
    console.log(this.accessToken);
    console.log(this.tokenType);

    let header = new Headers();
    header.append('Authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: header });

    return options;
  }
  getCurrentUser(){
    
    db.Profile.find().equal('user', db.User.me).singleResult().then(data => {
      console.log(data.Username);
      this.currentUser = data;
    });
    
  }
}
