from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("PAWA_API_KEY")  # Or paste directly for now
API_URL = "https://staging.api.pawa-ai.com/v1/chat/request"

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

if __name__ == "__main__":
    app.run(debug=True)
