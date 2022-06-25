import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { CartItem } from '../models/cartItem';
import { NgForm } from '@angular/forms';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingCart: CartItem[] = [];
  cartTotal: number = 0;
  fullName: string = '';
  shippingAddress: string = '';
  cardNumber: string = '';

  constructor(private productService: ProductDataService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCart = this.productService.getItemsInCart();
    this.cartTotal = this.totalPrice();
  }

  onQuantityChange(item: CartItem): void {
    const updatedItem = this.shoppingCart.find(x => x.product.id == item.product.id);
    if (item.quantity === 0) {
      const index = this.shoppingCart.indexOf(updatedItem!)
      this.shoppingCart.splice(index, 1);
      alert(item.product.name + " is removed from cart!");
    } else {
      updatedItem!.quantity = item.quantity;
    }
    this.cartTotal = this.totalPrice();
  }

  totalPrice(): number {
    let total = 0;
    this.shoppingCart.forEach(item => {
      total += item.product.price * item.quantity;
    }
    );
    return total;
  }

  checkout(): void {
    const order: Order = {
      name : this.fullName,
      address : this.shippingAddress,
      amount : this.cartTotal
    }
    this.productService.createOrder(order);
    this.productService.emptyCart();
    this.router.navigateByUrl('/confirmation');
  }

}
