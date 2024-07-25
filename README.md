# Management Platform with Chatbot

Welcome to the management platform with an integrated chatbot. This project includes a modern user interface with a calendar, AI-driven suggestions and a chatbot.

# Chatbot and assistant bot

The plateform is using one custum offline LLM to provide a chatbot and another custom LLM that suggest behaviour and calendar events according to employee informations and new events.

## Project Structure

The project is structured as follows:

root
│ plateforme.html
│ README.md
│ app.py
│ event_LLM.py
├───css
│ styles.css
└───js
  script.js│
└───json
  employee.json
  employee2.json
  bot_response.json
├───/images
│ microphone.png
│ loupe.png
│ interrochat.png
│ notification.png
│ profile.png



## Prerequisites

To run this project, you will need:

- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.)
- Ollama installed on your computer to run the chatbot 

## Instructions to Open the Platform

1. **Download the Project**: Ensure you have downloaded or cloned the project to your computer.

2. **Navigate to the Project Folder**: Go to the folder containing the project files.

3. **Create the two LLM assistant with Ollama**: In the terminal type:

ollama create humanaizebot -f ./ModelFileAssistant
ollama create humanaizechat -f ./ModelFileChat

To be usable on almost every laptops the system currently uses gemma:2b, but any model from ollama can be use for better performances. Just update the model in top of the two model files.

4. **Run the chatbot **: In the terminal type: python app.py

5. **Open the `plateform.html` File**: Double-click the `plateform.html` file. It should automatically open in your default web browser.

6. **Interact with the Platform**: You can now interact with the platform, view the calendar, and use the integrated chatbot.

## Platform Features

- **Calendar**: An integrated calendar to manage your events and appointments.
- **Chatbot**: An interactive chatbot to answer your questions and assist with daily management.

## LLM assistant

1. **Create a json file with the employee information**: Modify the employee.json file with the informations

2. **Ask for recommandation from your assistant**: Run in the terminal: python event_LLM.py

3. **Obtain personnal recommandation from your assistant**: A json file with the suggestion will be created (next step: to be link with the plateform)


## Troubleshooting

- If the `plateform.html` file does not open in the browser, try right-clicking the file, then select "Open with" and choose your preferred web browser.
- Ensure all necessary files (CSS, images, and JavaScript) are in their respective folders and that the paths in the `plateform.html` file are correct.


Thank you for using our management platform with a chatbot. We hope it meets your needs and facilitates your daily management tasks.
