<template>
  <form class="py-4">
    <div class="radio-buttons">
      <div class="custom-column">
        <div class="label">Pohlavie</div>
        <div class="control">
          <label class="radio mr-2">
            <input type="radio" name="sex" value="M" v-model="state.sex" />
            Muž
          </label>
          <label class="radio">
            <input type="radio" name="sex" value="F" v-model="state.sex" />
            Žena
          </label>
        </div>
      </div>
      <div class="custom-column">
        <div class="label">Dizajn</div>
        <div class="control">
          <label class="radio mr-2">
            <input type="radio" name="design" value="2022" v-model="state.design" />
            2022
          </label>
          <label class="radio">
            <input type="radio" name="design" value="2024" v-model="state.design" />
            2024
          </label>
        </div>
      </div>
    </div>
    <div class="generation-section">
      <label class="label" for="age">
      Vek
    </label>
    <input id="age" class="input" placeholder="" v-model="age">
    <button class="button" :disabled="!state.sex" @click.prevent="generateBirthDetails()">Generovať rodné detaily</button>
    <button class="button" @click.prevent="generateID()">Generovať ID</button>
    </div>
    <label class="label" for="name">
      Meno
    </label>
    <input id="name" class="input" placeholder="Jožko" v-model="state.name">
    <label class="label" for="surname">
      Priezvisko
    </label>
    <input id="surname" class="input" placeholder="Mrkvička" v-model="state.surname">
    <label class="label" for="birthSurname">
      Rodné priezvisko
    </label>
    <input id="birthSurname" class="input" placeholder="Mrkvička" v-model="state.birthSurname">
    <label class="label" for="birthDate">
      Dátum narodenia
    </label>
    <input id="birthDate" class="input" placeholder="01.01.2000" v-model="state.birthDate">
    <label class="label" for="nationality">
      Občianstvo
    </label>
    <input id="nationality" class="input" placeholder="SVK" v-model="state.nationality">
    <label class="label" for="idNumber">
      Číslo preukazu
    </label>
    <input id="idNumber" class="input" placeholder="ID123456" v-model="state.idNumber">
    <label class="label" for="issuer">
      Vydal
    </label>
    <input id="issuer" class="input" placeholder="Bratislava" v-model="state.issuer">
    <label class="label" for="birthNumber">
      Rodné číslo
    </label>
    <input id="birthNumber" class="input" placeholder="111111/1111" v-model="state.birthNumber">
    <label class="label" for="issueDate">
      Dátum vydania
    </label>
    <input id="issueDate" class="input" placeholder="01.01.2025" v-model="state.issueDate">
    <label class="label" for="expirationDate">
      Dátum expirácie
    </label>
    <input id="expirationDate" class="input" placeholder="01.01.2030" v-model="state.expirationDate">
    <label class="label" for="addressLine1">
      Adresa riadok 1
    </label>
    <input id="addressLine1" class="input" placeholder="Bratislava-Ružinov" v-model="state.addressLine1">
    <label class="label" for="addressLine2">
      Adresa riadok 2
    </label>
    <input id="addressLine2" class="input" placeholder="Tomášikova 48" v-model="state.addressLine2">
    <label class="label" for="birthPlace">
      Rodné mesto
    </label>
    <input id="birthPlace" class="input" placeholder="Bratislava" v-model="state.birthPlace">
    <label class="label" for="specialEntries">
      Osobitné záznamy
    </label>
    <input id="specialEntries" class="input" placeholder="" v-model="state.specialEntries">
  </form>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { state } from '../store.ts';
import { DEFAULT_MALE_NAME, DEFAULT_MALE_SURNAME, DEFAULT_FEMALE_NAME, DEFAULT_FEMALE_SURNAME, formatDate, generateBirthNumber, generateIDNumber, generateRandomDate } from '../utility.ts';

const age = ref();

watch(
  () => state.surname,
  (newValue, prevValue) => {
  if (!state.birthSurname || state.birthSurname === prevValue) {
    state.birthSurname = newValue;
  }
});

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
});

const generateBirthDetails = () => {
  let startDate, endDate;

  if (age.value) {
    const start = new Date();
    const startDay = start.getDate();
    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();

    const end = new Date();
    end.setDate(end.getDate() - 1);
    const endDay = end.getDate();
    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    const startYearCalculated = startYear - age.value - 1;
    const endYearCalculated = endYear - age.value;

    startDate = new Date(`${startYearCalculated}-${startMonth}-${startDay}`);
    endDate = new Date(`${endYearCalculated}-${endMonth}-${endDay}`);
  } else {
    startDate = new Date('1970-12-31');
    endDate = new Date('1999-12-31');
  }

  const birthDate = generateRandomDate(startDate, endDate);

  state.birthDate = formatDate(birthDate);

  state.birthNumber = generateBirthNumber(birthDate, state.sex);
}

const generateID = () => {
  state.idNumber = generateIDNumber();
}

onMounted(() => {
  const date = new Date();
  state.issueDate = formatDate(date);

  date.setFullYear(date.getFullYear() + 10);
  state.expirationDate = formatDate(date);
});
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