import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  orderData : Order;

  constructor() { 
    this.orderData = new Order('','',0);
  }

  ngOnInit(): void {
  }

  getOrder(order: Order){
    this.orderData.name = order.name;
    this.orderData.address = order.address;
    this.orderData.amount = order.amount
  }

}
