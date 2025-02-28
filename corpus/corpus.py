import json
from collections import Counter

# Define valid characters as a set for faster lookup
VALID_CHARS = set("abcdefghijklmnopqrstuvwxyz ")

def filter_valid_chars(text):
    """Filters a string to include only valid characters."""
    return [char for char in text.lower() if char in VALID_CHARS]

def find_ngrams(text, n):
    """Finds n-grams (bigrams, trigrams, etc.) in a string."""
    filtered_text = filter_valid_chars(text)
    return [tuple(filtered_text[i:i + n]) for i in range(len(filtered_text) - n + 1)]

def unigram(language, filepath):
    """Computes unigram probabilities from a text file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    filtered_text = filter_valid_chars(text)
    total_count = len(filtered_text)
    occurrence = Counter(filtered_text)
    
    probabilities = {
        char: round(occurrence.get(char, 0) / total_count, 6)
        for char in VALID_CHARS
    }

    print(f"Unigram processed: {language} ({total_count} characters)")
    return probabilities

def bigram(language, filepath):
    """Computes bigram probabilities from a text file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    bigrams = find_ngrams(text, 2)
    total_count = len(bigrams)
    occurrence = Counter([''.join(bigram) for bigram in bigrams])

    probabilities = {
        f"{char1}{char2}": round(occurrence.get(f"{char1}{char2}", 0) / total_count, 6)
        for char1 in VALID_CHARS
        for char2 in VALID_CHARS
    }

    print(f"Bigram processed: {language} ({total_count} bigrams)")
    return {
        "total_count": total_count,
        "probabilities": probabilities
    }

def save_json(filename, data):
    """Saves dictionary data to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

# Corpus files
CORPUS = {
    "en": "corpus/en_sentences.txt",
    "es": "corpus/es_sentences.txt",
    "de": "corpus/de_sentences.txt",
    "fr": "corpus/fr_sentences.txt",
    "it": "corpus/it_sentences.txt",
    "nl": "corpus/nl_sentences.txt",
    "pt": "corpus/pt_sentences.txt",
    "da": "corpus/da_sentences.txt",
    "sv": "corpus/sv_sentences.txt",
    "no": "corpus/no_sentences.txt",
    "fi": "corpus/fi_sentences.txt",
    "ro": "corpus/ro_sentences.txt",
    "hu": "corpus/hu_sentences.txt",
    "tr": "corpus/tr_sentences.txt",
    "id": "corpus/id_sentences.txt",
}

if __name__ == "__main__":
    for lang, file in CORPUS.items():
        save_json(f"resources/data/unigram_{lang}.json", unigram(lang, file))
        save_json(f"resources/data/bigram_{lang}.json", bigram(lang, file))
