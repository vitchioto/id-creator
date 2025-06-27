<template>
  <form class="py-4">
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
    <div class="label">Pohlavie</div>
    <div class="control">
      <label class="radio mr-2">
        <input type="radio" name="answer" value="M" v-model="state.sex" />
        Muž
      </label>
      <label class="radio">
        <input type="radio" name="answer" value="F" v-model="state.sex" />
        Žena
      </label>
    </div>
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
  </form>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { state } from '../store.ts';

watch(
  () => state.surname,
  (newValue, prevValue) => {
  if (!state.birthSurname || state.birthSurname === prevValue) {
    state.birthSurname = newValue;
  }
});
</script>

<style scoped>
form {
  align-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, max-content 1fr);
  text-align: left;
}

.label {
  margin-bottom: 0 !important;
}
</style>