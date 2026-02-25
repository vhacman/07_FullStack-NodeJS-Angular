import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from './model/Show';

@Injectable({
  providedIn: 'root',
})
export class ShowService
{
    /*
        @Autowired
        HttpClient http;
    */
    http     = inject(HttpClient);
    urlAPI   = "http://localhost:3000/carroponte/api/shows";

    public insert(show: Show): void
    {
        // devo chiamare le API e mandargli lo show
        // sto eseguendo una request post e show è il BODY della request

        // fetch(urlAPI, {method="POST", body={title:A, description:B, date:C}})
        this
            .http
            .post<Show>(this.urlAPI, show)
            .subscribe(json => console.log(json));
            // subscribe è circa come then, quando mi risponde io lo loggo
    }
}