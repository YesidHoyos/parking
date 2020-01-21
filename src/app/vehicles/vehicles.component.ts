import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { VehicleEntered } from '../vehicle-entered';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  private errorMessage: string;

  displayedColumns: string[] = ['placa', 'tipo', 'fechaIngreso'];
  dataSource: MatTableDataSource<VehicleEntered>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.errorMessage = undefined;
    this.vehicleService.getVehicles()
    .pipe(
      finalize(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    )
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource([...response.body]);
    }, (error) => {
      this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toUpperCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
