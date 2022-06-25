import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartSize!: number;

  constructor(private productService: ProductDataService) {
    this.productService.cartSize.subscribe( value =>{
      this.cartSize = value;
    })
   }

  ngOnInit(): void {
  }

}
