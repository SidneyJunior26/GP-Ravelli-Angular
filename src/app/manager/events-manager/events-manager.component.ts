import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { EventsService } from 'src/app/core/Events/events.service';
import { Event } from 'src/app/shared/models/events';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css'],
})
export class EventsManagerComponent implements OnInit {
  @ViewChild('tabgroup') tabGroup: MatTabGroup;
  @ViewChild('paginator') paginator: MatPaginator;

  events: Event[] = [];
  dsEvents: MatTableDataSource<Event>;
  event: Event;
  displayedColumns: string[] = [
    'status',
    'deletar',
    'editar',
    'categorias',
    'regulamento',
    'nome',
    'data',
  ];

  eventControl = this.formBuilder.group({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    local: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    dataIniInscricao: new FormControl('', Validators.required),
    dataFimInscricao: new FormControl('', Validators.required),
    dataDesconto: new FormControl('', Validators.required),
    dataValorNormal: new FormControl('', Validators.required),
    valor1: new FormControl('', Validators.required),
    valor2: new FormControl('', Validators.required),
    valorNormal: new FormControl('', Validators.required),
    pacote2V1: new FormControl('', Validators.required),
    pacote2V2: new FormControl('', Validators.required),
    pacote2V3: new FormControl('', Validators.required),
    pacote3V1: new FormControl('', Validators.required),
    pacote3V2: new FormControl('', Validators.required),
    pacote3V3: new FormControl('', Validators.required),
    pacote4V1: new FormControl('', Validators.required),
    pacote4V2: new FormControl('', Validators.required),
    pacote4V3: new FormControl('', Validators.required),
    pacote1Desc: new FormControl('', Validators.required),
    pacote2Desc: new FormControl('', Validators.required),
    pacote3Desc: new FormControl('', Validators.required),
    pacote4Desc: new FormControl('', Validators.required),
    pacote1Ativo: new FormControl('', Validators.required),
    pacote2Ativo: new FormControl('', Validators.required),
    pacote3Ativo: new FormControl('', Validators.required),
    pacote4Ativo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    boletoInf1: new FormControl('', Validators.required),
    boletoInf2: new FormControl('', Validators.required),
    boletoInf3: new FormControl('', Validators.required),
    boletoInstrucao1: new FormControl('', Validators.required),
    boletoInstrucao2: new FormControl('', Validators.required),
    boletoInstrucao3: new FormControl('', Validators.required),
    obsTela: new FormControl('', Validators.required),
    txtEmailCadastro: new FormControl('', Validators.required),
    txtEmailBaixa: new FormControl('', Validators.required),
    ativaInscricao: new FormControl('', Validators.required),
    ativaEvento: new FormControl('', Validators.required),
    eventoTipo: new FormControl('', Validators.required),
    pacote1V1Pseg: new FormControl('', Validators.required),
    pacote1V2Pseg: new FormControl('', Validators.required),
    pacote1V3Pseg: new FormControl('', Validators.required),
    pacote2V1Pseg: new FormControl('', Validators.required),
    pacote2V2Pseg: new FormControl('', Validators.required),
    pacote2V3Pseg: new FormControl('', Validators.required),
    pacote3V1Pseg: new FormControl('', Validators.required),
    pacote3V2Pseg: new FormControl('', Validators.required),
    pacote3V3Pseg: new FormControl('', Validators.required),
    pacote4V1Pseg: new FormControl('', Validators.required),
    pacote4V2Pseg: new FormControl('', Validators.required),
    pacote4V3Pseg: new FormControl('', Validators.required),
    notifications: new FormControl([]),
    isValid: new FormControl(false),
  });

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  newEvent() {
    this.eventControl.reset();
    this.tabGroup.selectedIndex = 1;
  }

  private loadEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
      this.dsEvents = new MatTableDataSource(this.events);
      this.dsEvents.paginator = this.paginator;
    });
  }

  editEvent(eventId: number) {
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;

      if (this.event != null) {
        this.loadEvent();
        this.tabGroup.selectedIndex = 1;
      }
    });
  }

  private loadEvent() {
    for (const key in this.event) {
      if (this.eventControl.get(key)) {
        this.eventControl.get(key)?.setValue(this.event[key]);
      }
    }
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEventById(eventId).subscribe(
      () => {
        this.openMessage('Evento excluído com sucesso.');
        this.loadEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCategory() {
    this.tabGroup.selectedIndex = 2;
  }

  loadRegulamento() {
    this.tabGroup.selectedIndex = 3;
  }

  private openMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
