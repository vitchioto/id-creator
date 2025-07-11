<template>
  <form class="py-4">
    <div class="radio-buttons">
        <div class="label">Pohlavie dieťaťa</div>
        <div class="control">
          <label class="radio mr-2">
            <input type="radio" name="sex" value="M" v-model="state.sex" />
            Chlapec
          </label>
          <label class="radio">
            <input type="radio" name="sex" value="F" v-model="state.sex" />
            Dievča
          </label>
        </div>
    </div>
    <div class="generation-section">
      <label class="label" for="age">
      Vek
    </label>
    <input id="age" class="input" placeholder="" v-model="age">
    <button class="button" :disabled="!state.sex" @click.prevent="setBirthDetails()">Generovať</button>
    </div>
    <label class="label" for="name">
      Meno
    </label>
    <input id="name" class="input" placeholder="Jožko" v-model="state.name">
    <label class="label" for="surname">
      Priezvisko
    </label>
    <input id="surname" class="input" placeholder="Mrkvička" v-model="state.surname">
    <label class="label" for="year">
      Ročník narodenia
    </label>
    <input id="year" class="input" placeholder="2000" v-model="state.year">
    <label class="label" for="birthDate">
      Dátum narodenia
    </label>
    <input id="birthDate" class="input" placeholder="01.01.2000" v-model="state.birthDate">
    <label class="label" for="birthNumber">
      Rodné číslo
    </label>
    <input id="birthNumber" class="input" placeholder="111111/1111" v-model="state.birthNumber">
    <label class="label" for="birthCity">
      Miesto narodenia
    </label>
    <input id="birthCity" class="input" placeholder="Bratislava" v-model="state.birthCity">
    <label class="label" for="fatherDetails">
      Údaje otca
    </label>
    <textarea id="fatherDetails" class="textarea" rows="4" placeholder="Jozef Mrkvička" v-model="state.fatherDetails"></textarea>
    <label class="label" for="motherDetails">
      Údaje matky
    </label>
    <textarea id="motherDetails" class="textarea" rows="4" placeholder="Jozefína Mrkvičková" v-model="state.motherDetails"></textarea>
    <label class="label" for="fatherBirthNumber">
      RČ otca
    </label>
    <input id="fatherBirthNumber" class="input" placeholder="111111/1111" v-model="state.fatherBirthNumber">
    <label class="label" for="motherBirthNumber">
      RČ matky
    </label>
    <input id="motherBirthNumber" class="input" placeholder="111111/1111" v-model="state.motherBirthNumber">
    <label class="label" for="nameOfAdministrator">
      Matrikár
    </label>
    <input id="nameOfAdministrator" class="input" placeholder="Ján Novák" v-model="state.nameOfAdministrator">
  </form>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { state } from '../../storeBC.ts';
import { DEFAULT_MALE_NAME, DEFAULT_MALE_SURNAME, DEFAULT_FEMALE_NAME, DEFAULT_FEMALE_SURNAME, generateBirthDetails } from '../../utility.ts';

const age = ref();

watch(
  () => state.sex,
  (newValue) => {
    if (newValue === 'M'  && (!state.name || state.name === DEFAULT_FEMALE_NAME)) {
      state.name = DEFAULT_MALE_NAME;
    } else if (newValue === 'F'  && (!state.name || state.name === DEFAULT_MALE_NAME)) {
      state.name = DEFAULT_FEMALE_NAME;
    }
    
    if (newValue === 'M'  && (!state.surname || state.surname === DEFAULT_FEMALE_SURNAME)) {
      state.surname = DEFAULT_MALE_SURNAME;
    } else if (newValue === 'F'  && (!state.surname || state.surname === DEFAULT_MALE_SURNAME)) {
      state.surname = DEFAULT_FEMALE_SURNAME;
    }
},
{ immediate: true }
);

const setBirthDetails = () => {
  const { birthDate, birthNumber, year } = generateBirthDetails(state.sex, age.value);

  state.birthDate = birthDate;
  state.year = year;
  state.birthNumber = birthNumber;
}
</script>

<style scoped>
form {
  align-items: center;
  display: grid;
  gap: 10px;
  text-align: left;
}

.label {
  margin-bottom: 0 !important;
}

.generation-section {
  align-items: center;
  display: flex;
  gap: 10px;
  grid-column: span 2;
}

.radio-buttons {
  display: flex;
  gap: 40px;
  grid-column: span 2;
}

.custom-column {
  align-items: center;
  display: flex;
  gap: 10px;
}

@media screen and (min-width: 768px) {
  form {
    grid-template-columns: repeat(2, max-content 1fr);
  }
}
</style>