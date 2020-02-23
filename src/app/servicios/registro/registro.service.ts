import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ULR_SERVICES } from '../../config/config';
import { Observable, throwError, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Tipos } from '../../models/tipos';



@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  
  // Tenemos que inyectar el servicio de HTTP
  constructor( private http: HttpClient) { }

  // Este metodo se encargara de hacer una peticion al servidor para poder verificar que exista o no la curp, se le pasa como argumento el curp
  ExisteCurp( curp: string ): Observable<any> {
    
  let url = ULR_SERVICES + '/verifica/curp';
    // Recibe como parametro la direccion url y el objeto a pasar, el nombre de dicho objeto tiene que ser el mismo que se obtiene del body en el backend
  return this.http.post( url, {curp}).pipe(
    map( (data: any) => data.estado),
    catchError( error => of(error.error.estado))
    );
  }

  // Peticion para poder verificar la existencia del correo
  ExisteCorreo( correo: string ): Observable<any> {

    let url = ULR_SERVICES + '/verifica/correo';

    return this.http.post( url, {correo}).pipe( 
      map( ( data: any ) => data.estado ),
      catchError( ( error: any ) => of(error.error.estado) )
     );
  }

  // Peticion para obtener todos los tipos
  GetTipos(): Observable <any> {
    let url = ULR_SERVICES + '/obtener/tipos';
    return this.http.get <any> (url).pipe(
      map( tipos => tipos.tipo )
    );
  }

  ObtenerEstudiosProfesionales(): Observable <any> {
    let url = ULR_SERVICES + '/obtener/estudiosProfesionales';

    // Hacemos la peticion GET
    return this.http.get( url ).pipe(
      map( ( estudios: any ) => estudios.estudios_profesionales )
    );
  }


}
