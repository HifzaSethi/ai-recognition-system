from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input
import numpy as np
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------- Load Models ----------
DRAW_MODEL_PATH = r"F:\python\AI\dip\project\best_drawmodel.h5"
SL_MODEL_PATH = r"F:\python\AI\dip\project\best_efficientnet_model.h5"
CLASS_INDICES_PATH = r'F:\python\AI\dip\project\class_indices.json'

draw_model = load_model(DRAW_MODEL_PATH)
sl_model = load_model(SL_MODEL_PATH)

with open(CLASS_INDICES_PATH, 'r') as f:
    sl_class_indices = json.load(f)
sl_class_names = {v: k for k, v in sl_class_indices.items()}

draw_class_names = ["house", "tree", "umbrella"]  # order must match draw model

# ---------- Routes ----------
@app.route('/')
def home():
    return "Unified AI Prediction API Running"

@app.route('/predict', methods=['POST'])
def predict():
    """
    Frontend must send a 'type' parameter:
      - type='drawing' -> drawing model
      - type='sign' -> sign language model
    """
    pred_type = request.form.get("type")
    if not pred_type:
        return jsonify({"error": "Please specify type='drawing' or type='sign'"}), 400

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        if pred_type == "drawing":
            img = image.load_img(filepath, target_size=(32, 32), color_mode="grayscale")
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0) / 255.0
            pred = draw_model.predict(img_array)
            class_index = int(np.argmax(pred[0]))
            prediction = draw_class_names[class_index]
            confidence = float(np.max(pred[0]))

        elif pred_type == "sign":
            img = image.load_img(filepath, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = preprocess_input(img_array)
            pred = sl_model.predict(img_array)
            class_index = int(np.argmax(pred[0]))
            prediction = sl_class_names[class_index]
            confidence = float(np.max(pred[0]))

        else:
            return jsonify({"error": "Invalid type. Must be 'drawing' or 'sign'"}), 400

    finally:
        os.remove(filepath)

    return jsonify({"prediction": prediction, "confidence": confidence})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
