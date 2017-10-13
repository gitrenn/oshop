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

  async getCart(){// read from the db
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);;
  }

  private async getOrCreateCartId(): Promise<string>{ // this method returns a promise
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
      
    let result = await this.create();
    localStorage.setItem('cartId', result.key);// store the id in the local storage
    return result.key; // return a shopping cart object
  }

  async addToCart(product: Product){// add a product to the shopping cart
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change });
    });
  }
}
