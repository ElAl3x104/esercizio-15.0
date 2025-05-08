import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from './models/foo.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent{
  data!: Object;
  loading!: boolean;
  o! : Observable<Object>;
  fooData! : Foo[];
  oPost! : Observable<Object>;
  oFoo! : Observable<Foo[]>; 



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

  makePost(): void {
    // Definisco i dati da spedire
    let dataToSend = JSON.stringify({ 
      body: 'bar',
      title: 'foo',
      userId: 1
    });

    this.loading = true;

    //Faccio la richiesta post
    this.oPost = this.http.post('https://jsonplaceholder.typicode.com/posts', dataToSend)
    this.oPost.subscribe(this.getPostResponse);
  }

   //Ricevo i dati in risposta dalla post (Nota, non sono ancora tipizzati)
   getPostResponse = (data : Object) => {
    this.data = data;
    this.loading = false;
  }
  



  makeTypedRequest() : void
 {
   //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
   this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
   this.oFoo.subscribe(data => {this.fooData = data;});
 }

}
