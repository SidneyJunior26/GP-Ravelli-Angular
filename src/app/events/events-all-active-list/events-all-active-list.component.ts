import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';
import { SecurityService } from 'src/app/core/Security/security.service';
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
    private athleteService: AthletesService,
    private router: Router,
    private dialog: MatDialog,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.listEvents();
    this.listEventsOpen();
  }

  private listEvents() {
    this.service
      .getEventsComing()
      .subscribe((events) => this.events.push(...events));
  }

  private listEventsOpen() {
    this.service
      .getEventsActives()
      .subscribe((events) => this.eventsOpen.push(...events));
  }

  changeView(eventId: string): void {
    const token = this.securityService.getToken();

    if (token != null)
      var userInfo = this.securityService.getDecodedAccessToken(token);

    if (userInfo != null) {
      this.router.navigateByUrl('eventos/' + eventId);
    }

    if (this.btnVisible) this.btnVisible = false;
    else this.btnVisible = true;
  }

  verifyIfUserExists(cpf: string, eventId: string) {
    if (cpf == null || cpf == '') {
      this.openMessage('Informe seu CPF/CNPJ');
      return;
    }

    cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    this.athleteService.verifyIfUserExists(cpf).subscribe(
      () => {
        this.logIn(cpf, eventId);
      },
      (error) => {
        if (error.status == 404)
          this.router.navigateByUrl('eventos/' + eventId);
        if (error.status == 401) {
          this.securityService.removeToken();
          this.logIn(cpf, eventId);
        }
      }
    );
  }

  private logIn(cpf: string, eventId: string) {
    localStorage.setItem('eventId', eventId);
    localStorage.setItem('cpf', cpf);
    this.dialog.open(LoginComponent);
  }

  private openMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
