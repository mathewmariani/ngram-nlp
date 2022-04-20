Vue.component('language-model', {
	mixins: [danish, english, french, german, swedish],
	template: `
		<div class="card">
			<div class="card-body">
				
				<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
					<li class="nav-item">
						<a class="nav-link" id="pills-danish-tab" data-toggle="pill" href="#pills-danish" role="tab" aria-controls="pills-danish" aria-selected="false">Danish</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" id="pills-english-tab" data-toggle="pill" href="#pills-english" role="tab" aria-controls="pills-english" aria-selected="true">English</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="pills-french-tab" data-toggle="pill" href="#pills-french" role="tab" aria-controls="pills-french" aria-selected="false">French</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="pills-german-tab" data-toggle="pill" href="#pills-german" role="tab" aria-controls="pills-german" aria-selected="false">German</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="pills-swedish-tab" data-toggle="pill" href="#pills-swedish" role="tab" aria-controls="pills-swedish" aria-selected="false">Swedish</a>
					</li>
				</ul>

				<div class="tab-content" id="pills-tabContent">
					<div class="tab-pane" id="pills-danish" role="tabpanel" aria-labelledby="pills-danish-tab">
						<frequency
							v-bind:language="danish"
						></frequency>
					</div>
					<div class="tab-pane show active" id="pills-english" role="tabpanel" aria-labelledby="pills-english-tab">
						<frequency
							v-bind:language="english"
						></frequency>
					</div>
					<div class="tab-pane" id="pills-french" role="tabpanel" aria-labelledby="pills-french-tab">
						<frequency
							v-bind:language="french"
						></frequency>
					</div>
					<div class="tab-pane" id="pills-german" role="tabpanel" aria-labelledby="pills-german-tab">
						<frequency
							v-bind:language="german"
						></frequency>
					</div>
					<div class="tab-pane" id="pills-swedish" role="tabpanel" aria-labelledby="pills-swedish-tab">
						<frequency
							v-bind:language="swedish"
						></frequency>
					</div>
				</div>
			</div>
		</div>
	`
})