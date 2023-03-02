import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { EventsService } from 'src/app/core/Events/events.service';
import { MedicalRecordsService } from 'src/app/core/MedicalRecords/medical-records.service';
import { RegulationService } from 'src/app/core/Regulation/regulation.service';
import { SecurityService } from 'src/app/core/Security/security.service';
import { ExternalService } from 'src/app/core/Shared/external.service';
import { SubcategoriesService } from 'src/app/core/Subcategories/subcategories.service';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { Atleta } from 'src/app/shared/models/athlete';
import { Evento } from 'src/app/shared/models/events';
import { MedicalRecord } from 'src/app/shared/models/medicalRecord';
import { Regulation } from 'src/app/shared/models/regulation';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css'],
})
export class EventRegisterComponent implements OnInit {
  eventId: number;
  cpfAthlete: string;
  athleteId: string;
  event: Evento;
  atleta: Atleta;
  regulation: Regulation;
  medicalRecords: MedicalRecord;
  categorySelected = false;
  accepted = false;
  token: string;
  categories = new FormControl('');
  categorieList: string[] = [];
  subCategorieList: [{ id: string; name: string; aviso: string }] = [
    { id: '', name: '', aviso: '' },
  ];

  constructor(
    private securityService: SecurityService,
    private eventService: EventsService,
    private athleteService: AthletesService,
    private subCategoryService: SubcategoriesService,
    private regulationService: RegulationService,
    private medicalService: MedicalRecordsService,
    private externalServices: ExternalService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private navBar: NavbarComponent
  ) {}

