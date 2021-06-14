import { CreateComponent } from './features/customers/create/create.component';
import { CustomersComponent } from './features/customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomersComponent
  },
  {
    path: 'customer/create',
    component: CreateComponent
  },
  {
    path: 'customer/edit/:id',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
