import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './model/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService
{
    /*
        @Autowired
        HttpClient http;
    */
    http   = inject(HttpClient);
    urlAPI = "http://localhost:3000/sadder/api/people";

    public getAll(): Observable<Person[]>
    {
        return this.http.get<Person[]>(this.urlAPI);
    }

    public insert(person: Person): void
    {
        // devo chiamare le API e mandargli la person
        // sto eseguendo una request post e person è il BODY della request

        // fetch(urlAPI, {method="POST", body:{name:A, surname:B, ...}})
        this
            .http
            .post<Person>(this.urlAPI, person)
            .subscribe(json => console.log(json));
            // subscribe è circa come then, quando mi risponde io lo loggo
    }
}
