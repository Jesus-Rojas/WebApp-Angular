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
    return new Promise((resolve, reject) => {
      this.http.get('https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos=resp;
        this.cargando = false;
        resolve('success');
      });
    })
    
  }
  // https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos/prod-1.json
  getProducto (id : String) {
    return this.http.get(`https://webapp-angular-b2410-default-rtdb.firebaseio.com/productos/${id}.json`);
  }
  async buscarProducto( termino: String){
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }
  }
  private filtrarProductos( termino: String){
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( (prod:any) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });
    console.log(this.productosFiltrados);
  }
}
