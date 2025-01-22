import json
from collections import Counter
import re

# Define valid characters as a list
valid_chars = list("abcdefghijklmnopqrstuvwxyz ")

# Function to find intersection of two lists
def intersection(lst1, lst2):
    temp = set(lst2)
    return [value for value in lst1 if value in temp]

# Function to find n-grams (bigrams, etc.) in a string
def find_ngrams(text, n):
    input_list = intersection(list(text.lower()), valid_chars)
    return [tuple(input_list[i:i + n]) for i in range(len(input_list) - n + 1)]

# Function to calculate unigrams
def unigram(language, file):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read().lower()
    
    filtered_text = intersection(list(text), valid_chars)
    occurrence = Counter(filtered_text)
    count = len(filtered_text)
    
    probabilities = {
        char: round((occurrence.get(char, 0) / count), 6)
        for char in valid_chars
    }

    print("unigram", language, file, count)
    return probabilities

# Function to calculate bigrams
def bigram(language, file):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read().lower()
    
    bigrams = find_ngrams(text, 2)
    occurrence = Counter([''.join(bigram) for bigram in bigrams])
    count = len(bigrams)
    
    probabilities = {
        char1 + char2: round((occurrence.get(char1 + char2, 0) / count), 6)
        for char1 in valid_chars
        for char2 in valid_chars
    }

    print("bigram", language, file, count)
    return probabilities

# Corpus of languages and corresponding files
corpus = {
    "danish": "corpus/dan_news_2008_30K-sentences.txt",
    "english": "corpus/eng_news_2016_30K-sentences.txt",
    "french": "corpus/fra_news_2010_30K-sentences.txt",
    "german": "corpus/deu_news_2015_30K-sentences.txt",
    "swedish": "corpus/swe_news_2007_30K-sentences.txt",
}

# Function to save JSON data to a file
def save_json_to_file(filename, json_data):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2)

# Loop over each language and process bigrams (unigram can be called similarly)
for language, file in corpus.items():
    save_json_to_file(f"website/assets/unigram_{language}.json", unigram(language, file))
    save_json_to_file(f"website/assets/bigram_{language}.json", bigram(language, file))
