let currentSuggestionIndex = 0;
const suggestions = ["newSuggestion", "newSuggestion2", "newSuggestion3"];

function confirmAddEvent(eventDescription, confirmationMessage, button) {
    const userConfirmed = confirm(confirmationMessage);
    if (userConfirmed) {
        addEventToCalendar(eventDescription);
        replaceSuggestion(button); // Replace the suggestion after confirmation
    }
}

function addEventToCalendar(eventDescription) {
    // Add here the code to link it to the Microsoft API
}

function replaceSuggestion(button) {
    const parentSuggestion = button.closest('.suggestion');
    const newSuggestionId = suggestions[currentSuggestionIndex];
    const newSuggestion = document.getElementById(newSuggestionId);
    
    parentSuggestion.innerHTML = newSuggestion.innerHTML;
    
    // Update the index for the next suggestion
    currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
}

function highlightButtonClick() {
    alert("Button clicked! Implement your desired functionality here.");
}

function addHighlight() {
    const newHighlight = prompt("Enter the new highlight:");
    if (newHighlight) {
        const highlightsInfo = document.getElementById('highlights-info');
        const newHighlightItem = document.createElement('li');
        newHighlightItem.textContent = newHighlight;
        highlightsInfo.appendChild(newHighlightItem);
    }
}

async function sendMessage() {
    const userInputElement = document.getElementById('userInput');
    const userInput = userInputElement.value;
    if (!userInput) return;

    addMessage('You: ' + userInput, 'user-message');

    // Clear the input field immediately after retrieving its value
    userInputElement.value = '';

    // Show the loading spinner in the chat
    const loadingMessage = addMessage('HumAIn is typing...', 'loading');
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    loadingMessage.appendChild(spinner);

    const response = await fetch('http://127.0.0.1:5000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    // Remove the loading message
    loadingMessage.remove();

    const data = await response.json();
    addMessage('HumAIn: ' + data.message, 'bot-message');
}

function addMessage(text, className) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + className;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return messageDiv;
}


let zoomLevel = 1;

const highlightsData = {
    week: [
        "Charles P., Jennifier O., Liza T. are joining your yeam",
        "Sofia Palini is celebrating 2 years at Infosys",
        "Major product launch event",
        "George Paul is due to complete his project",
        "Ankit is on week 2 of onboarding",
        "Suzan is signing an big contract with a client",
        "Weekly training or skill development session."

    ],
    day: [
        "It's Luca's Birthday today",
        "It's Michal Jo's last day in the company",
        "Lunch with Coca Cola to finalize the deal",
        "Suzan just gave birth to her second child",
        "Check on the team morale",
        "Sending daily reports to upper management"
    ],
    month: [
        "Project deadline approaching",
        "Team outing scheduled",
        "Monthly budget and expense review",
        "Michal Jo is retiring next month",
        "Client feedback session",
        "New project kickoff",
        "Celebrating employee work anniversaries"
    ],
    year: [
        "Celebrate the company's anniversary.",
        "Year-end performance reviews",
        "Holiday party planning",
        "Annual client appreciation day",
        "Budget planning for next year",
        "Employee recognition awards",
        "Annual performance review meetings"
    ]
};

function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

function changeHighlights(period) {
    const highlightsInfo = document.getElementById('highlights-info');
    const title = document.getElementById('highlights-title');

    title.textContent = `Highlights of the ${period}`;
    const items = highlightsData[period].map(item => `<li>${item}</li>`).join('');
    highlightsInfo.innerHTML = `<ul>${items}</ul>`;

    // Hide the dropdown after selection
    toggleDropdown();
}

// Initialize with weekly highlights
document.addEventListener('DOMContentLoaded', () => {
    changeHighlights('week');
});
