import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const MaterialComponents = [
  MatTabsModule, 
  MatTableModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
