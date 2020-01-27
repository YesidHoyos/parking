import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { VehicleEntered } from '../../shared/models/vehicle-entered';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  private errorMessage: string;
  VehicleSubscription: Subscription;
  displayedColumns: string[] = ['placa', 'tipo', 'fechaIngreso'];
  dataSource: MatTableDataSource<VehicleEntered>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.errorMessage = undefined;
    this.VehicleSubscription = this.vehicleService.getVehicles()
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

  ngOnDestroy() {
    this.VehicleSubscription.unsubscribe();
  }
}
