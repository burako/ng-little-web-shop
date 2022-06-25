import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { Product } from './models/product';
import { CartItem } from './models/cartItem';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  products: Product[] = [];
  shoppingCart: CartItem[] = [];
  lastOrder!: Order;

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

  getNumberOfItemsInCart() : number {
    return this.shoppingCart.length;
  }

  getItemsInCart(): CartItem[] {
    return this.shoppingCart;
  }

  emptyCart(): void {
    this.shoppingCart = [];
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('/assets/data.json');
  }

  getProductById(id: number): Observable<Product>{ 
    return this.getAllProducts().pipe((map(products => products.filter(product => product.id === id)[0])));
  }

  createOrder(order: Order): void {
    this.lastOrder = order;
  }
}
