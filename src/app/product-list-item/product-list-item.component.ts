import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() productItem: Product;
  quantity: number = 0;

  constructor() { 
    this.productItem = new Product();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('ProductListItemComponent: onSubmit()');
    alert(this.quantity + ' ' + this.productItem.name + 's added to the cart');
    this.quantity = 0;
  }

}
