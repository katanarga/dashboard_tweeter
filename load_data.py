import pandas as pd
# Type DataFrame
df = pd.read_csv('data/tweets.csv')
# imprimer les 5 premier lignes
print(df.head())
# 5 denier
print(df.tail())

# ligne par ligne
# for i in range(len(df)):
for i in range(5):
    document = df[i:i+1]
    print(document,'\n')

# chaque valeur
# for i in range(len(df)):
for i in range(5):
    document = df[i:i+1]
    user_name = document['user_name'][i]
    text = document['text'][i]
    print("user",user_name,"à écrit:\n",text,'\n')
