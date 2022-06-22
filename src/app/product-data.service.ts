import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from './models/product';
import { CartItem } from './models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  products: Product[] = [];
  shoppingCart: CartItem[] = [];

  constructor(private http:HttpClient) { 
  }

  addToCart(product: Product, quantity: number): void{
    let cartItem: CartItem = new CartItem(product, quantity);
    let added: boolean = false;
    

    this.shoppingCart.forEach(item => {
      if(item.product.id === cartItem.product.id){
        item.quantity += cartItem.quantity;
        added = true;
      }
    });
    if (!added) {
      this.shoppingCart.push(cartItem);
    }
  }

  getItemsInCart(): CartItem[] {
    return this.shoppingCart;
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('/assets/data.json');
  }

  getProductById(id: number): Observable<Product | undefined>{ 
    return this.getAllProducts().pipe(map(products => products.find(product => product.id === id)));
  }
}
