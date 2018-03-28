import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { TunesComponent } from './tunes.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule 
  ],
  declarations: [
    TunesComponent
  ],
  providers: [
    TunesComponent
  ]
})
export class TunesModule {
}
