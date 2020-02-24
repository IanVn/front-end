import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro/registro.service';
import { FormularioService } from 'src/app/servicios/registro/formulario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pasantes',
  templateUrl: './pasantes.component.html',
  styleUrls: ['./pasantes.component.css']
})
export class PasantesComponent implements OnInit {

  // Creamos una variable del tipo FormGroup
  pasantesForm: FormGroup;

  // Observables para guardar las peticiones
  ProgramaAcademico: Observable <any>;
  Modalidad: Observable <any>;
  DepartamentoAdscripcion: Observable<any>;


  constructor( private fb: FormBuilder, private _registro: RegistroService, private formulario: FormularioService) { }

  // Inicalizamos el formulario y los observables
  ngOnInit() {
    this.CrearFormulario();
    this.EmitirFormulario();
    this.ProgramaAcademico = this._registro.ObtenerProgramasAcademicos();
    this.Modalidad = this._registro.ObtenerModalidad();
    this.DepartamentoAdscripcion = this._registro.ObtenerDepartamentoAdscripcion();
  }

  CrearFormulario() {
    this.pasantesForm = this.fb.group( {
      programa_academico: [null, Validators.required],
      modalidad: [null, Validators.required],
      departamento_adscripcion: [null, Validators.required]
    });
  }

  EmitirFormulario() {
    this.pasantesForm.statusChanges.subscribe( data => {
      if( data === 'VALID') {      
        this.formulario.EmitirFormulario( this.pasantesForm );
      } else {
        return;
      }
    });
  }

}
