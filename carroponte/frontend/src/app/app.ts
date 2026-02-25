import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormNewShow } from './form-new-show/form-new-show';

@Component({
  selector: 'app-root',
  imports: [FormNewShow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
