import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from './registro/registro.service';
import { HttpClientModule } from '@angular/common/http';
import { FormularioService } from './registro/formulario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RegistroService,
    FormularioService
  ]
})
export class ServiciosModule { }
