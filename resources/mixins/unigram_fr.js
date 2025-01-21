import jsonData from '../data/unigram_french.json'

export const unigram_french = {
	data() {
		return {
			french: {
				name: "French",
				unigram: jsonData,
			}
		}
	}
}