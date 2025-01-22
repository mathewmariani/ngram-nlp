import jsonData from '../data/unigram_english.json'

export const unigram_english = {
	data() {
		return {
			english: {
				name: "English",
				unigram: jsonData,
			}
		}
	}
}