import jsonData from '../data/unigram_german.json'

export const unigram_german = {
	data() {
		return {
			german: {
				name: "German",
				unigram: jsonData,
			}
		}
	}
}