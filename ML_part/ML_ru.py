import numpy as np
import pandas as pd
import string
import codecs
import string
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score, precision_score
from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer
<<<<<<< HEAD
from sklearn.model_selection import train_test_split
from nltk.stem.snowball import SnowballStemmer 
=======
>>>>>>> cd905c99c9754c0f0ae3dce8ca277bfeae52d400

def parseOutText(content):
    words = ""
  
    ### remove punctuation
<<<<<<< HEAD
    punc = string.punctuation 
    punc = punc+'«»—“”–№'
    
    text_string = content.translate(str.maketrans('', '', punc))
=======
    punc = string.punctuation
    punc= punc+'«»—“”–№'
    text_string = content.translate(str.maketrans('', '', punc))

    from nltk.stem.snowball import SnowballStemmer 
>>>>>>> cd905c99c9754c0f0ae3dce8ca277bfeae52d400

#     from nltk.stem.snowball import SnowballStemmer 

    ### project part 2: comment out the line below
#         words = text_string

    ### split the text string into individual words, stem each word,
    ### and append the stemmed word to words (make sure there's a single
    ### space between each stemmed word)

    stemmer = SnowballStemmer("russian")

    words = "";
    splitted_text = text_string.split()
    for word in splitted_text:
        word = stemmer.stem(word)
        words = words + word + " "
    
    return words
    
def parse_set( collection ):
    word_data = []
    for text in collection:
        word_data.append(parseOutText(text) )
    return word_data
    
def build_model_ru():
    data = pd.read_json('./data/news-ru.json', encoding = 'utf-8')
    data.drop('id', axis = 1, inplace=True)
#     data = data.iloc[:1000]
    
<<<<<<< HEAD
#     from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer
=======
>>>>>>> cd905c99c9754c0f0ae3dce8ca277bfeae52d400
    
    word_data = parse_set(data['text'])
    
    f = open('./data/stopwords-ru.txt', 'r')
    vectorizer = TfidfVectorizer(f.read())
    X = vectorizer.fit_transform(word_data)
    print(X.shape)

    print(word_data)
    
    x_train, x_test, y_train, y_test = train_test_split(X, data["sentiment"], test_size = 0.2, random_state = 7)
    clf_forest = RandomForestClassifier(n_estimators = 100, random_state = 7)
    clf_forest.fit(x_train, y_train)
    
    return clf_forest, vectorizer


def predict_ru(clf_forest, vectorizer, collection):

    processed_data = parse_set(collection)
   
    return clf_forest.predict( vectorizer.transform(processed_data) )

    