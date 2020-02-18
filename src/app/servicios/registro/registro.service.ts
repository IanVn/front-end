import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ULR_SERVICES } from "../../config/config";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  
  // Tenemos que inyectar el servicio de HTTP
  constructor( private http: HttpClient) { }

  // Este metodo se encargara de hacer una peticion al servidor para poder verificar que exista o no la curp, se le pasa como argumento el curp
  ExisteCurp( curp: string ): Observable<any> {
    
    let url = ULR_SERVICES + '/verifica/curp';
    // Recibe como parametro la direccion url y el objeto a pasarl
    return this.http.post( url, curp);
  }

}
