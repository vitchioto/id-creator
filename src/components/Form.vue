<template>
  <form>
    <label class="label" for="surname">
      Priezvisko
    </label>
    <input id="surname" class="input" placeholder="Mrkvička" v-model="state.surname">
    <label class="label" for="name">
      Meno
    </label>
    <input id="name" class="input" placeholder="Jožko" v-model="state.name">
    <label class="label" for="birthDate">
      Datum narodenia
    </label>
    <input id="birthDate" class="input" placeholder="Mrkvička" v-model="state.birthDate">
    <label class="label" for="nationality">
      Obcianstvo
    </label>
    <input id="nationality" class="input" placeholder="Mrkvička" v-model="state.nationality">
    <label class="label" for="idNumber">
      Cislo preukazu
    </label>
    <input id="idNumber" class="input" placeholder="Mrkvička" v-model="state.idNumber">
    <label class="label" for="issuer">
      Vydal
    </label>
    <input id="issuer" class="input" placeholder="Mrkvička" v-model="state.issuer">
    <label class="label" for="sex">
      Pohlavie
    </label>
    <input id="sex" class="input" placeholder="Mrkvička" v-model="state.sex">
    <label class="label" for="birthNumber">
      Rodne cislo
    </label>
    <input id="birthNumber" class="input" placeholder="Mrkvička" v-model="state.birthNumber">
    <label class="label" for="issueDate">
      Datum vydania
    </label>
    <input id="issueDate" class="input" placeholder="Mrkvička" v-model="state.issueDate">
    <label class="label" for="expirationDate">
      Datum expiracie
    </label>
    <input id="expirationDate" class="input" placeholder="Mrkvička" v-model="state.expirationDate">
    <label class="label" for="address">
      Adresa
    </label>
    <input id="address" class="input" placeholder="Mrkvička" v-model="state.address">
    <label class="label" for="birthSurname">
      Rodne priezvisko
    </label>
    <input id="birthSurname" class="input" placeholder="Mrkvička" v-model="state.birthSurname">
    <label class="label" for="birthPlace">
      Rodne mesto
    </label>
    <input id="birthPlace" class="input" placeholder="Mrkvička" v-model="state.birthPlace">
  </form>
</template>

<script setup lang="ts">
import { state } from '../store.ts';

</script>

<style scoped>
form {
  display: grid;
  gap: 10px;
  grid-template-columns: max-content 1fr;
  text-align: left;
}

</style>