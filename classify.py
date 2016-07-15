from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier

with open('train.csv', 'r') as fp:
	cl = NaiveBayesClassifier(fp, format="csv")

text = raw_input('Enter text to classify: ')
print(cl.classify(text))
