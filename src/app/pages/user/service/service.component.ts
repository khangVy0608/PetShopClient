import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServiceModel } from "src/app/model/ServiceModel";
import { OrderService } from 'src/app/services/order.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services : ServiceModel[] = [];
  isVisible = false;
  id = "";
  validateForm !: FormGroup;


  constructor(private serviceService : ServiceService,
    private fb: FormBuilder,
    private orderService : OrderService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getServices();
    this.validateForm = this.fb.group({
      payment_method: [null],
      payment_account: [null],
      receive_method: [null],
      type : ['service']
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  showModal(id : any, amount : any){
    this.id = id;
    console.log(this.id);
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    console.log(this.validateForm.value);
    let service = {
      service : this.id,
      type : this.validateForm.get('type')?.value,
      payment_method : this.validateForm.get('payment_method')?.value,
      payment_account: this.validateForm.get('payment_account')?.value,
      receive_method: this.validateForm.get('receive_method')?.value,
    }
    this.isVisible = false;
    this.orderService.addOrder(service).subscribe(
      res => {
        if(res.status == 'ok'){
          this.message.create('success', res.info);
        }else{
          this.message.create('error', res.error);

        }
      }
    );
    this.validateForm.reset();

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.validateForm.reset();
  }

  getServices(){
    this.serviceService.getServices().subscribe(resp => {
      if(resp.status == 'ok'){
        this.services = resp.data;
      }
    });
  }

}
