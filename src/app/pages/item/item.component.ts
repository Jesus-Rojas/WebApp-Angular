import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: any ;
  id: String ="";
  constructor( private route: ActivatedRoute, public productosService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( parametros => {
        this.productosService.getProducto(parametros['id'])
          .subscribe( (producto :any) => {
            this.producto=producto;
            this.id=parametros['id'];
          });
      });
  }

}
