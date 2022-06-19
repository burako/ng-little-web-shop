import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../models/product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  
  productId!: number;
  product: Product;

  constructor(private route: ActivatedRoute,private productService: ProductDataService) { 
    this.product = new Product();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id') as unknown as number;
    } );

    //this doesn't work. returns undefined or sth like that. check the service.
    this.product = this.productService.getProductById(this.productId);
  }

}
