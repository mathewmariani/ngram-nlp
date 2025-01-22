import jsonData from '../data/bigram_french.json'

export const bigram_french = {
	data() {
		return {
			bigram_french: {
				name: "French",
				bigram: jsonData,
			}
		}
	}
}