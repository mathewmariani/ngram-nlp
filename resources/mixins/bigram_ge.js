import jsonData from '../data/bigram_german.json'

export const bigram_german = {
	data() {
		return {
			bigram_german: {
				name: "German",
				bigram: jsonData,
			}
		}
	}
}