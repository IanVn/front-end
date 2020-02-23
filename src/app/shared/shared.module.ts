import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EstudiosComponent } from './estudios/estudios.component';
import { AngularMaterialModule } from '../angular.material.module';



@NgModule({
  declarations: [HeaderComponent, EstudiosComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [ HeaderComponent, ReactiveFormsModule, FormsModule, EstudiosComponent ]
})
export class SharedModule { }
