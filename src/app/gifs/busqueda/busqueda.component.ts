import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
 
})
export class BusquedaComponent  {

@ViewChild('txtBuscar') txtBUscar!:ElementRef<HTMLInputElement>;

  buscar(){
    const valor =this.txtBUscar.nativeElement.value;
     if(valor.trim().length == 0 ){
      return;
     }
    this.giftsService.buscarGifts(valor);
    this.txtBUscar.nativeElement.value='';
  }
  

 constructor(private giftsService:GifsService){}


}
