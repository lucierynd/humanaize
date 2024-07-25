from flask import Flask, request, jsonify
import json
import ollama
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def create_conv_history():
    if os.path.exists("convBot.json"):
        os.remove("convBot.json")
    json_file = []
    return json_file

def save_conversation_data(conversation_history):
    with open("convBot.json", "w") as f:
        json.dump(conversation_history, f, indent=4)

def send_message(conversation_history, user_message):
    conversation_history.append({'role': 'user', 'content': user_message})
    print(f"User message added to conversation history: {user_message}")
    response = ollama.chat(model='humanaizechat', messages=conversation_history)
    print(f"Response from Ollama: {response}")
    bot_message = response['message']['content']
    conversation_history.append({'role': 'assistant', 'content': bot_message})
    return bot_message

conversation_history = create_conv_history()

@app.route('/send-message', methods=['POST'])
def handle_message():
    global conversation_history
    user_message = request.json.get('message')
    print(f"Received message: {user_message}")
    if user_message.lower() in ['exit', 'quit']:
        save_conversation_data(conversation_history)
        return jsonify({"message": "Conversation ended."})
    user_message = "User input: '" + user_message + "'"
    bot_message = send_message(conversation_history, user_message)
    save_conversation_data(conversation_history)
    return jsonify({"message": bot_message})

if __name__ == "__main__":
    print("Starting Flask server for your bot")
    app.run(debug=True)
 