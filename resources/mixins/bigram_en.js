import jsonData from '../data/bigram_english.json'

export const bigram_english = {
	data() {
		return {
			bigram_english: {
				name: "English",
				bigram: jsonData,
			}
		}
	}
}