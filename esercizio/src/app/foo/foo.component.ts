import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent{
  data!: Object;
  loading!: boolean;
  o! : Observable<Object>;

  http: HttpClient;
  constructor(http: HttpClient){
    this.http = http;
  }


  makeRequest(): void {
    //Notifichiamo che stiamo attendendo dei dati
    this.loading = true; 
    //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
    //risposta
    this.o.subscribe(this.getData);
  }
  //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
  getData = (d : Object) =>
  {
    this.data = d; //Notifico l’oggetto ricevuto dal server
    this.loading = false;  // Notifico che ho ricevuto i dati
  }
}
