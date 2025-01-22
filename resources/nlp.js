const nlp = {
    sanitize: (str) => {
        return str.toLowerCase().replace(/[^a-z ]/ig, '')
    },

    laplaceSmoothing: (d, f, s) => {
        return Math.log((1.0 - d) * f + s)
    },

    probability: (text, count, frequencies) => {
        let p = 0.0
        const d = 0.05
        const s = d * (1.0 / count)
        const n = 2

        text = nlp.sanitize(text)
        for (let i = 0; i <= text.length - n; i++) {
            const ngram = text.slice(i, i + n)
            const f = frequencies[ngram] || 0
            p += nlp.laplaceSmoothing(d, f, s)
        }

        return p
    },
}

module.exports = nlp