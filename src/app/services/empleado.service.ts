import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})

// Para hacer las peticiones a firebase
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: Empleado): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any>{
    // Cambios sincronizados
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }
  actualizarEmpleado(id: string, empleado: Empleado): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(empleado);

  }
}