  eventControl = this.formBuilder.group({
    categoria: new FormControl('', Validators.required),
    subCategoria: new FormControl('', Validators.required),
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

  medicalControl = this.formBuilder.group({
    plano: new FormControl(false, Validators.required),
    planoEmpresa: new FormControl(''),
    planoTipo: new FormControl(''),
    pressaoAlta: new FormControl(false, Validators.required),
    desmaio: new FormControl(false, Validators.required),
    cardiaco: new FormControl(false, Validators.required),
    diabetes: new FormControl(false, Validators.required),
    asma: new FormControl(false, Validators.required),
    alergia: new FormControl(false, Validators.required),
    alergiaQual: new FormControl(''),
    cirurgia: new FormControl(false, Validators.required),
    cirurgiaQual: new FormControl(''),
    medicacao: new FormControl(false, Validators.required),
    medicacaoQual: new FormControl(''),
    medicacaoTempo: new FormControl(''),
    malestar: new FormControl(false, Validators.required),
    malestarQual: new FormControl(''),
    acompanhamento: new FormControl(false, Validators.required),
    acompanhamentoQual: new FormControl(''),
    outros: new FormControl(''),
  });

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    this.eventId = this.activatedRoute.snapshot.params['idEvent'];

    this.token = this.securityService.getToken();

    if (this.token != '') {
      var userInfo = this.securityService.getDecodedAccessToken(this.token);
    }

    if (userInfo != null) {
      this.navBar.checkLogIn();
      this.athleteId = userInfo.ID;
      this.cpfAthlete = userInfo.cpf;
      this.findAthlete();
      this.findMedicalRecords();
    }

    this.loadEvent();
    this.loadRegulation();
  }

  updateAthlete(): void {
    const athleteUpdated: Atleta = {
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

  loadSubcategory() {
    let category = Number(this.eventControl.get('categoria')?.value!);
    let sexo = this.athleteControl.get('sexo')?.value!;
    let nascimento = this.athleteControl.get('nascimento')?.value?.toString();
    let dtNascimento = new Date().getFullYear();

    if (nascimento != null && nascimento != '') {
      dtNascimento = new Date(nascimento).getFullYear();
    }

    let idade = moment().diff(nascimento, 'years');

    this.subCategoryService
      .getSubcategories(this.event.id, category, idade, Number(sexo))
      .subscribe((subCategories) => {
        this.subCategorieList = [{ id: '', name: '', aviso: '' }];

        subCategories.forEach((item) => {
          this.subCategorieList.push({
            id: item.id.toString(),
            name: item.descSubcategoria,
            aviso: item.aviso,
          });
        });

        this.subCategorieList.splice(0, 1);
      });
  }

  loadAdress(cep: string) {
    cep = cep.replace('-', '');

    if (cep.length < 8) return;

    this.externalServices.consultarEndereçoPorCEP(cep).subscribe((adress) => {
      this.athleteControl.get('endereco')?.setValue(adress.logradouro);
      this.athleteControl.get('cidade')?.setValue(adress.localidade);
      this.athleteControl.get('uf')?.setValue(adress.uf);
    });
  }

  formatNascimento() {
    return this.athleteControl.get('nascimento')!.value;
  }

  private loadEvent() {
    this.eventService.ConsultarEventoPeloId(this.eventId).subscribe((event) => {
      this.event = event;

      const categories = this.event.categoria.split(';');

      categories.forEach((item) => {
        this.categorieList.push(item);
      });
    });
  }

  private loadRegulation() {
    this.regulationService
      .getRegulationById(this.eventId)
      .subscribe((regulation) => {
        this.regulation = regulation;
      });
  }

  private findAthlete() {
    this.athleteService.consultarAtletaPorCPF(this.cpfAthlete).subscribe(
      (athlete) => {
        this.atleta = athlete;

        if (this.atleta != null) {
          this.loadAthlete();
        }
      },
      (error) => {
        if (error.status == 401) {
          this.securityService.removeToken();
          localStorage.setItem('eventId', this.eventId.toString());
          localStorage.setItem('cpf', this.cpfAthlete);
          this.dialog.open(LoginComponent);
        }
      }
    );
  }

  private loadAthlete() {
    for (const key in this.atleta) {
      if (this.athleteControl.get(key)) {
        this.athleteControl.get(key)?.setValue(this.atleta[key]);
      }
    }
  }

  private findMedicalRecords() {
    this.medicalService.getMedicalRecordsByAthleteId(this.athleteId).subscribe(
      (medicalRecords) => {
        this.medicalRecords = medicalRecords;

        if (this.medicalRecords != null) {
          this.loadMedical();
        }
      },
      (error) => {
        if (error.status == 401) {
          this.securityService.removeToken();
          localStorage.setItem('eventId', this.eventId.toString());
          localStorage.setItem('cpf', this.cpfAthlete);
          this.dialog.open(LoginComponent);
        }
      }
    );
  }

  private loadMedical() {
    for (const key in this.medicalRecords) {
      if (this.medicalControl.get(key)) {
        this.medicalControl.get(key)?.setValue(this.medicalRecords[key]);
      }
    }
    this.setValidators();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  confirmRegulation() {
    if (this.accepted) this.accepted = false;
    else this.accepted = true;
  }

  setValidators() {
    if (this.medicalControl.get('plano')!.value! == true) {
      this.medicalControl
        .get('planoEmpresa')!
        .setValidators(Validators.required);
      this.medicalControl.get('planoTipo')!.setValidators(Validators.required);
    } else {
      this.medicalControl.get('planoEmpresa')!.clearValidators();
      this.medicalControl.get('planoTipo')!.clearValidators();
    }

    if (this.medicalControl.get('cirurgia')?.value == true) {
      this.medicalControl
        .get('cirurgiaQual')!
        .setValidators(Validators.required);
    } else {
      this.medicalControl.get('cirurgiaQual')!.clearValidators();
    }

    if (this.medicalControl.get('medicacao')?.value == true) {
      this.medicalControl
        .get('medicacaoQual')!
        .setValidators(Validators.required);
      this.medicalControl
        .get('medicacaoTempo')!
        .setValidators(Validators.required);
    } else {
      this.medicalControl.get('medicacaoQual')!.clearValidators();
      this.medicalControl.get('medicacaoTempo')!.clearValidators();
    }

    if (this.medicalControl.get('malestar')?.value == true) {
      this.medicalControl
        .get('malestarQual')!
        .setValidators(Validators.required);
    } else {
      this.medicalControl.get('malestarQual')!.clearValidators();
    }

    if (this.medicalControl.get('acompanhamento')?.value == true) {
      this.medicalControl
        .get('acompanhamentoQual')!
        .setValidators(Validators.required);
    } else {
      this.medicalControl.get('acompanhamentoQual')!.clearValidators();
    }

    if (this.medicalControl.get('alergia')?.value == true) {
      this.medicalControl
        .get('alergiaQual')!
        .setValidators(Validators.required);
    } else {
      this.medicalControl.get('alergiaQual')!.clearValidators();
    }

    this.medicalControl.get('planoEmpresa')!.updateValueAndValidity();
    this.medicalControl.get('planoTipo')!.updateValueAndValidity();
    this.medicalControl.get('cirurgiaQual')!.updateValueAndValidity();
    this.medicalControl.get('medicacaoQual')!.updateValueAndValidity();
    this.medicalControl.get('medicacaoTempo')!.updateValueAndValidity();
    this.medicalControl.get('malestarQual')!.updateValueAndValidity();
    this.medicalControl.get('acompanhamentoQual')!.updateValueAndValidity();
    this.medicalControl.get('alergiaQual')!.updateValueAndValidity();
  }
}
