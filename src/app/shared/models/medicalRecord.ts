export interface MedicalRecord {
  [key: string]: any;
  idAthleta: string;
  plano: boolean;
  planoEmpresa: string;
  planoTipo: string;
  pressaoalta: boolean;
  desmaio: boolean;
  cardiaco: boolean;
  diabetes: boolean;
  asma: boolean;
  alergia: boolean;
  alergiaQual: string;
  cirurgia: boolean;
  cirurgiaQual: string;
  medicacao: boolean;
  medicacaoQual: string;
  medicacaoTempo: string;
  malestar: boolean;
  malestarQual: string;
  acompanhamento: boolean;
  acompanhamentoQual: string;
  outros: string;
}
