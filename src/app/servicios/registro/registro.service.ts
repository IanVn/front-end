import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  
  // Tenemos que inyectar el servicio de HTTP
  constructor( private http: HttpClient ) { }

  // Este metodo se encargara de hacer una peticion al servidor para poder verificar que exista o no la curp
  ExisteCurp() {

  }

}
