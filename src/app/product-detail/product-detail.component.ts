import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[] = [];
  productId!: number;
  selectedProduct: Product | undefined;
  productDetail: Product | undefined;
  quantity: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductDataService) { 
    //this.selectedProduct = new Observable<Product | undefined>();
    this.productDetail = new Product();
    this.selectedProduct = new Product();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = Number(params.get('id'));
    } );

    this.productService.getProductById(this.productId).subscribe(data => {
      this.selectedProduct = data;
      console.log(this.selectedProduct);
    });
  }

  onSubmit() {
    this.productService.addToCart(this.selectedProduct!, this.quantity);
    alert(this.quantity + ' ' + this.selectedProduct!.name + 's added to the cart');
    this.quantity = 0;
  }

}
