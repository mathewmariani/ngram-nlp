Vue.component('input-sentence', {
	props: {
		unigram_en: Array,
		unigram_fr: Array,
		unigram_ge: Array,
	},
	data: function() {
		return {
			validchars: "abcdefghijklmnopqrstuvwxyz",
			sentence: "",
			p_en: 1.0,
			p_fr: 1.0,
			p_ge: 1.0
		}
	},
	methods: {
		clear: function () {
			this.sentence = ""
			p_en = 1.0
			p_fr = 1.0
			p_ge = 1.0
		},
		sanitize: function (str) {
			return str.toLowerCase().replace(/[^a-z]/ig, '')
		},
		updateUnigram: function () {
			{	// english
				this.p_en = 1.0
				const d = 0.05
				const s = d * (1.0 / 938871.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_en += Math.log(((1.0 - d) * this.unigram_en[char] + s))
				}
			}
			{	// french
				this.p_fr = 1.0
				const d = 0.05
				const s = d * (1.0 / 2834055.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_fr += Math.log(((1.0 - d) * this.unigram_fr[char] + s))
				}
			}
			{	// german
				this.p_ge = 1.0
				const d = 0.05
				const s = d * (1.0 / 2759238.0)
				
				const sentence = this.sanitize(this.sentence)
				for (const char of sentence) {
					this.p_ge += Math.log(((1.0 - d) * this.unigram_ge[char] + s))
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
					Log Probability English: {{ p_en }}
				</li>
				<li class="list-group-item">
					Log Probability French: {{ p_fr }}
				</li>
				<li class="list-group-item">
					Log Probability German: {{ p_ge }}
				</li>
			</ul>
			<div class="card-body" v-show="((p_en > p_fr) && (p_en > p_ge))">
				<p class="lead">This sentence is English</p>
			</div>
			<div class="card-body" v-show="((p_fr > p_en) && (p_fr > p_ge))">
				<p class="lead">This sentence is French</p>
			</div>
			<div class="card-body" v-show="((p_ge > p_fr) && (p_ge > p_en))">
				<p class="lead">This sentence is German</p>
			</div>

		</div>
	`
});