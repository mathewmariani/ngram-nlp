Vue.component('input-sentence', {
	mixins: [
		danish, english, french, german, swedish,
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

			// languages
			languages: [
				"Danish",
				"English",
				"French",
				"German",
				"Swedish"
			]
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
		sanitize: function (str) {
			return str.toLowerCase().replace(/[^a-z ]/ig, '')
		},
		ngram: function(n, text) {
			let ngrams = []
			for (let i = 0; i < text.length - n; ++i) {
				const gram = text.substring(i, i + n)
				const next = text.charAt(i + n)
				if (!ngrams.hasOwnProperty(gram)) {
					ngrams[gram] = 0
				}
				ngrams[gram] += 1
			}
			return ngrams
		},
		predict: function () {
			{	// danish
				if (this.languages.includes("Danish")) {
					this.p_da = 1.0
					const d = 0.05
					const s = d * (1.0 / 3199010.0)
				
					const ngrams = this.ngram(2, this.sanitize(this.sentence))
					for (let k in ngrams) {
						const f = this.bigram_danish.bigram[k]
						this.p_da += Math.log(((1.0 - d) * f + s))
					}
				}
			}
			{	// english
				if (this.languages.includes("English")) {
					this.p_en = 1.0
					const d = 0.05
					const s = d * (1.0 / 3380488.0)

					const ngrams = this.ngram(2, this.sanitize(this.sentence))
					for (let k in ngrams) {
						const f = this.bigram_english.bigram[k]
						this.p_en += Math.log(((1.0 - d) * f + s))
					}
				}
			}
			{	// french
				if (this.languages.includes("French")) {
					this.p_fr = 1.0
					const d = 0.05
					const s = d * (1.0 / 3404521.0)
					
					const ngrams = this.ngram(2, this.sanitize(this.sentence))
					for (let k in ngrams) {
						const f = this.bigram_french.bigram[k]
						this.p_fr += Math.log(((1.0 - d) * f + s))
					}

				}
			}
			{	// german
				if (this.languages.includes("German")) {
					this.p_ge = 1.0
					const d = 0.05
					const s = d * (1.0 / 3214994.0)
					
					const ngrams = this.ngram(2, this.sanitize(this.sentence))
					for (let k in ngrams) {
						const f = this.bigram_german.bigram[k]
						this.p_ge += Math.log(((1.0 - d) * f + s))
					}
				}
			}
			{	// swedish
				if (this.languages.includes("Swedish")) {
					this.p_sw = 1.0
					const d = 0.05
					const s = d * (1.0 / 2506282.0)
					
					const ngrams = this.ngram(2, this.sanitize(this.sentence))
					for (let k in ngrams) {
						const f = this.bigram_swedish.bigram[k]
						this.p_sw += Math.log(((1.0 - d) * f + s))
					}
				}
			}
		},
		getLanguage: function () {
			if ((this.p_da > this.p_en) &&
				(this.p_da > this.p_fr) &&
				(this.p_da > this.p_ge) &&
				(this.p_da > this.p_sw)) {
				return "Danish"
			}
			if ((this.p_en > this.p_da) &&
				(this.p_en > this.p_fr) &&
				(this.p_en > this.p_ge) &&
				(this.p_en > this.p_sw)) {
				return "English"
			}
			if ((this.p_fr > this.p_da) &&
				(this.p_fr > this.p_en) &&
				(this.p_fr > this.p_ge) &&
				(this.p_fr > this.p_sw)) {
				return "French"
			}
			if ((this.p_ge > this.p_da) &&
				(this.p_ge > this.p_en) &&
				(this.p_ge > this.p_fr) &&
				(this.p_ge > this.p_sw)) {
				return "German"
			}
			if ((this.p_sw > this.p_da) &&
				(this.p_sw > this.p_en) &&
				(this.p_sw > this.p_fr) &&
				(this.p_sw > this.p_ge)) {
				return "Swedish"
			}
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