import collections
import math
from decimal import Decimal

valid_chars = list("abcdefghijklmnopqrstuvwxyz ")

def intersection(lst1, lst2): 
	temp = set(lst2) 
	lst3 = [value for value in lst1 if value in temp] 
	return lst3 

def find_ngrams(str, n):
	input_list = intersection(list(str.lower()), valid_chars)
	return zip(*[input_list[i:] for i in range(n)])

def unigram(text, file):
	text = open(file).read().lower()
	occurance = collections.Counter(intersection(list(text), valid_chars))
	count = len(intersection(list(text), valid_chars))

	filename = ("unigram_%s.txt" % language)
	dump = open(filename, "w")
	for char in valid_chars:
		dump.write("'%s': %e,\n" % (char, Decimal(float(occurance[char]) / count)))
	dump.close()

	print("unigram", language, corpus[language], count)


def bigram(language, file):
	text = open(file).read().lower()
	occurance = collections.Counter(find_ngrams(text, 2))
	count = len(find_ngrams(text, 2))

	filename = ("bigram_%s.txt" % language)
	dump = open(filename, "w")
	for char_1 in valid_chars:
		for char_2 in valid_chars:
			dump.write("'%s%s': %e,\n" % (char_2, char_1, Decimal(float(occurance[(char_2, char_1)]) / count)))
	dump.close()

	print("bigram", language, corpus[language], count)

corpus = {
	"danish": "dan_news_2008_30K-sentences.txt",
	"english": "eng_news_2016_30K-sentences.txt",
	"french": "fra_news_2010_30K-sentences.txt",
	"german": "deu_news_2015_30K-sentences.txt",
	"swedish": "swe_news_2007_30K-sentences.txt"
}

for language in corpus.keys():
	# unigram(language, corpus[language])
	bigram(language, corpus[language])
