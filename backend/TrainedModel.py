import sys
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import numpy as np

# Load the dataset
file_path = 'students_data.csv'
df = pd.read_csv(file_path)

# Preprocess the data
# Encoding categorical variables
label_encoders = {}
for column in ['Matric Course', 'Intermediate Course', 'Interest', 'Recommended Course']:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Features and target variable
X = df[['Matric Marks', 'Intermediate Marks', 'Matric Course', 'Intermediate Course', 'Interest']]
y = df['Recommended Course']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define weights for each feature (more weight to Interest)
feature_weights = {'Matric Marks': 1, 'Intermediate Marks': 1, 'Matric Course': 1, 'Intermediate Course': 1, 'Interest': 10}

# Train a KNN model with weighted features
knn = KNeighborsClassifier(n_neighbors=3, metric='wminkowski', metric_params={'w': list(feature_weights.values())})
knn.fit(X_train, y_train)

# Test the model
y_pred = knn.predict(X_test)

# Function to get recommendations based on input data
def recommend_course(matric_marks, intermediate_marks, matric_course, intermediate_course, interests):
    matric_course_enc = label_encoders['Matric Course'].transform([matric_course])[0]
    intermediate_course_enc = label_encoders['Intermediate Course'].transform([intermediate_course])[0]
    
    # Predict the recommended courses for each interest
    recommended_courses = set()
    for interest in interests:
        interest_enc = label_encoders['Interest'].transform([interest])[0]
        user_data = pd.DataFrame({
            'Matric Marks': [matric_marks],
            'Intermediate Marks': [intermediate_marks],
            'Matric Course': [matric_course_enc],
            'Intermediate Course': [intermediate_course_enc],
            'Interest': [interest_enc]
        })
        recommended_course_enc = knn.predict(user_data)[0]
        recommended_course = label_encoders['Recommended Course'].inverse_transform([recommended_course_enc])[0]
        recommended_courses.add(recommended_course)
    
    return list(recommended_courses)

if __name__ == '__main__':
    if len(sys.argv) != 9:
        print(json.dumps({"error": "__init__() takes exactly 8 arguments ({} given)".format(len(sys.argv) - 1)}))
        sys.exit(1)
    
    name, matricField, matricMarks, intermediateField, intermediateMarks, interest1, interest2, interest3 = sys.argv[1:]
    
    predictions = recommend_course(int(matricMarks), int(intermediateMarks), matricField, intermediateField, [interest1, interest2, interest3])
    
    result = {
    
        'predictions': predictions
    }
    
    print(json.dumps(result))
