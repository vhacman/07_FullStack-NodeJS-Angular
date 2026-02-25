import { Component } from '@angular/core';
import { FormNewPerson } from './form-new-person/form-new-person';

@Component({
  selector: 'app-root',
  imports: [FormNewPerson],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
