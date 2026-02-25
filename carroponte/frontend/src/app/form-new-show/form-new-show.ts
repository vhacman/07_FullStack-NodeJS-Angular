import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Show } from '../model/Show';
import { ShowService } from '../show-service';

@Component({
  selector: 'app-form-new-show',
  imports: [FormsModule],
  templateUrl: './form-new-show.html',
  styleUrl: './form-new-show.css',
})
export class FormNewShow {

  show: Show = {
    title: "",
    description: "",
    date: ""
  }

  service = inject(ShowService);

  saveShow(): void {
    this.service.insert(this.show);
    alert('saved');
    this.show = {
      title: "",
      description: "",
      date: ""
    }
  }
}
