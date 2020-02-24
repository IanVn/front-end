import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { LoginComponent } from './inicio/login/login.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular.material.module';
import { ServiciosModule } from './servicios/servicios.module';
import { AcademicoComponent } from './inicio/registro/academico/academico.component';
import { ProfesorComponent } from './inicio/registro/profesor/profesor.component';
import { AcademicoExternoComponent } from './inicio/registro/academico-externo/academico-externo.component';
import { PasantesComponent } from './inicio/registro/pasantes/pasantes.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    AcademicoComponent,
    ProfesorComponent,
    AcademicoExternoComponent,
    PasantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ServiciosModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
