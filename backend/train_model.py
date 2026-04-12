import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

# Load sample dataset
data = load_iris()
X, y = data.data, data.target

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X, y)

# Save model
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "../model/model.pkl")

joblib.dump(model, model_path)

print("Model saved successfully!")