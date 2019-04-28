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
			p_sw: 1.0
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
				this.p_da = 1.0
				const d = 0.05
				const s = d * (1.0 / 2669720.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_da += Math.log(((1.0 - d) * this.danish.unigram[char] + s))
				}
			}
			{	// english
				this.p_en = 1.0
				const d = 0.05
				const s = d * (1.0 / 938871.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_en += Math.log(((1.0 - d) * this.english.unigram[char] + s))
				}
			}
			{	// french
				this.p_fr = 1.0
				const d = 0.05
				const s = d * (1.0 / 2834055.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_fr += Math.log(((1.0 - d) * this.french.unigram[char] + s))
				}
			}
			{	// german
				this.p_ge = 1.0
				const d = 0.05
				const s = d * (1.0 / 2759238.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_ge += Math.log(((1.0 - d) * this.german.unigram[char] + s))
				}
			}
			{	// swedish
				this.p_sw = 1.0
				const d = 0.05
				const s = d * (1.0 / 2102523.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_sw += Math.log(((1.0 - d) * this.swedish.unigram[char] + s))
				}
			}
		},

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
			<ul class="list-group list-group-flush" v-show="(p_en !== p_fr)">
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

			<div class="card-body" v-show="((p_da > p_en) && (p_da > p_fr) && (p_da > p_ge) && (p_da > p_sw))">
				<p class="lead">This sentence is <b>Danish</b></p>
			</div>
			<div class="card-body" v-show="((p_en > p_da) && (p_en > p_fr) && (p_en > p_ge) && (p_en > p_sw))">
				<p class="lead">This sentence is <b>English</b></p>
			</div>
			<div class="card-body" v-show="((p_fr > p_da) && (p_fr > p_en) && (p_fr > p_ge) && (p_fr > p_sw))">
				<p class="lead">This sentence is <b>French</b></p>
			</div>
			<div class="card-body" v-show="((p_ge > p_da) && (p_ge > p_en) && (p_ge > p_fr) && (p_ge > p_sw))">
				<p class="lead">This sentence is <b>German</b></p>
			</div>
			<div class="card-body" v-show="((p_sw > p_da) && (p_sw > p_en) && (p_sw > p_fr) && (p_sw > p_ge))">
				<p class="lead">This sentence is <b>German</b></p>
			</div>

		</div>
	`
});