import { Component, inject, signal } from '@angular/core';
import { PeopleService } from '../people-service';
import { Person } from '../model/entities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-test',
  imports: [],
  templateUrl: './person-test.html',
  styleUrl: './person-test.css',
})
export class PersonTest {

    peopleService = inject(PeopleService);
    person = signal<Person| null>(null);
    errorMessage = signal<string>("");

    load1():void{

        console.log("Provo a caricare");
        let personObservable = this.peopleService.fetchOne(1);
        // questo è come dire fetch() ma NON è ancora partita
        // parte quando un osservatore si ABBONA, SUBSCRIBE, all'Observable
        // LA REQUEST PARTE ORA
        personObservable.subscribe(
            // questo è un Observer, queste graffe identificano un OBSERVER, un oggetto
            // che gestisce i dati prodotti da un Observable
            {
                // then aggiorno il signal
                next:json=>this.person.set(json),
                // catch
                error:err=>this.errorMessage.set(err)
            }
        );
    }
    

}
