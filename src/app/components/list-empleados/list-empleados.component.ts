import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  page: number = 1;
  searchText: any;
  empleados: any[] = [];

  constructor( private _empleadoService: EmpleadoService,
    private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    // Utilizamos el servicio, al ser un observable hay que suscribirse
    // Cuando termina de hacer la suscripcion, imprimimos la información que tiene data
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      // For Each para iterar entre la informacion que tiene data
      data.forEach((element: any) => {
        // Añadimos los valores al array
        this.empleados.push({
          // Creamos un objeto con todos los elementos de ese ID
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(() =>{
      this.toastr.error('¡El empleado se eliminó con éxito!', 'Empleado eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }
}
