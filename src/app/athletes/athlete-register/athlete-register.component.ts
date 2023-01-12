import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  cpfAthlete: string;
  event: Event;
  athlete: Athlete;
  isLinear = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService,
    private athleteService: AthletesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
    this.idEvent = this.activatedRoute.snapshot.params['idEvent'];

    if (localStorage.getItem('cpf') != null) {
      this.cpfAthlete = localStorage.getItem('cpf')!;
      localStorage.removeItem('cpf');
    }

    if (this.cpfAthlete != null) {
      this.findAthlete();
    }

    this.loadEvent();
  }

  updateAthlete(): void {
    const athleteUpdated: Athlete = {
      nome: this.athleteControl.get('nome')!.value!.toString(),
      nascimento: this.athleteControl.get('nascimento')!.value!.toString(),
      sexo: this.athleteControl.get('sexo')!.value!.toString(),
      responsavel:
        this.athleteControl.get('responsavel')!.value != null
          ? this.athleteControl.get('responsavel')!.value!.toString()
          : '',
      endereco: this.athleteControl.get('endereco')!.value!.toString(),
      numero: this.athleteControl.get('numero')!.value!.toString(),
      complemento:
        this.athleteControl.get('complemento')!.value != null
          ? this.athleteControl.get('complemento')!.value!.toString()
          : '',
      cep: this.athleteControl.get('cep')!.value!.toString(),
      cidade: this.athleteControl.get('cidade')!.value!.toString(),
      uf: this.athleteControl.get('uf')!.value!.toString(),
      pais: this.athleteControl.get('pais')!.value!.toString(),
      telefone:
        this.athleteControl.get('telefone')!.value != null
          ? this.athleteControl.get('telefone')!.value!.toString()
          : '',
      celular: this.athleteControl.get('celular')!.value!.toString(),
      email: this.athleteControl.get('email')!.value!.toString(),
      profissao:
        this.athleteControl.get('profissao')!.value != null
          ? this.athleteControl.get('profissao')!.value!.toString()
          : '',
      emergenciaContato: this.athleteControl
        .get('emergenciaContato')!
        .value!.toString(),
      emergenciaFone:
        this.athleteControl.get('emergenciaTelefone')!.value != null
          ? this.athleteControl.get('emergenciaTelefone')!.value!.toString()
          : '',
      emergenciaCelular: this.athleteControl
        .get('emergenciaCelular')!
        .value!.toString(),
      camisa: this.athleteControl.get('camisa')!.value!.toString(),
      camisaCiclismo: this.athleteControl
        .get('camisaCiclismo')!
        .value!.toString(),
      mktLojaPreferida:
        this.athleteControl.get('mktLojaPreferida')!.value != null
          ? this.athleteControl.get('mktLojaPreferida')!.value!.toString()
          : '',
      mktBikePreferida:
        this.athleteControl.get('mktBikePreferida')!.value != null
          ? this.athleteControl.get('mktBikePreferida')!.value!.toString()
          : '',
      mktAro:
        this.athleteControl.get('mktAro')!.value != null
          ? this.athleteControl.get('mktAro')!.value!.toString()
          : '',
      mktCambio:
        this.athleteControl.get('mktCambio')!.value != null
          ? this.athleteControl.get('mktCambio')!.value!.toString()
          : '',
      mktFreio:
        this.athleteControl.get('mktFreio')!.value != null
          ? this.athleteControl.get('mktFreio')!.value!.toString()
          : '',
      mktSuspensao:
        this.athleteControl.get('mktSuspensao')!.value != null
          ? this.athleteControl.get('mktSuspensao')!.value!.toString()
          : '',
      mktMarcaPneu:
        this.athleteControl.get('mktMarcaPneu')!.value != null
          ? this.athleteControl.get('mktMarcaPneu')!.value!.toString()
          : '',
      mktModeloPneu:
        this.athleteControl.get('mktModeloPneu')!.value != null
          ? this.athleteControl.get('mktModeloPneu')!.value!.toString()
          : '',
      mktTenis:
        this.athleteControl.get('mktTenis')!.value != null
          ? this.athleteControl.get('mktTenis')!.value!.toString()
          : '',
      federacao:
        this.athleteControl.get('federacao')!.value != null
          ? this.athleteControl.get('federacao')!.value!.toString()
          : '',
      cpf: this.athleteControl.get('cpf')!.value!.toString(),
      rg: this.athleteControl.get('rg')!.value!.toString(),
      ativo: true,
    };

    this.athleteService.updateAthlete(athleteUpdated).subscribe(
      () => {
        this.openSnackBar('Dados atualizados com sucesso,');
      },
      (error) => {
        this.openSnackBar('Ocorreu um erro ao atualizar seus dados.');
        console.log(error);
      }
    );
  }

  private loadEvent() {
    this.eventService.getEventById(this.idEvent).subscribe((event) => {
      this.event = event;
    });
  }

  private findAthlete() {
    this.athleteService
      .getAthleteByCpf(this.cpfAthlete)
      .subscribe((athlete) => {
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
    this.athleteControl.get('numero')?.setValue(this.athlete.numero);
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

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
