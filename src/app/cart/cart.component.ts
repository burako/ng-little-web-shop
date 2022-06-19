import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartView: CartItem[] = [];
  shoppingCart: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
    this.shoppingCart = this.showCart();
    this.cartTotal = this.totalPrice();
  }

  showCart(): CartItem[] {
    this.cartView = this.productService.getItemsInCart();
    return this.cartView;
  }

  totalPrice(): number {
    let total = 0;
    this.shoppingCart.forEach(item => {
      total += item.product.price * item.quantity;
    }
    );
    return total;
  }

}
