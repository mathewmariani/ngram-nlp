import jsonData from '../data/unigram_danish.json'

export const unigram_danish = {
	data() {
		return {
			danish: {
				name: "Danish",
				unigram: jsonData,
			}
		}
	}
}