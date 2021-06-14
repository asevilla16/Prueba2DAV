import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './../dialog/dialog.component';
import { Customer } from './../../models/customer';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'birthDate', 'civilStatus', 'active', 'actions'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();

  constructor(
    private customerService: CustomersService,
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.customerService.getClients().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCustomer(id: any){
    this.router.navigate(['/customer/edit', id]);
  }

  deleteCustomer(id: any){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
        if(result){
          this.customerService.deleteCustomer(id)
          .subscribe(
            (res: any) => {
              this.matSnackBar.open('Customer has been deleted successfully', 'OK', {
                verticalPosition: 'top',
                duration: 6000
              });
            }
          )
        }
    });
  }

}
