<template>
  <div class="container is-full-width">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start is-justify-content-center">
            <RouterLink to="/" class="navbar-item">Generuj občiansky</RouterLink>
            <RouterLink to="/birth-certificate" class="navbar-item">Generuj rodný list</RouterLink>
        </div>
      </div>
    </nav>
    <main class="section">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.is-full-width {
  width: 100vw;
}
</style>
