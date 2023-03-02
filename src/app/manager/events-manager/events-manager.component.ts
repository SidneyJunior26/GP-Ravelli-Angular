import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';
import { SecurityService } from 'src/app/core/Security/security.service';
import { ExternalService } from 'src/app/core/Shared/external.service';
import { ImageUploadComponent } from 'src/app/shared/image-upload/image-upload.component';
import { Atleta } from 'src/app/shared/models/athlete';
import { Evento } from 'src/app/shared/models/events';
import { LoginManagerComponent } from '../login-manager/login-manager.component';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css'],
})
export class EventsManagerComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private eventoService: EventsService,
    private athleteService: AthletesService,
    private securityService: SecurityService,
    private externalServices: ExternalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}

  @ViewChild('tabgroup') tabGroup: MatTabGroup;
  @ViewChild('paginatorAtleta') paginatorAtleta: MatPaginator;
  @ViewChild('paginatorEvento') paginatorEvento: MatPaginator;

  eventos: Evento[] = [];
  dsEventos: MatTableDataSource<Evento>;
  atletas: Atleta[] = [];
  dsAtletas: MatTableDataSource<Atleta>;
  atleta: Atleta;
  evento: Evento;
  displayedColumnsEvents: string[] = [
    'status',
    'deletar',
    'editar',
    'categorias',
    'regulamento',
    'nome',
    'data',
  ];
  displayedColumnsAthletes: string[] = ['deletar', 'editar', 'cpf', 'nome'];
  token: string;

  eventoControl = this.formBuilder.group({
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

  atletaControl = this.formBuilder.group({
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
    this.token = this.securityService.getToken();

    if (this.token != '') {
      var userInfo = this.securityService.getDecodedAccessToken(this.token);
    }

    if (userInfo == null || userInfo == undefined) {
      this.dialog
        .open(LoginManagerComponent)
        .afterClosed()
        .subscribe(() => {
          this.carregarEventos();
          this.carregarAtletas();
        });
    }

    if (userInfo?.employee == undefined) {
      this.router.navigateByUrl('/');
    } else {
      this.carregarEventos();
      this.carregarAtletas();
    }
  }

  newEvent() {
    this.eventoControl.reset();
    this.tabGroup.selectedIndex = 3;
  }

  private carregarEventos() {
    this.eventoService.consultarTodosEventos().subscribe(
      (events) => {
        this.eventos = events;
        this.dsEventos = new MatTableDataSource(this.eventos);
        this.dsEventos.paginator = this.paginatorEvento;
      },
      (error) => {
        if (error.status == 401) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  carregarEndereco(cep: string) {
    cep = cep.replace('-', '');

    if (cep.length < 8) return;

    this.externalServices.consultarEndereçoPorCEP(cep).subscribe((adress) => {
      this.atletaControl.get('endereco')?.setValue(adress.logradouro);
      this.atletaControl.get('cidade')?.setValue(adress.localidade);
      this.atletaControl.get('uf')?.setValue(adress.uf);
    });
  }

  private carregarAtletas() {
    this.athleteService.consultarTodosAtletas().subscribe(
      (athletes) => {
        this.atletas = athletes;
        this.dsAtletas = new MatTableDataSource(this.atletas);
        this.dsAtletas.paginator = this.paginatorAtleta;
      },
      (error) => {
        if (error.status == 401) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  findAthlete(cpf: string) {
    this.athleteService.consultarAtletaPorCPF(cpf).subscribe(
      (athlete) => {
        this.atleta = athlete;

        if (this.atleta != null) {
          this.loadAthlete();
          this.tabGroup.selectedIndex = 1;
        }
      },
      (error) => {
        if (error.status == 401) {
          this.router.navigateByUrl('');
        }
      }
    );
  }

  private loadAthlete() {
    for (const key in this.atleta) {
      if (this.atletaControl.get(key)) {
        this.atletaControl.get(key)?.setValue(this.atleta[key]);
      }
    }
  }

  editEvent(eventId: number) {
    this.eventoService.ConsultarEventoPeloId(eventId).subscribe((event) => {
      this.evento = event;

      if (this.evento != null) {
        this.carregarEvento();
        this.carregarImagemEvento(this.evento.id);
        this.tabGroup.selectedIndex = 3;
      }
    });
  }

  private carregarEvento() {
    for (const key in this.evento) {
      if (this.eventoControl.get(key)) {
        this.eventoControl.get(key)?.setValue(this.evento[key]);
      }
    }
  }

  private carregarImagemEvento(idEvento: number) {
    var imageUploadComponent = new ImageUploadComponent(this.http);
    imageUploadComponent.carregarImagem(idEvento);
  }

  cadastrarEvento() {
    for (const event in this.eventoControl) {
      this.evento[event] = event;
    }

    this.eventoService.cadastrarEvento(this.evento).subscribe(() => {
      this.abrirMensagem('Evento cadastrado com sucesso.');
      this.carregarEventos();
    });
  }

  deleteEvent(eventId: number) {
    this.eventoService.deletarEventoPeloId(eventId).subscribe(
      () => {
        this.abrirMensagem('Evento excluído com sucesso.');
        this.carregarEventos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  carregarCategoria() {
    this.tabGroup.selectedIndex = 4;
  }

  carregarRegulamento() {
    this.tabGroup.selectedIndex = 5;
  }

  filtrarAtletasporCPF(cpf: any) {
    console.log(cpf.target.value);
    if (cpf.target.value.trim() != '') {
      this.athleteService
        .getAllAthletesByCpf(cpf.target.value)
        .subscribe((atletas) => {
          this.atletas = atletas;
          this.dsAtletas = new MatTableDataSource(this.atletas);
          this.dsAtletas.paginator = this.paginatorAtleta;
        });
    } else {
      this.carregarAtletas();
    }
  }

  filtrarAtletasPorNome(name: any) {
    console.log(name.target.value);
    if (name.target.value.trim() != '') {
      this.athleteService
        .getAllAthletesByName(name.target.value)
        .subscribe((atletas) => {
          this.atletas = atletas;
          this.dsAtletas = new MatTableDataSource(this.atletas);
          this.dsAtletas.paginator = this.paginatorAtleta;
        });
    } else {
      this.carregarAtletas();
    }
  }

  private abrirMensagem(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
