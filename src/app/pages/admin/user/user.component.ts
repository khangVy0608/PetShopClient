import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : any[] = [];
  form !: FormGroup;
  role = '';
  constructor(private message: NzMessageService,
    private userService : UserService,
    private fb : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      fullname: [null],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+84'],
      phoneNumber: [null, [Validators.required]],
      role : [null]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register(): void {
    if (this.form.valid) {
      this.userService.register(this.form.value);
      console.log('submit', this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  selectUser(email : any){
    this.router.navigate([`admin/user-detail/${email}`]);
  }


  getUsers(){
    this.userService.getUsers().subscribe(
      res => {
        if(res.status == 'ok'){
          console.log(res.data);
          this.users = res.data;
        }
      }
    );
  }

  log(value: object[]): void {
    // this.role = value;
    console.log(value);
  }
}
