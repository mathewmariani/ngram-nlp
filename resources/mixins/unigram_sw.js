import jsonData from '../data/unigram_swedish.json'

export const unigram_swedish = {
	data() {
		return {
			swedish: {
				name: "Swedish",
				unigram: jsonData,
			}
		}
	}
}