import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from './registro/registro.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RegistroService
  ]
})
export class ServiciosModule { }
