import { reactive } from 'vue';

type State = {
  year?: number;
  birthDate?: string;
  birthNumber?: string;
  birthCity: string;
  name: string;
  surname: string;
  sex: string;
  fatherBirthNumber?: string;
  fatherDetails: string;
  motherBirthNumber?: string;
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
Bratislava, Slovenská republika
neuvedené`,
  motherDetails: `Jozefína Mrkvičková
rod. Mrkvičková
Bratislava, Slovenská republika
neuvedené`,
  nameOfAdministrator: 'Mgr. Adriana Zamrijová',
})