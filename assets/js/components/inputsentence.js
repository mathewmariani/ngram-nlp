Vue.component('input-sentence', {
	mixins: [
		unigram_danish, unigram_english, unigram_french, unigram_german, unigram_swedish,
		bigram_danish, bigram_english, bigram_french, bigram_german, bigram_swedish
	],
	data: function() {
		return {
			sentence: "",

			// probabilities
			p_da: 1.0,
			p_en: 1.0,
			p_fr: 1.0,
			p_ge: 1.0,
			p_sw: 1.0,
		}
	},
	methods: {
		clear: function () {
			this.sentence = ""
			p_da = 1.0
			p_en = 1.0
			p_fr = 1.0
			p_ge = 1.0
			p_sw = 1.0
		},
		predict: function () {
			const ngrams = nlp.ngram(2, nlp.sanitize(this.sentence))

			// calculate probabilities
			this.p_da = nlp.probability(ngrams, 3199010.0, this.bigram_danish.bigram)
			this.p_en = nlp.probability(ngrams, 3380488.0, this.bigram_english.bigram)
			this.p_fr = nlp.probability(ngrams, 3404521.0, this.bigram_french.bigram)
			this.p_ge = nlp.probability(ngrams, 3214994.0, this.bigram_german.bigram)
			this.p_sw = nlp.probability(ngrams, 2506282.0, this.bigram_swedish.bigram)
		},
		isDanish: function() { return ((this.p_da > this.p_en) && (this.p_da > this.p_fr) && (this.p_da > this.p_ge) && (this.p_da > this.p_sw)) },
		isEnglish: function() { return ((this.p_en > this.p_da) && (this.p_en > this.p_fr) && (this.p_en > this.p_ge) && (this.p_en > this.p_sw)) },
		isFrench: function() { return ((this.p_fr > this.p_da) && (this.p_fr > this.p_en) && (this.p_fr > this.p_ge) && (this.p_fr > this.p_sw)) },
		isGerman: function() { return ((this.p_ge > this.p_da) && (this.p_ge > this.p_en) && (this.p_ge > this.p_fr) && (this.p_ge > this.p_sw)) },		isSwedish: function() { return ((this.p_sw > this.p_da) && (this.p_sw > this.p_en) && (this.p_sw > this.p_fr) && (this.p_sw > this.p_ge)) },
		getLanguage: function () {
			if (this.isDanish()) { return "Danish" }
			if (this.isEnglish()) { return "English" }
			if (this.isFrench()) { return "French" }
			if (this.isGerman()) { return "German" }
			if (this.isSwedish()) { return "Swedish" }
			return "..."
		}
	},
	template: `
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
				>
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
	`
})