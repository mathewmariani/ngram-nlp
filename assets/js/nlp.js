const nlp = {
    sanitize: (str) => {
        return str.toLowerCase().replace(/[^a-z ]/ig, '');
    },

    ngram: (n, text) => {
        let ngrams = [];
        for (let i = 0; i < text.length - n; ++i) {
            const gram = text.substring(i, i + n);
            const next = text.charAt(i + n);
            if (!ngrams.hasOwnProperty(gram)) {
                ngrams[gram] = 0;
            }
            ngrams[gram] += 1;
        }
        return ngrams;
    },

    mathterm: (d, f, s) => {
        return Math.log(((1.0 - d) * f + s));
    },

    probability: (ngrams, count, data) => {
        let p = 1.0;
        const d = 0.05;
        const s = d * (1.0 / count);
        for (let k in ngrams) {
            const f = data[k] || 0;
            p += nlp.mathterm(d, f, s);
        }
        return p;
    },
};