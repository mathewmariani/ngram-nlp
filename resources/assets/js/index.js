new Vue({
	el: '#app',
	mixins: [
		unigram_danish, unigram_english, unigram_french, unigram_german, unigram_swedish,
		bigram_danish, bigram_english, bigram_french, bigram_german, bigram_swedish
	],
	created: function () {

	},
	data: {

	}
})