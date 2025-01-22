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
import { bigram_danish } from '../mixins/bigram_da.js'
import { unigram_danish } from '../mixins/unigram_da.js'
import { bigram_english } from '../mixins/bigram_en.js'
import { unigram_english } from '../mixins/unigram_en.js'
import { bigram_french } from '../mixins/bigram_fr.js'
import { unigram_french } from '../mixins/unigram_fr.js'
import { bigram_german } from '../mixins/bigram_ge.js'
import { unigram_german } from '../mixins/unigram_ge.js'
import { bigram_swedish } from '../mixins/bigram_sw.js'
import { unigram_swedish } from '../mixins/unigram_sw.js'

export default {
  name: 'InputSentence',
  mixins: [
    unigram_danish, unigram_english, unigram_french, unigram_german, unigram_swedish,
    bigram_danish, bigram_english, bigram_french, bigram_german, bigram_swedish
  ],
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
      this.p_da = nlp.probability(this.sentence, 3199010.0, this.bigram_danish.bigram)
      this.p_en = nlp.probability(this.sentence, 3380488.0, this.bigram_english.bigram)
      this.p_fr = nlp.probability(this.sentence, 3404521.0, this.bigram_french.bigram)
      this.p_ge = nlp.probability(this.sentence, 3214994.0, this.bigram_german.bigram)
      this.p_sw = nlp.probability(this.sentence, 2506282.0, this.bigram_swedish.bigram)
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