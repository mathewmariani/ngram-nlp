<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">
        Detect Language
      </h5>
      <input
        type="text"
        class="form-control"
        placeholder="Enter sentence to detect language"
        v-model="sentence"
        v-on:input="predict()"
      />
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        Log Probability Danish: {{ p_da.toFixed(4) }}
      </li>
      <li class="list-group-item">
        Log Probability English: {{ p_en.toFixed(4) }}
      </li>
      <li class="list-group-item">
        Log Probability French: {{ p_fr.toFixed(4) }}
      </li>
      <li class="list-group-item">
        Log Probability German: {{ p_ge.toFixed(4) }}
      </li>
      <li class="list-group-item">
        Log Probability Swedish: {{ p_sw.toFixed(4) }}
      </li>
    </ul>
    <div class="card-footer text-white bg-primary">
      <p class="lead">This sentence is <b>{{ getLanguage() }}</b></p>
    </div>
  </div>
</template>

<script>
import bigram_danish from '../data/bigram_da.json'
import unigram_danish from '../data/unigram_da.json'
import bigram_english from '../data/bigram_en.json'
import unigram_english from '../data/unigram_en.json'
import bigram_french from '../data/bigram_fr.json'
import unigram_french from '../data/unigram_fr.json'
import bigram_german from '../data/bigram_ge.json'
import unigram_german from '../data/unigram_ge.json'
import bigram_swedish from '../data/bigram_sw.json'
import unigram_swedish from '../data/unigram_sw.json'

export default {
  name: 'InputSentence',
  data() {
    return {
      sentence: "",
      p_da: 0.0,
      p_en: 0.0,
      p_fr: 0.0,
      p_ge: 0.0,
      p_sw: 0.0
    }
  },
  methods: {
    clear() {
      this.sentence = ""
      this.p_da = 0.0
      this.p_en = 0.0
      this.p_fr = 0.0
      this.p_ge = 0.0
      this.p_sw = 0.0
    },
    predict() {
      this.p_da = nlp.probability(this.sentence, 3199010.0, bigram_danish)
      this.p_en = nlp.probability(this.sentence, 3380488.0, bigram_english)
      this.p_fr = nlp.probability(this.sentence, 3404521.0, bigram_french)
      this.p_ge = nlp.probability(this.sentence, 3214994.0, bigram_german)
      this.p_sw = nlp.probability(this.sentence, 2506282.0, bigram_swedish)
    },
    isDanish() {
      return this.p_da > this.p_en && this.p_da > this.p_fr && this.p_da > this.p_ge && this.p_da > this.p_sw
    },
    isEnglish() {
      return this.p_en > this.p_da && this.p_en > this.p_fr && this.p_en > this.p_ge && this.p_en > this.p_sw
    },
    isFrench() {
      return this.p_fr > this.p_da && this.p_fr > this.p_en && this.p_fr > this.p_ge && this.p_fr > this.p_sw
    },
    isGerman() {
      return this.p_ge > this.p_da && this.p_ge > this.p_en && this.p_ge > this.p_fr && this.p_ge > this.p_sw
    },
    isSwedish() {
      return this.p_sw > this.p_da && this.p_sw > this.p_en && this.p_sw > this.p_fr && this.p_sw > this.p_ge
    },
    getLanguage() {
      if (this.isDanish()) return "Danish 🇩🇰"
      if (this.isEnglish()) return "English 🇬🇧"
      if (this.isFrench()) return "French 🇫🇷"
      if (this.isGerman()) return "German 🇩🇪"
      if (this.isSwedish()) return "Swedish 🇸🇪"
      return "🤔"
    }
  }
}
</script>