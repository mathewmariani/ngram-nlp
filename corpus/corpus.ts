import * as fs from 'fs';

// Define valid characters as a string
const validChars = "abcdefghijklmnopqrstuvwxyz ".split('');

// Function to find intersection of two lists
function intersection(lst1: string[], lst2: string[]): string[] {
    const temp = new Set(lst2);
    return lst1.filter(value => temp.has(value));
}

// Function to find n-grams (bigrams, etc.) in a string
function findNgrams(str: string, n: number): [string, string][] {
    const inputList = intersection(str.toLowerCase().split(''), validChars);
    const result: [string, string][] = [];
    for (let i = 0; i < inputList.length - n + 1; i++) {
        result.push(inputList.slice(i, i + n) as [string, string]);
    }
    return result;
}

// Function to calculate unigrams
function unigram(language: string, file: string): Record<string, number> {
    const text = fs.readFileSync(file, 'utf-8').toLowerCase();
    const occurrence = new Map<string, number>();
    const filteredText = intersection(text.split(''), validChars);

    filteredText.forEach((char) => {
        occurrence.set(char, (occurrence.get(char) || 0) + 1);
    });

    const count = filteredText.length;
    const probabilities: Record<string, number> = {};

    validChars.forEach((char) => {
        const prob = (occurrence.get(char) || 0) / count;
        probabilities[char] = parseFloat(prob.toExponential(6));
    });

    console.log("unigram", language, file, count);
    return probabilities;
}


function bigram(language: string, file: string): Record<string, number> {
    const text = fs.readFileSync(file, 'utf-8').toLowerCase();
    const occurrence = new Map<string, number>();
    const bigrams = findNgrams(text, 2);

    bigrams.forEach(([char1, char2]) => {
        const key = char1 + char2;
        occurrence.set(key, (occurrence.get(key) || 0) + 1);
    });

    const count = bigrams.length;
    const probabilities: Record<string, number> = {};

    validChars.forEach(char1 => {
        validChars.forEach(char2 => {
            const key = char1 + char2;
            const prob = (occurrence.get(key) || 0) / count;
            probabilities[key] = parseFloat(prob.toExponential(6));
        });
    });

    console.log("bigram", language, file, count);
    return probabilities; // Return the JSON object
}

// Corpus of languages and corresponding files
const corpus: { [key: string]: string } = {
    "danish": "corpus/dan_news_2008_30K-sentences.txt",
    "english": "corpus/eng_news_2016_30K-sentences.txt",
    "french": "corpus/fra_news_2010_30K-sentences.txt",
    "german": "corpus/deu_news_2015_30K-sentences.txt",
    "swedish": "corpus/swe_news_2007_30K-sentences.txt",
};

function saveJsonToFile(filename: string, jsonData: Record<string, number>) {
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2), 'utf-8');
}

// Loop over each language and process bigrams (unigram can be called similarly)
for (const language in corpus) {
    saveJsonToFile(`website/assets/unigram_${language}.json`, unigram(language, corpus[language]));
    saveJsonToFile(`website/assets/bigram_${language}.json`, bigram(language, corpus[language]));
}