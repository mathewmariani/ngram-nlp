import requests
import re

LANGUAGES = ["en", "es", "de", "fr", "it", "nl", "pt", "da", "sv", "no", "fi", "ro", "hu", "tr", "id"]
WIKI_API_TEMPLATE = "https://{}.wikipedia.org/api/rest_v1/page/random/summary"

def get_random_article(language):
    """Fetches a random Wikipedia article in the given language."""
    response = requests.get(WIKI_API_TEMPLATE.format(language))
    if response.status_code == 200:
        data = response.json()
        return data.get("extract", "")
    return ""

def clean_text(text):
    """Removes unwanted characters and extra spaces."""
    return re.sub(r'\s+', ' ', text).strip()

def collect_words(language, target_word_count=30000):
    """Collects Wikipedia text for a single language until the target word count is reached."""
    total_text = []
    word_count = 0

    while word_count < target_word_count:
        article_text = clean_text(get_random_article(language))
        words = article_text.split()
        total_text.append(article_text)
        word_count += len(words)
        print(f"[{language.upper()}] Collected: {word_count}/{target_word_count} words")

    return " ".join(total_text)

# Process each language
for lang in LANGUAGES:
    text = collect_words(lang)
    filename = f"wikipedia_text_{lang}.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Saved {filename}")

print("Done!")
