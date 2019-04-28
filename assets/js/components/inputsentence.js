Vue.component('input-sentence', {
	mixins: [danish, english, french, german, swedish],
	data: function() {
		return {
			validchars: "abcdefghijklmnopqrstuvwxyz",
			sentence: "",
			p_da: 1.0,
			p_en: 1.0,
			p_fr: 1.0,
			p_ge: 1.0,
			p_sw: 1.0,
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
			return str.toLowerCase().replace(/[^a-z]/ig, '')
		},
		updateUnigram: function () {
			{	// danish
				if (this.languages.includes("Danish")) {
					this.p_da = 1.0
					const d = 0.05
					const s = d * (1.0 / 2669720.0)
				
					const sentence = this.sanitize(this.sentence)
					for (const char of sentence) {
						this.p_da += Math.log(((1.0 - d) * this.danish.unigram[char] + s))
					}
				}
			}
			{	// english
				if (this.languages.includes("English")) {
					this.p_en = 1.0
					const d = 0.05
					const s = d * (1.0 / 938871.0)
					
					const sentence = this.sanitize(this.sentence)
					for (const char of sentence) {
						this.p_en += Math.log(((1.0 - d) * this.english.unigram[char] + s))
					}
				}
			}
			{	// french
				if (this.languages.includes("French")) {
					this.p_fr = 1.0
					const d = 0.05
					const s = d * (1.0 / 2834055.0)
					
					const sentence = this.sanitize(this.sentence)
					for (const char of sentence) {
						this.p_fr += Math.log(((1.0 - d) * this.french.unigram[char] + s))
					}
				}
			}
			{	// german
				if (this.languages.includes("German")) {
					this.p_ge = 1.0
					const d = 0.05
					const s = d * (1.0 / 2759238.0)
					
					const sentence = this.sanitize(this.sentence)
					for (const char of sentence) {
						this.p_ge += Math.log(((1.0 - d) * this.german.unigram[char] + s))
					}
				}
			}
			{	// swedish
				if (this.languages.includes("Swedish")) {
					this.p_sw = 1.0
					const d = 0.05
					const s = d * (1.0 / 2102523.0)
					
					const sentence = this.sanitize(this.sentence)
					for (const char of sentence) {
						this.p_sw += Math.log(((1.0 - d) * this.swedish.unigram[char] + s))
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
					v-on:input="updateUnigram()"
				>
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					Log Probability Danish: {{ p_da }}
				</li>
				<li class="list-group-item">
					Log Probability English: {{ p_en }}
				</li>
				<li class="list-group-item">
					Log Probability French: {{ p_fr }}
				</li>
				<li class="list-group-item">
					Log Probability German: {{ p_ge }}
				</li>
				<li class="list-group-item">
					Log Probability Swedish: {{ p_sw }}
				</li>
			</ul>

			<div class="card-body">
				<p class="lead">This sentence is {{ getLanguage() }}</p>
			</div>
		</div>
	`
});