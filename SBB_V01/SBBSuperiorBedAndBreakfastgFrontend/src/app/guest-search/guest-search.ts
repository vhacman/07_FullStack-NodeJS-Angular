import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necessario per usare [(ngModel)] nel template
import { GuestService } from '../guest-service/guest-service';
import { Guest } from '../model/entities';

@Component({
  selector: 'app-guest-search',
  imports: [FormsModule],
  templateUrl: './guest-search.html'
})
export class GuestSearch {

  // inietto il servizio per fare le chiamate HTTP al backend
  guestService = inject(GuestService);

  // proprietà normale (non signal) perché [(ngModel)] non aggiorna i signal automaticamente:
  // [(ngModel)]="x" è equivalente a [ngModel]="x" (ngModelChange)="x=$event"
  // con un signal, "x=$event" sovrascrive la variabile invece di chiamare signal.set()
  lastName = '';

  // results è un signal: viene letto nel template con results() e aggiornato con .set()
  results = signal<Guest[]>([]);

  // questo metodo viene chiamato solo quando l'utente clicca il pulsante Search
  // non parto automaticamente mentre l'utente digita, come richiesto dall'esercizio
  search()
  {
    this.guestService.findByLastName(this.lastName)
                      .subscribe({
                          next: (guests) => this.results.set(guests),  // aggiorno i risultati con quelli ricevuti
                          error: () => this.results.set([])             // in caso di errore svuoto la lista
    });
  }
}
