import jsonData from '../data/bigram_danish.json'

export const bigram_danish = {
	data() {
		return {
			bigram_danish: {
				name: "Danish",
				bigram: jsonData,
			}
		}
	}
}