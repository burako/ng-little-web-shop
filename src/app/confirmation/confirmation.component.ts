import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  userName: string = '';
  address: string = '';
  amount: number = 0;

  constructor(private productService: ProductDataService) {}

  ngOnInit(): void {
    this.userName = this.productService.lastOrder.name;
    this.address = this.productService.lastOrder.address;
    this.amount = this.productService.lastOrder.amount;
  }

}
