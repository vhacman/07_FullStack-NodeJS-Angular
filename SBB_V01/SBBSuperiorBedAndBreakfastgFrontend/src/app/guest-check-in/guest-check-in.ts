import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../guest-service/guest-service';
import { Guest } from '../model/entities';

@Component({
  selector: 'app-guest-check-in',
  imports: [FormsModule],
  templateUrl: './guest-check-in.html',
  styleUrl: './guest-check-in.css',
})
export class GuestCheckIn {

    guestService = inject(GuestService);
    isLoading = signal<boolean>(false);
    operationMessage = signal<string>("");

    ssn = signal<string>("");
    guest:Guest = {
        firstName:"",
        lastName:"",
        ssn:"",
        address:"",
        city:""};
    // se ho trovato un guest, lo prendo
    // in caso contrario posso inserirlo
    confirm = signal<boolean>(false);
    notFound = signal<boolean | null>(null);


    checkPresent():void{
        if(!this.ssn())
            return;

        this
            .guestService
            .findBySsn(this.ssn())
            .subscribe(
                {
                    next: json=>
                    {
                        this.guest = json;
                        this.notFound.set(false);
                    },
                    error:err=>
                        this.notFound.set(true)
                }
            );
    }

    confirmSsn():void{
        this.confirm.set(true);
        this.guest.ssn = this.ssn();
    }

    send():void{

        this.isLoading.set(true);

        this
            .guestService
            .insert(this.guest)
            .subscribe(
                {
                    next: json=>
                    {
                        this.isLoading.set(false);
                        this.operationMessage.set("Inserted with id "+json.id);
                        // resettare tutto per riselezionare il codice fiscale                       
                    },
                    error:err=>
                        this.operationMessage.set(err+"")
                }
            );
    }

}