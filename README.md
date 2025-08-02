# Broken Phone

A web-based game inspired by Gartic Phone, supporting English and Armenian. Players create questions, pass the device to answer them, and see a combined story at the end.

## Live Demo
Play the game at [https://Broken-Phone-game](https://Iamnerses.github.io/Broken-Phone-game).

## How to Play
1. Visit the live demo or run locally (see below).
2. Choose a language (English or Armenian) from the dropdown.
3. Add questions, save them as a preset, or load a saved preset.
4. Pass the device to answer each question.
5. View the final story and play again!

## Running Locally
To run the game locally, you need a web server due to CORS restrictions when loading `translations.json`:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pass-the-story.git
   cd pass-the-story
   ```
2. Start a local server:
   - **With Node.js**:
     ```bash
     npm install -g http-server
     http-server .
     ```
     Then open `http://localhost:8080` in your browser.
   - **With Python**:
     ```bash
     python3 -m http.server 8000
     ```
     Then open `http://localhost:8000`.
3. Alternatively, use the live demo link above to avoid local setup.

## Files
- `index.html`: Main HTML structure.
- `styles.css`: Custom styles with Tailwind CSS.
- `script.js`: Game logic with dynamic translation loading.
- `translations.json`: English and Armenian translations.
- `README.md`: Project documentation.

## Features
- Responsive design for mobile and desktop.
- Supports English and Armenian languages via a JSON file.
- Save and load question presets using localStorage.
- Hosted seamlessly on GitHub Pages.

## License
MIT License (see `LICENSE` file, if included).


