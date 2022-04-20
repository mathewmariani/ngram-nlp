Vue.component('frequency', {
	props: {
		language: Object
	},
	template: `
		<div class="card-text">
			<h5 class="card-title">
				{{ language.name }}
				<small class="text-muted">Unigram Model</small>
			</h5>
			<div class="table-responsive">
				<table class="table table-borderless table-sm">		
					<caption>Character frequency in {{ language.name }} </caption>
					<thead>
						<tr>
							<th>Letter</th>
							<th>Frequency</th>
							<th>Frequency</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value, index) in language.unigram" v-bind:key="index">
							<td>{{ index.toUpperCase() }}</td>
							<td class="text-muted">{{ value | exponential }}</td>
							<td>
								<div class="progress">
									<div
										class="progress-bar"
										role="progressbar"
										aria-valuemin="0"
										aria-valuemax="100"
										v-bind:style="{ width: (value * 100) + '%' }"
									></div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<details>
				<summary>Details</summary>
				D. Goldhahn, T. Eckart & U. Quasthoff: Building Large Monolingual Dictionaries at the Leipzig Corpora Collection: From 100 to 200 Languages.
				</br>
				In: <i>Proceedings of the 8th International Language Ressources and Evaluation (LREC'12), 2012</i>
			</details>
		</div>
	`
})