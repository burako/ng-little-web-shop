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
  selectedProduct: Observable <Product | undefined>;
  productDetail: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductDataService) { 
    this.selectedProduct = new Observable<Product | undefined>();
    this.productDetail = new Product();
    //this.selectedProduct = new Product();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id') as unknown as number;
    } );

    this.selectedProduct = this.productService.getAllProducts().pipe(map(products => products.find(product => product.id === this.productId)));
 /*    this.selectedProduct.subscribe(data => {
            this.productDetail = data;
            });
          console.log(this.productDetail); */

    //this doesn't work. returns undefined or sth like that. check the service.
    /* this.productService.getProductById(this.productId).subscribe(data => {
      this.selectedProduct = data;
    }); */
  }

}
