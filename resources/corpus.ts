import * as fs from 'fs';
import * as path from 'path';

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
function unigram(language: string, file: string) {
    const text = fs.readFileSync(file, 'utf-8').toLowerCase();
    const occurrence = new Map<string, number>();
    const filteredText = intersection(text.split(''), validChars);

    filteredText.forEach(char => {
        occurrence.set(char, (occurrence.get(char) || 0) + 1);
    });

    const count = filteredText.length;
    const filename = `unigram_${language}.txt`;

    const dump = fs.createWriteStream(filename);
    validChars.forEach(char => {
        const prob = (occurrence.get(char) || 0) / count;
        dump.write(`'${char}': ${prob.toExponential(6)},\n`);
    });

    dump.end();
    console.log("unigram", language, file, count);
}

// Function to calculate bigrams
function bigram(language: string, file: string) {
    const text = fs.readFileSync(file, 'utf-8').toLowerCase();
    const occurrence = new Map<string, number>();
    const bigrams = findNgrams(text, 2);

    bigrams.forEach(([char1, char2]) => {
        const key = char1 + char2;
        occurrence.set(key, (occurrence.get(key) || 0) + 1);
    });

    const count = bigrams.length;
    const filename = `bigram_${language}.txt`;

    const dump = fs.createWriteStream(filename);
    validChars.forEach(char1 => {
        validChars.forEach(char2 => {
            const key = char1 + char2;
            const prob = (occurrence.get(key) || 0) / count;
            dump.write(`'${key}': ${prob.toExponential(6)},\n`);
        });
    });

    dump.end();
    console.log("bigram", language, file, count);
}

// Corpus of languages and corresponding files
const corpus: { [key: string]: string } = {
    "danish": "../data/dan_news_2008_30K-sentences.txt",
    "english": "../data/eng_news_2016_30K-sentences.txt",
    "french": "../data/fra_news_2010_30K-sentences.txt",
    "german": "../data/deu_news_2015_30K-sentences.txt",
    "swedish": "../data/swe_news_2007_30K-sentences.txt"
};

// Loop over each language and process bigrams (unigram can be called similarly)
for (const language in corpus) {
    unigram(language, corpus[language]);
    bigram(language, corpus[language]);
}