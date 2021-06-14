import { Customer } from './../../../models/customer';
import { CustomersService } from './../../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup = this.buildForm();

  title: string = '';
  customerId: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTitle();
    this.getCustomerInfo();
  }

  buildForm(){
    return this.formBuilder.group({
      id: [0],
      code: [''],
      name: [''],
      birthDate: [new Date()],
      civilStatus: [''],
      active: false
    });
  }

  getTitle(){
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.title = this.customerId ? "Actualizar cliente" : "Nuevo Cliente"
  }

  getCustomerInfo(){
    if(this.customerId){
      this.customerService.getClientById(this.customerId)
        .subscribe(
          (res: any) => {
            this.setCustomerInfo(res);
          },  
          error => {
            console.log(error);
          }
        )
    }
  }

  setCustomerInfo(customer: Customer){
    this.form.patchValue({
      ...customer
    })
  }

  onSubmit(){
    const customer: Customer = this.form.value;

    if(this.customerId){
      this.edit(customer);
    } else {
      this.save(customer);
    }
  }

  save(customer: Customer){
    this.customerService.saveCustomer(customer)
      .subscribe(
        (res: any) => {
          this.matSnackbar.open('Customer has been created successfully', 'OK', {
            verticalPosition: 'top',
            duration: 6000
          });
          this.router.navigate(['/customer']);
        },
        error => {
          console.log(error)
        }
      )
  }

  edit(customer: Customer){
    this.customerService.editCustomer(customer)
      .subscribe(
        (res: any) => {
          this.matSnackbar.open('Customer has been Updated successfully', 'OK', {
            verticalPosition: 'top',
            duration: 6000
          });
          this.router.navigate(['/customer']);
        },
        error => {
          console.log(error);
        }
      )
  }


}
