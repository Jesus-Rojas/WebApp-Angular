import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-paginas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: any[] = [];
  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }
  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp:InfoPagina) => {
        this.info=resp;
      });
  }
  private cargarEquipo() {
    this.http.get('https://webapp-angular-b2410-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp:any) => {
        this.equipo=resp;
      });
  }
}
