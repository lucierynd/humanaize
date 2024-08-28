import json
import ollama
import os

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
    response = ollama.chat(model='gemma:2b', messages=conversation_history)
    bot_message = response['message']['content']
    conversation_history.append({'role': 'assistant', 'content': bot_message})

    return bot_message

def main():
    conversation_history = create_conv_history()
    while True:
        user_message = input("You: ")
        if user_message.lower() in ['exit', 'quit']:
            save_conversation_data(conversation_history)
            break
        user_message = "User input: '" + user_message + "'"
        bot_message = send_message(conversation_history, user_message)
        print(f"Bot: {bot_message}")
        save_conversation_data(conversation_history)

if __name__ == "__main__":
    print("Starting conversation with your bot")
    main()