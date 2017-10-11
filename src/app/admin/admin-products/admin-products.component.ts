import { Subscription } from 'rxjs/Rx';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:{title: string}[];//in the future, an interface of products should be created (product[])
  filteredProducts: any[]; // this array will be displayed in the template
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string){
    //console.log(query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
