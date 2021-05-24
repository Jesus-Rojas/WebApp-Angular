import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[]=[];
  productosFiltrados: Producto[]=[];

  constructor( private http:HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos () {
    this.http.get('https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos=resp;
        this.cargando = false;
      });
  }
  // https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos/prod-1.json
  getProducto (id : String) {
    return this.http.get(`https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos/${id}.json`);
  }
  buscarProducto( termino: String){
    this.productosFiltrados = this.productos.filter( producto =>{
      return true;
    });
    console.log(this.productosFiltrados);
  }
}
