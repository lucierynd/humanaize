import json
import ollama

def send_message(context):
    response = ollama.chat(model='humanaizebot', messages=[{"role": "user", "content": json.dumps(context)}])
    bot_message = response['message']['content']
    return bot_message

def main():
    # Read the JSON file
    with open('employee.json', 'r') as file:
        context = json.load(file)
    
    bot_message = send_message(context)
    print(f"Bot: {bot_message}")

    # Create a response dictionary with sections
    response_data = {
        "employee_id": context.get("employee_id"),
        "bot_response": bot_message
    }

    # Split the response into sections to preserve formatting
    response_lines = bot_message.split('\n')
    structured_response = {
        "Calendar Events": [],
        "Suggested Discussion Topics and Suggested Behaviors": [],
        "Training Suggestions": []
    }

    current_section = None
    for line in response_lines:
        line = line.strip()
        if line.startswith("**1. Calendar Events**"):
            current_section = "Calendar Events"
        elif line.startswith("**2. Suggested Discussion Topics and Suggested Behaviors**"):
            current_section = "Suggested Discussion Topics and Suggested Behaviors"
        elif line.startswith("**3. Training Suggestions**"):
            current_section = "Training Suggestions"
        elif current_section and line:
            structured_response[current_section].append(line)

    response_data["structured_response"] = structured_response

    # Write the response to a new JSON file
    with open('bot_response.json', 'w') as response_file:
        json.dump(response_data, response_file, indent=4, ensure_ascii=False)
    
    print("Response saved to bot_response.json")

if __name__ == "__main__":
    print("Starting HumanAIze bot ...")
    main()
