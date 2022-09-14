import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.Interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private servicioUrl = 'https://api.giphy.com/v1/gifs/';
  private api_Key = 'cROnbmDnNguqqtsegDIHGabBBfauMGEW';
  private _historial: string[] = [];

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }


  constructor(private http: HttpClient) {

    localStorage.getItem('historial')
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    let ultimaBusqueda = localStorage.getItem('ultimaBusqueda')! || "";
    this.buscarGifts(ultimaBusqueda);
  }

  buscarGifts(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    localStorage.setItem('ultimaBusqueda', query);


   const params = new HttpParams()
   .set('api_key', this.api_Key)
   .set('limit', '10')
   .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}search`,{params})
      .subscribe(resp => {
      
        this.resultados = resp.data;

      })




  }
}
