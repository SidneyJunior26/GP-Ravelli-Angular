import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';

@Component({
  selector: 'app-athlete-register',
  templateUrl: './athlete-register.component.html',
  styleUrls: ['./athlete-register.component.css'],
})
export class AthleteRegisterComponent implements OnInit {
  idEvent: string;
  idAthlete: string;
  event: any;
  athlete: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService,
    private formBuilder: FormBuilder
  ) {}

  athleteControl = this.formBuilder.group({
    nome: new FormControl('', Validators.required),
    nascimento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    responsavel: new FormControl(''),
    endereco: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    complemento: new FormControl(''),
    cep: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    uf: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    telefone: new FormControl(''),
    celular: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    profissao: new FormControl(''),
    emergenciaContato: new FormControl('', Validators.required),
    emergenciaTelefone: new FormControl(''),
    emergenciaCelular: new FormControl('', Validators.required),
    camisa: new FormControl('', Validators.required),
    camisaCiclismo: new FormControl('', Validators.required),
    mktLojaPreferida: new FormControl(''),
    mktBikePreferida: new FormControl(''),
    mktAro: new FormControl(''),
    mktCambio: new FormControl(''),
    mktFreio: new FormControl(''),
    mktSuspensao: new FormControl(''),
    mktMarcaPneu: new FormControl(''),
    mktModeloPneu: new FormControl(''),
    mktTenis: new FormControl(''),
  });

  ngOnInit(): void {
    this.idEvent = this.activatedRoute.snapshot.params['idEvento'];

    this.loadEvent();
  }

  loadEvent() {
    this.eventService.getEventById(this.idEvent).subscribe((event) => {
      this.event = event;
    });
  }
}
