import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestCheckIn } from "./guest-check-in/guest-check-in";
import { PersonTest } from "./person-test/person-test";
import { GuestSearch } from './guest-search/guest-search';

@Component({
  selector: 'app-root',
  imports: [GuestCheckIn, GuestSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SBBSuperiorBedAndBreakfast');
}
