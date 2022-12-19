export class Empleado{
    nombre: string;
    apellido: string;
    DNI: string;
    sueldo: number;
    fechaCreacion?: Date;
    fechaActualizacion: Date;
    

    constructor(nombre: string, apellido: string, DNI: string, sueldo: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.sueldo = sueldo;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
    }
}
