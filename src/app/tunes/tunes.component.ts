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
            
            
           
        }
        
    });

  }

  ngOnInit() {
    
  }

}