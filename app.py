from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import re  # Import regex library to remove unwanted characters

# Configure your Gemini API key
genai.configure(api_key="")  # Replace with your actual API key

app = Flask(__name__)

# CORS configuration
cors = CORS(app, resources={r"/get-gemini-response": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route('/get-gemini-response', methods=['POST'])
def get_gemini_response():
    data = request.json
    user_input = data.get('userInput')

    if not user_input:
        return jsonify({"error": "No user input provided"}), 400

    # Generate response using Gemini
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = (
            f"User asked: {user_input}. you are a medical chatbot. You have to give concise responses and suggest preliminary treatment for the user. Dont give any disclaimer and i want the response in under 100 words"
        )
        response = model.generate_content(prompt)

        # Remove asterisks (*) from the response text
        cleaned_text = re.sub(r'\*', '', response.text)

        return jsonify({"answer": cleaned_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8080) 
