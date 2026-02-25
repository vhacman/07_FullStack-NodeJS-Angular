import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from '../model/entities';
@Injectable({
  providedIn: 'root'
})
export class GuestService {

    http = inject(HttpClient);

    apiURL = "http://localhost:3000/api/guests";

    public findBySsn(ssn:string):Observable<Guest> {
        let url = this.apiURL+"/byssn/"+ssn;
        return this.http.get<Guest>(url);
    }

    // Ho aggiunto questo metodo per cercare i guest per cognome.
    // A differenza di findBySsn, qui il tipo di ritorno è Observable<Guest[]>
    // perché il backend può restituire più risultati (array).
    public findByLastName(lastName:string):Observable<Guest[]> {
        let url = this.apiURL+"/bylastname/"+lastName;
        return this.http.get<Guest[]>(url);
    }

    public insert(guest:Guest):Observable<Guest>{
        return this.http.post<Guest>(this.apiURL, guest);
    }

}