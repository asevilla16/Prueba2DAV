import { Customer } from './../models/customer';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getClients(){
    return this.http.get(`${this.apiURL}clients`);
  }

  getClientById(id: any){
    return this.http.get(`${this.apiURL}clients/${id}`);
  }

  saveCustomer(customer: Customer){
    return this.http.post(`${this.apiURL}clients`, customer);
  }
  
  editCustomer(customer: Customer){
    return this.http.put(`${this.apiURL}clients/${customer.id}`, customer);
  }

  deleteCustomer(id: any){
    return this.http.delete(`${this.apiURL}clients/${id}`);
  }
}
