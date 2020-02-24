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

  // Peticion para obtener los grados de estudios
  ObtenerGradosEstudios(): Observable < any > {
    let url = ULR_SERVICES + '/obtener/gradoEstudios';

    // Hacemos la peticion GET
    return this.http.get( url ).pipe(
      map( ( GradoEstudios: any ) => GradoEstudios.grado_estudios )
    );
  }

  // Peticion para obtener las escuelas
  ObtenerEscuelas(): Observable <any> {
    let url = ULR_SERVICES + '/obtener/escuelas';

    // Hacemos la peticion
    return this.http.get( url ).pipe( 
      map( ( escuela: any ) => escuela.escuela )
     );
  }

  // Peticion para obtener el cargo academico
  ObtenerCargoAcademico(): Observable < any > {
    
    let url = ULR_SERVICES + '/obtener/cargoAcademico';

    // Hacemos la peticion GET
    return this.http.get( url ).pipe( 
      map( ( cargo: any) => cargo.cargo_academico )
     );
  }

  // Peticion para obtener el nombramiento
  ObtenerNombramiento(): Observable <any> {
    let url = ULR_SERVICES + '/obtener/nombramiento';

    // Hacemos la peticion GET
    return this.http.get( url ).pipe(
      map( ( nombramiento: any ) => nombramiento.nombramiento )
    );
  }

  // Peticion para obtener los lugares de imparticion de clase
  ObtenerLugarImparticionClase(): Observable <any> {
    
    let url = ULR_SERVICES + '/obtener/imparticionClase';
    return this.http.get( url ).pipe( 
      map( ( imparticion: any ) => imparticion.imparticion_clase )
     );
  }

  // Peticion para obtener los programas academicos
  ObtenerProgramasAcademicos(): Observable <any> {
    
    let url = ULR_SERVICES +'/obtener/programaAcademico';

    return this.http.get( url ).pipe( 
      map( ( programaAcademico: any) => programaAcademico.programa_academico )
     );
  }

  // Peticion para obtener los departamentos de adscripcion
  ObtenerDepartamentoAdscripcion(): Observable <any> {

    let url = ULR_SERVICES +'/obtener/departamentoColaboracional';
    return this.http.get( url ).pipe(
      map( ( departamento: any) => departamento.departamento_colaboracional )
    );
  }

  // Peticion para obtener la modalidad
  ObtenerModalidad(): Observable <any> {
    
    let url = ULR_SERVICES + '/obtener/modalidad';

    return this.http.get( url ).pipe(
      map( ( modalidad: any ) => modalidad.modalidad )
    );
  }
  

}
