import { Data } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }
}
