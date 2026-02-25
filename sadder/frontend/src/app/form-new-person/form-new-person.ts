import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../model/Person';
import { PersonService } from '../person-service';

@Component({
  selector: 'app-form-new-person',
  imports: [FormsModule],
  templateUrl: './form-new-person.html',
  styleUrl: './form-new-person.css',
})
export class FormNewPerson {

  person: Person = {
    name: "",
    surname: "",
    birthdate: "",
    x: 0,
    y: 0
  }

  service = inject(PersonService);

  savePerson(): void {
    this.service.insert(this.person);
    alert('saved');
    this.person = {
      name: "",
      surname: "",
      birthdate: "",
      x: 0,
      y: 0
    }
  }
}
