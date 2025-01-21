<script setup>
import Frequency from './components/frequency.vue'
import InputSentence from './components/inputsentence.vue'
import LanguageModel from './components/languagemodel.vue'
</script>

<template>
  <main class="py-md-3" role="main">
    <!-- header -->
    <h1 class="display-4">
      Natural Language Processing
    </h1>
    <p class="lead">
      Automatic Language Identification using <a href="https://en.wikipedia.org/wiki/N-gram">n-gram</a> based models.
    </p>

    <!-- alert -->
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <h5 class="alert-heading">
        <i class="fas fa-exclamation-triangle"></i> Under Development!
      </h5>
      <p>
        In its current version the n-gram models are bigrams based directly on <a href="https://en.wikipedia.org/wiki/ASCII" class="alert-link">ASCII</a> characters; all invalid characters are ignored.				
      </p>
      <p>
        n-gram models more than (n=1) are better as they carry more information about the context. I am using bigrams (n=2) which carry less context giving less accurate results.
      </p>
      <hr>
      <p class="mb-0">
        The training <a href="https://en.wikipedia.org/wiki/Text_corpus" class="alert-link">corpus</a> used was relatively small.
        </br>
        In this case I used 30k sentences or about 4 megabytes of text for each language (Danish, English, French, German, Swedish).
      </p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <!-- language -->
    <div class="row">
      <div class="col">	
        <input-sentence
        ></input-sentence>
      </div>
      <div class="col">	
        <language-model
          v-bind:language="danish"
        ></language-model>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
