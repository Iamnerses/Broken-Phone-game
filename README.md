Broken Phone (Directly translated from Armenian - Փչացած հեռախոս)
A web-based game inspired by our childhood game Broken Phone, supporting English and Armenian. Players create questions, pass the device to answer them, and see a combined story at the end.
Live Demo
Play the game at https://your-username.github.io/pass-the-story.
How to Play

Visit the live demo or run locally (see below).
Choose a language (English or Armenian) from the dropdown.
Add questions, save them as a preset, or load a saved preset.
Pass the device to answer each question.
View the final story and play again!

Running Locally
To run the game locally, you need a web server due to CORS restrictions when loading translations.json:

Clone the repository:git clone https://github.com/your-username/pass-the-story.git
cd pass-the-story


Start a local server:
With Node.js:npm install -g http-server
http-server .

Then open http://localhost:8080 in your browser.
With Python:python3 -m http.server 8000

Then open http://localhost:8000.


Alternatively, use the live demo link above to avoid local setup.

Files

index.html: Main HTML structure.
styles.css: Custom styles with Tailwind CSS.
script.js: Game logic with dynamic translation loading.
translations.json: English and Armenian translations.
README.md: Project documentation.

Features

Responsive design for mobile and desktop.
Supports English and Armenian languages via a JSON file.
Save and load question presets using localStorage.
Hosted seamlessly on GitHub Pages.

License
MIT License (see LICENSE file, if included).
