import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv("dataset.csv")

X = data[['avg_time', 'std_time']]
y = data['label']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "../model/model.pkl")