import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Validadores } from './validadores';
import { RegistroService } from '../../servicios/registro/registro.service';
import { switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tipos } from 'src/app/models/tipos';


declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit{

  // tslint:disable-next-line: ban-types
  hide: Boolean = true;
  
  // Creamos una variable del tipo formgroup para usar formularios reactivos
  formulario: FormGroup;
  // Creamos una expresion regular para el formato del CURP
  formato = new RegExp('^[A-Z]{4}\\d{6}([A-Z]{6})\\d{2}$', 'i');
  
  // Array para almacenar los tipos
  tipos: Observable< Tipos[] >;
  
  // Realizamos la inyecccion del formBuilder y el registro del servicio
  // tslint:disable-next-line: variable-name
  constructor( private _fb: FormBuilder, public _registro: RegistroService, private _cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    init_plugins();
    this.CrearFormulario();
  }

  ngAfterViewInit() {
    this.ValoresDefecto();
    this.CompararPassword();
    this.ExisteCurp();
    this.ExisteCorreo();
    this.tipos = this._registro.GetTipos();
    this._cdRef.detectChanges();

  }
  CrearFormulario() {

    // Creamos el formulario
    this.formulario = this._fb.group( {     
      // Definimos los campos del formulario
      curp: [null, [Validators.required, Validators.pattern(this.formato)]],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      fecha_nacimiento: [null, [Validators.required, Validadores.AnioFecha]],
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      opcion: [null]
  });
  }

  ValoresDefecto() {
    this.formulario.setValue( {
      curp: 'SASJ960311HNTLNN10',
      nombre: 'Ian',
      apellido: 'Vn',
      fecha_nacimiento: '1996-03-11',
      correo: 'shen_woo96@hotmail.com',
      password: '123456',
      confirm_password: '123456',
      opcion: 'option1'
    })
  }

  // Funcion para obtener acceso al control del formulario
  get f() {
    return this.formulario.controls;
  } 

  registro() {
    console.log(this.formulario);
  }

  // Funcion para obtener los errores del curp
  getErrorCurp() {
    return this.f.curp.hasError('required') ? 'La CURP es obligatoria' :   
    this.f.curp.hasError('pattern') ? 'El curp no cumple con el formato adecuado' : 
    this.f.curp.hasError('existeCurp') ? 'El curp ya esta registrado en el sistema' : '';  
  }

  getErrorCorreo() {
    return this.f.correo.hasError('required') ? 'Debe insertar un correo' : 
    this.f.correo.hasError('email') ? 'No es un correo valido' : 
    this.f.correo.hasError('existeCorreo') ? 'Este correo ya esta registrado' : '';
  }

  // Configuramos un observable para que verifique la contraseña Observable<ValidationErrors> | null data !== this.f.password.value
  // tslint:disable-next-line: variable-name
  CompararPassword()  {
      
    this.f.confirm_password.valueChanges.subscribe( data => {
        if ( data !== this.f.password.value ) {
          // Con esta instruccion es como si estuvieramos creando un nuevo validador
           this.f.confirm_password.setErrors( { SonDiferentes: true} );
        } else {
          this.f.confirm_password.setErrors( null);
        }
    } );
  }

  getErrorPassword() {
    return this.f.confirm_password.hasError('required') ? 'Este campo es obligatorio' :
    this.f.confirm_password.hasError('SonDiferentes') ? 'No coinciden las contraseñas' : '';
  }

  ExisteCurp() {
    this.f.curp.valueChanges.pipe(
    filter( data => data.length === 18 ),
    switchMap( ( data: any  ) => {
      return this._registro.ExisteCurp(data);
    }))
    .subscribe( data => {
      if ( !data) {
        // Actualizamos el error para la curp
        this.f.curp.setErrors( { existeCurp: true } );
      } else {
        this.f.curp.setErrors( null );
      }});
    }
  
  ExisteCorreo() {
      this.f.correo.valueChanges.pipe( 
      switchMap( ( data: any ) => this._registro.ExisteCorreo( data) )
      ).subscribe( data => {
        if ( !data ) {
          this.f.correo.setErrors( { existeCorreo: true });
        } else {
          this.f.correo.setErrors( null );
        }
      });
    }
  
  // ObtenerTipos() {
  //   this._registro.GetTipos().subscribe( tipos => console.log(tipos));
  // }
  
  
}
