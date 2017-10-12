import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

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

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);;
  }

  private async getOrCreateCartId(){ // this method returns a promise
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
      
    let result = await this.create();
    localStorage.setItem('cartId', result.key);// store the id in the local storage
    return result.key; // return a shopping cart object
  }

  async addToCart(product: Product){// add a product to the shopping cart
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
      
    });
  }
}
