import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { db, baqend } from 'baqend';

db.connect('bench', true);

@Injectable()
export class DBReady {
  
}

@Injectable()
export class DBLoggedIn {
 
}

export const DB_PROVIDERS = [DBReady, DBLoggedIn];