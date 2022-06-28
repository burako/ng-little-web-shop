import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() productItem: Product;
  quantity: number = 0;
  newCartItem: CartItem;
  @Output() addCart: EventEmitter<CartItem> = new EventEmitter();

  constructor(private productService: ProductDataService) { 
    this.productItem = new Product();
    this.newCartItem = new CartItem(this.productItem, this.quantity);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newCartItem.product = this.productItem;
    this.newCartItem.quantity = this.quantity;
    this.addCart.emit(this.newCartItem);
    this.quantity = 0;
  }

}
