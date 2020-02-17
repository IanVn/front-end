import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { LoginComponent } from './inicio/login/login.component';
import { RegistroComponent } from './inicio/registro/registro.component';


const routes: Routes = [
  { path: 'siriuda', component: InicioComponent},
  { path: 'siriuda/login', component: LoginComponent},
  { path: 'siriuda/registro', component: RegistroComponent },
  { path: '', redirectTo: 'siriuda', pathMatch: 'full'},
  { path: '**', component: InicioComponent  } // Cambiar por un componente notfound
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
