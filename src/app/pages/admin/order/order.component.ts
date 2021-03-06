import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders : any[] = [];
  data : any[] = [];
  form !: FormGroup;

  constructor(private orderService : OrderService,
    private message: NzMessageService,
    private fb : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(
      res => {
        if(res.status == 'ok'){
            this.orders = res.data;
            this.orders.forEach((element : any )=> {
              this.data = element.orders;
              console.log(element);
            });
            console.log(res.data);
        }
      }
    );
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  selectProduct(id : any){
    console.log(id);
    this.router.navigate([`admin/product-detail/${id}`]);
  }


}
