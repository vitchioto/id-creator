import { reactive } from 'vue';

type State = {
  design: 2022|2024;
  canvas?: HTMLCanvasElement,
  surname: string;
  name: string;
  issuer: string;
  birthDate: string;
  nationality: string;
  idNumber: string;
  sex: string;
  birthNumber: string;
  issueDate: string;
  expirationDate: string;
  addressLine1: string;
  addressLine2: string;
  birthSurname: string;
  birthPlace: string;
  specialEntries: string;
};

export const state: State = reactive({
  design: 2024,
  canvas: undefined,
  surname: '',
  name: '',
  issuer: 'Bratislava',
  birthDate: '',
  nationality: 'SVK',
  idNumber: '',
  sex: '',
  birthNumber: '',
  issueDate: '',
  expirationDate: '',
  addressLine1: 'Bratislava',
  addressLine2: 'Tomášikova 48',
  birthSurname: '',
  birthPlace: 'Bratislava',
  specialEntries: ''
})