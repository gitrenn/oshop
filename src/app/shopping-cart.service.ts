import { Data } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string){// read from the db
    return this.db.object('/shopping-cart/' + cartId);
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);// store the id in the local storage
      return this.getCart(result.key); // return a shopping cart object
    }
      return this.getCart(cartId);// add product to cart
    
  }
}
