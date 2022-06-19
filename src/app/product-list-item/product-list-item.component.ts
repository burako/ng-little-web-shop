import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private productService: ProductDataService) { 
    this.productItem = new Product();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.addToCart(this.productItem, this.quantity);
    alert(this.quantity + ' ' + this.productItem.name + 's added to the cart');
    this.quantity = 0;
  }

}
