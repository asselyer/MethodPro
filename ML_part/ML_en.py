
import pandas as pd
import numpy as np
from textblob import TextBlob
import string

def predict_en(headers_list):
    df2 = pd.DataFrame(headers_list, columns=['title'])
    df2['title_mod'] = df2['title'].str.translate(str.maketrans('', '', string.punctuation))
    print(df2['title_mod'])

    df2['Polarity'] = np.nan
    df2['Subjectivity']= np.nan
    df2['Score'] = np.nan
    
    

    for idx, title in enumerate(df2['title_mod'].values):  #for each row in our df dataframe

        obj = TextBlob(title) #pass the text only article to TextBlob to anaylse
        df2['Polarity'].iloc[idx] = obj.sentiment.polarity #write sentiment polarity back to df
        df2['Subjectivity'].iloc[idx] = obj.sentiment.subjectivity #write sentiment subjectivity score back to df
        if obj.sentiment.polarity >= 0.05: # attribute bucket to sentiment polartiy
            score = 'positive'
        elif  -.05 < obj.sentiment.polarity < 0.02:
            score = 'neutral'
        else:
            score = 'negative'
        df2['Score'].iloc[idx] = score #write score back to df
    return df2['Score']