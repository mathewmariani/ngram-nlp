new Vue({
	el: '#app',
	mixins: [
		danish, english, french, german, swedish,
		bigram_danish, bigram_english, bigram_french, bigram_german, bigram_swedish
	],
	created: function () {

	},
	data: {

	}
})