Vue.component('language-model', {
	props: {
		language: Object
	},
	template: `
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">
					{{ language.name }}
					<small class="text-muted">Unigram Model</small>
				</h5>

				<div class="table-responsive">
					<table class="table table-borderless table-sm">		
						<thead>
							<tr>
								<th>Letter</th>
								<th>Frequency</th>
								<th>Frequency</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(value, index) in language.unigram" v-bind:key="index">
								<td>{{ index }}</td>
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
			</div>
		</div>
	`
})