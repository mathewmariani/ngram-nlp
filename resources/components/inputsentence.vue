<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Detect Language</h5>
      <input
        type="text"
        class="form-control"
        placeholder="Enter sentence to detect language"
        v-model="sentence"
        v-on:input="predict()"
      />
    </div>
    <ul class="list-group list-group-flush">
      <li
        v-for="(prob, lang) in probabilities"
        :key="lang"
        class="list-group-item"
      >
        Log Probability {{ languageNames[lang] }}: {{ prob.toFixed(4) }}
      </li>
    </ul>
    <div class="card-footer text-white bg-primary">
      <p class="lead">This sentence is <b>{{ getLanguage() }}</b></p>
    </div>
  </div>
</template>

<script>

import nlp  from "../nlp.js";

// import bigram data
import bigram_da from "../data/bigram_da.json";
import bigram_en from "../data/bigram_en.json";
import bigram_fr from "../data/bigram_fr.json";
import bigram_de from "../data/bigram_de.json";
import bigram_sv from "../data/bigram_sv.json";
import bigram_es from "../data/bigram_es.json";
import bigram_it from "../data/bigram_it.json";
import bigram_nl from "../data/bigram_nl.json";
import bigram_pt from "../data/bigram_pt.json";
import bigram_no from "../data/bigram_no.json";
import bigram_fi from "../data/bigram_fi.json";
import bigram_ro from "../data/bigram_ro.json";
import bigram_hu from "../data/bigram_hu.json";
import bigram_tr from "../data/bigram_tr.json";
import bigram_id from "../data/bigram_id.json";

export default {
  name: "InputSentence",
  data() {
    return {
      sentence: "",
      probabilities: {},
      languages: ["en", "es", "de", "fr", "it", "nl", "pt", "da", "sv", "no", "fi", "ro", "hu", "tr", "id"],
      bigramData: {
        da: bigram_da, en: bigram_en, fr: bigram_fr, de: bigram_de, sv: bigram_sv,
        es: bigram_es, it: bigram_it, nl: bigram_nl, pt: bigram_pt, no: bigram_no,
        fi: bigram_fi, ro: bigram_ro, hu: bigram_hu, tr: bigram_tr, id: bigram_id
      },
      languageNames: {
        en: "English 🇬🇧", es: "Spanish 🇪🇸", de: "German 🇩🇪", fr: "French 🇫🇷",
        it: "Italian 🇮🇹", nl: "Dutch 🇳🇱", pt: "Portuguese 🇵🇹", da: "Danish 🇩🇰",
        sv: "Swedish 🇸🇪", no: "Norwegian 🇳🇴", fi: "Finnish 🇫🇮", ro: "Romanian 🇷🇴",
        hu: "Hungarian 🇭🇺", tr: "Turkish 🇹🇷", id: "Indonesian 🇮🇩"
      }
    };
  },
  methods: {
    clear() {
      this.sentence = "";
      this.probabilities = {};
    },
    predict() {
      this.probabilities = {};
      this.languages.forEach(lang => {
        const bigram = this.bigramData[lang].probabilities;
        const total_bigrams = this.bigramData[lang].total_count;
        this.probabilities[lang] = nlp.probability(this.sentence, total_bigrams, bigram);
      });
    },
    getLanguage() {
      const bestLang = Object.entries(this.probabilities)
        .reduce((max, entry) => (entry[1] > max[1] ? entry : max), ["", -Infinity])[0];
      return bestLang ? this.languageNames[bestLang] : "🤔";
    }
  }
};
</script>