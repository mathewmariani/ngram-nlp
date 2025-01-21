<script setup>
import InputSentence from './components/inputsentence.vue'
</script>

<template>
  <main class="d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;" role="main">
    <h1 class="display-4">
      Natural Language Processing
    </h1>
    <p class="lead">
      Automatic Language Identification using <a href="https://en.wikipedia.org/wiki/N-gram">n-gram</a> based models.
    </p>
    <div class="col-md-6 mt-4">
      <input-sentence></input-sentence>
    </div>
  </main>
</template>

<style scoped>
</style>
