import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Agregar empleado';
  boton = 'Agregar';

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      DNI: ['', Validators.required],
      sueldo: ['', Validators.required]
    })
    
    // Obtenemos el ID y levantamos los datos de Firebase
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  // Para el boton
  agregarEditarEmpleado(){
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id == null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    const empleado: Empleado = {
      // Accede al formulario
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      DNI: this.createEmpleado.value.DNI,
      sueldo: this.createEmpleado.value.sueldo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._empleadoService.agregarEmpleado(empleado).then(() =>{
      this.toastr.success('¡El empleado se registró con éxito!', 'Empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/list-empleados']);
    }).catch(error =>{
      console.log(error);
    })
  }

  editarEmpleado(id: string){
    const empleado: Empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      DNI: this.createEmpleado.value.DNI,
      sueldo: this.createEmpleado.value.sueldo,
      fechaActualizacion: new Date(),

    }
    this._empleadoService.actualizarEmpleado(id, empleado).then(() =>{
      this.toastr.info('El empleado se editó con éxito', 'Empleado editado',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
    })
  }

  esEditar(){
    // Se ejecuta solo cuando el ID tiene un valor
    if(this.id !== null){
      this.titulo = 'Editar empleado'
      this.boton = 'Editar'
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          DNI: data.payload.data()['DNI'],
          sueldo: data.payload.data()['sueldo']
        })
      })
    }
  }

}
