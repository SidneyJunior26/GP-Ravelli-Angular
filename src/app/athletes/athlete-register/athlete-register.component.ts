import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';
import { Athlete } from 'src/app/shared/models/athlete';
import { Event } from 'src/app/shared/models/events';

@Component({
  selector: 'app-athlete-register',
  templateUrl: './athlete-register.component.html',
  styleUrls: ['./athlete-register.component.css'],
})
export class AthleteRegisterComponent implements OnInit {
  idEvent: string;
  idAthlete: string;
  event: Event;
  athlete: Athlete;
  isLinear = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService,
    private athleteService: AthletesService,
    private formBuilder: FormBuilder
  ) {}

  eventControl = this.formBuilder.group({
    categoria: new FormControl('', Validators.required),
  });

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
    federacao: new FormControl(''),
  });

  ngOnInit(): void {
    this.idAthlete = this.activatedRoute.snapshot.params['idAthlete'];
    this.idEvent = this.activatedRoute.snapshot.params['idEvent'];

    if (this.idAthlete != null) {
      this.findAthlete();
    }

    this.loadEvent();
  }

  private loadEvent() {
    this.eventService.getEventById(this.idEvent).subscribe((event) => {
      this.event = event;
    });
  }

  private findAthlete() {
    this.athleteService.getAthleteById(this.idAthlete).subscribe((athlete) => {
      this.athlete = athlete;

      if (this.athlete != null) {
        this.loadAthlete();
      }
    });
  }

  private loadAthlete() {
    this.athleteControl.get('nome')?.setValue(this.athlete.nome);
    this.athleteControl.get('nascimento')?.setValue(this.athlete.nascimento);
    this.athleteControl.get('sexo')?.setValue(this.athlete.sexo);
    this.athleteControl.get('responsavel')?.setValue(this.athlete.responsavel);
    this.athleteControl.get('endereco')?.setValue(this.athlete.endereco);
    this.athleteControl.get('complemento')?.setValue(this.athlete.complemento);
    this.athleteControl.get('cep')?.setValue(this.athlete.cep);
    this.athleteControl.get('cidade')?.setValue(this.athlete.cidade);
    this.athleteControl.get('uf')?.setValue(this.athlete.uf);
    this.athleteControl.get('pais')?.setValue(this.athlete.pais);
    this.athleteControl.get('telefone')?.setValue(this.athlete.telefone);
    this.athleteControl.get('celular')?.setValue(this.athlete.celular);
    this.athleteControl.get('email')?.setValue(this.athlete.email);
    this.athleteControl.get('profissao')?.setValue(this.athlete.profissao);
    this.athleteControl
      .get('emergenciaContato')
      ?.setValue(this.athlete.emergenciaContato);
    this.athleteControl
      .get('emergenciaTelefone')
      ?.setValue(this.athlete.emergenciaFone);
    this.athleteControl
      .get('emergenciaCelular')
      ?.setValue(this.athlete.emergenciaCelular);
    this.athleteControl.get('camisa')?.setValue(this.athlete.camisa);
    this.athleteControl
      .get('camisaCiclismo')
      ?.setValue(this.athlete.camisaCiclismo);
    this.athleteControl
      .get('mktLojaPreferida')
      ?.setValue(this.athlete.mktLojaPreferida);
    this.athleteControl
      .get('mktBikePreferida')
      ?.setValue(this.athlete.mktBikePreferida);
    this.athleteControl.get('mktAro')?.setValue(this.athlete.mktAro);
    this.athleteControl.get('mktCambio')?.setValue(this.athlete.mktCambio);
    this.athleteControl.get('mktFreio')?.setValue(this.athlete.mktFreio);
    this.athleteControl
      .get('mktSuspensao')
      ?.setValue(this.athlete.mktSuspensao);
    this.athleteControl
      .get('mktMarcaPneu')
      ?.setValue(this.athlete.mktMarcaPneu);
    this.athleteControl
      .get('mktModeloPneu')
      ?.setValue(this.athlete.mktModeloPneu);
    this.athleteControl.get('mktTenis')?.setValue(this.athlete.mktTenis);
    this.athleteControl.get('cpf')?.setValue(this.athlete.cpf);
    this.athleteControl.get('rg')?.setValue(this.athlete.rg);
  }
}
