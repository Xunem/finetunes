import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { db, model } from 'baqend';

@Component({
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls: ['./tunes.component.scss']
})
export class TunesComponent implements OnInit {

  public tunes: Array<model.Tune>;

  constructor(private router: Router) {
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