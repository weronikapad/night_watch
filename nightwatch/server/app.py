from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from groq import Groq
import requests

load_dotenv()

app =  Flask(__name__)
CORS(app)

@app.route("/api/health")
def health():
    return jsonify({"status": "NightWatch is working"})

@app.route("/api/scan-email", methods=["POST"])
def scan_email():
    data = request.get_json()
    email = data.get("email")
    
    url = f"https://leakcheck.io/api/public?check={email}"
    headers = {"User-Agent": "NightWatch-Hackathon"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        result = response.json()
        if result.get("success"):
            return jsonify({
                "email": email,
                "breaches": result.get("sources", []),
                "safe": result.get("found", 0) == 0,
                "count": result.get("found", 0),
                "fields": result.get("fields", [])
            })
    
    return jsonify({"email": email, "breaches": [], "safe": True, "count": 0})

@app.route("/api/analyze-prompt", methods=["POST"])
def analyze_prompt():
    data = request.get_json()
    prompt = data.get("prompt")

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    message = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are NightWatch, a cozy but sharp AI privacy guardian.
Analyze this prompt that user sent to an AI chatbot and identify any sensitive data exposed.

Prompt: "{prompt}"

Respond in this exact JSON format, nothing else, no extra text:
{{
    "risk_level" "low" or "medium" or "high",
    "exposed_types": ["list", "of", "data", "types", "found"],
    "summary": "one warm but direct sentence about what was exposed",
    "advice": "one thing that is actionable that they should do in this situation"
}}"""
            }
        ]
    )
    
    import json 
    response_text = message.choices[0].message.content
    clean = response_text.strip()
    if clean.startswith("```json"):
        clean = clean.split("```")[1]
        if clean.startswith("json"):
            clean = clean[4:]
    result = json.loads(clean.strip())
    return jsonify(result)


@app.route("/api/scorecard")
def scorecard():
    import json
    with open("data/scores.json") as f:
        platforms = json.load(f)
    return jsonify({"platforms": platforms})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    
