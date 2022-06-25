import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
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
  public cartSize: BehaviorSubject<number> = new BehaviorSubject<number>(this.getNumberOfItemsInCart());

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
    this.cartSize.next(this.getNumberOfItemsInCart());
  }

  getNumberOfItemsInCart() : number {
    let amount: number = 0;
    this.shoppingCart.forEach(item =>{
      amount += item.quantity;
    })
    return amount;
  }

  getItemsInCart(): CartItem[] {
    return this.shoppingCart;
  }

  setCart(updatedCart: CartItem[]): void {
    this.shoppingCart = updatedCart;
    this.cartSize.next(this.getNumberOfItemsInCart());
  }

  emptyCart(): void {
    this.shoppingCart = [];
    this.cartSize.next(this.getNumberOfItemsInCart());
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
