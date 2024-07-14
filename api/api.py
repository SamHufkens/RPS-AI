import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

classes = ["paper", "rock", "scissors"]

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# loss: 4.5507e-06 - accuracy: 1.0000 - val_loss: 0.2445 - val_accuracy: 0.9323
rps_model = tf.keras.models.load_model("./models/rps-model2.h5")

def preprocess(img):
    image = cv2.resize(img, (224, 224))

    # Normalize the image
    image = image / 255.

    # Expand dimensions to fit the model's expected input format
    image = np.expand_dims(image, axis=0)

    return image

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    numpy_arr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(numpy_arr, cv2.IMREAD_COLOR)
    preprocessed_image = preprocess(img)

    y_pred = rps_model.predict(preprocessed_image)

    predicted_index = np.argmax(y_pred)

    result = {
        "prediction" : classes[predicted_index],
        "confidence" : np.round(y_pred, 2).tolist()
    }

    return result
