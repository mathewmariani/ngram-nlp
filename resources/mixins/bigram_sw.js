import jsonData from '../data/bigram_swedish.json'

export const bigram_swedish = {
	data() {
		return {
			bigram_swedish: {
				name: "Swedish",
				bigram: jsonData,
			}
		}
	}
}