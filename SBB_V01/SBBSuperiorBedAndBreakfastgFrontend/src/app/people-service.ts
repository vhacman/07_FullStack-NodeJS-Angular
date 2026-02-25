import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from './model/entities';
import { Observable } from 'rxjs';
// c'è una sottocategoria di servizi il cui lavoro è
// parlare con le API e quindi essere intermediari col database
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  
    http = inject(HttpClient);
    apiURL = "http://localhost:3000/api/people";

    // un Observable è un flusso di dati
    // QUESTO Observable in particolare si comporta come una fetch
    // PROVA a caricare dei dati da una API
    // se ci riesce darà un risultato
    // se non ci riesce darà un errore
    public fetchWhere(q:string):Observable<Person[]>{
        return this.http.get<Person[]>(this.apiURL+"/?q="+q);
        // PENSATELO COME UNA PROMISE
        // NON è la stessa cosa ma funziona analogamente stavolta
        // solo quando usate http
    }

    // GET http://localhost:3000/api/people/1
    public fetchOne(id:number){
        return this.http.get<Person>(this.apiURL+"/"+id);
    }


}