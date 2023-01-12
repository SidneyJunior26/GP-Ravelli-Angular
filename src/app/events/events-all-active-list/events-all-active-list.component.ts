import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'app-events-all-active-list',
  templateUrl: './events-all-active-list.component.html',
  styleUrls: ['./events-all-active-list.component.css'],
})
export class EventsAllActiveListComponent implements OnInit {
  events: any[] = [];
  eventsOpen: any[] = [];
  btnVisible: boolean = true;
  constructor(
    private service: EventsService,
    private snackBar: MatSnackBar,
    private serviceAthlete: AthletesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listEvents();
    this.listEventsOpen();
  }

  private listEvents() {
    this.service.getEvents().subscribe((events) => this.events.push(...events));
  }

  private listEventsOpen() {
    this.service
      .getEventsActives()
      .subscribe((events) => this.eventsOpen.push(...events));
  }

  changeView(): void {
    if (this.btnVisible) this.btnVisible = false;
    else this.btnVisible = true;
  }

  findUserByCpf(cpf: string, eventId: string) {
    if (cpf == null || cpf == '') {
      this.openMessage('Informe seu CPF/CNPJ');
      return;
    }

    cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    this.serviceAthlete.getAthleteByCpf(cpf).subscribe(
      (athlete) => {
        localStorage.setItem('cpf', cpf);
        localStorage.setItem('eventId', eventId);
        this.dialog.open(LoginComponent);
      },
      (error) => {
        if (error.status == 404)
          this.router.navigateByUrl('eventos/' + eventId);
      }
    );
  }

  private openMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
