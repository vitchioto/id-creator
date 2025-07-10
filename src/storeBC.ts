import { reactive } from 'vue';

type State = {
  year?: number;
  birthDate?: string;
  birthNumber?: string;
  birthCity: string;
  name: string;
  surname: string;
  sex: string;
  fatherDetails: string;
  motherDetails: string;
  nameOfAdministrator: string;
};

export const state: State = reactive({
  birthCity: 'Bratislava',
  name: '',
  surname: '',
  sex: 'M',
  fatherDetails: `Jozef Mrkvička
rod. Mrkvička
01. január 1960
Bratislava, Slovenská republika
neuvedené`,
  motherDetails: `Jozefína Mrkvičková
rod. Mrkvička
01. január 1962
Bratislava, Slovenská republika
neuvedené`,
  nameOfAdministrator: 'Ján Novák',
})