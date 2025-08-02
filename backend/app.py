from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from io import BytesIO

load_dotenv()

API_KEY = os.getenv("PAWA_API_KEY")
API_URL = "https://staging.api.pawa-ai.com/v1/chat/request"
TTS_URL = "https://staging.api.pawa-ai.com/v1/voice/text-to-speech"

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")

    payload = {
        "model": "pawa-v1-ember-20240924",
        "messages": [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "You are a helpful health assistant. "
                            "Only answer health-related questions in Swahili or English. "
                            "If the user asks something unrelated to health, respond with: "
                            "'Samahani, mimi ni msaidizi wa afya pekee. Tafadhali uliza kuhusu afya.'"
                        )
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user_message
                    }
                ]
            }
        ],
        "temperature": 0.2,
        "max_tokens": 512,
        "stream": False
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        try:
            content = response.json()["data"]["request"][0]["message"]["content"]
            return jsonify({"response": content.strip()})
        except:
            return jsonify({"error": "Invalid response from PAWA"}), 500
    else:
        return jsonify({"error": "Failed to reach PAWA"}), response.status_code


@app.route("/api/tts", methods=["POST"])
def tts():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    payload = {
        "text": text,
        "voice": "ame",  # You can try other voices if available
        "model": "pawa-tts-v1-20250704",
        "temperature": 0.5
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    tts_response = requests.post(TTS_URL, headers=headers, json=payload, stream=True)

    if tts_response.status_code == 200:
        # Return as audio blob to frontend
        return send_file(
            BytesIO(tts_response.content),
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="speech.mp3"
        )
    else:
        return jsonify({"error": f"Failed to synthesize speech: {tts_response.text}"}), tts_response.status_code


if __name__ == "__main__":
    app.run(debug=True)
