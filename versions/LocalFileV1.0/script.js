let questions = [];
let answers = [];
let currentQuestionIndex = 0;
let currentLanguage = 'en';

// Embedded translations
const translations = {
    "en": {
        "page_title": "Pass the Story",
        "setup_title": "Pass the Story",
        "setup_description": "Add questions for players to answer. Each answer will be combined into a final story! You can also select a saved preset.",
        "preset_name_label": "Preset Name (Optional):",
        "preset_name_placeholder": "Enter preset name",
        "load_preset_label": "Load Saved Preset:",
        "load_preset_option": "Select a preset",
        "question_placeholder": "Enter a question",
        "add_question_btn": "Add Another Question",
        "save_preset_btn": "Save Preset",
        "start_game_btn": "Start Game",
        "game_title": "Player {player}",
        "answer_placeholder": "Type your answer",
        "submit_answer_btn": "Submit & Pass",
        "result_title": "Your Story!",
        "restart_game_btn": "Play Again",
        "no_preset_name_alert": "Please enter a preset name!",
        "no_questions_alert": "Please add at least one question!",
        "preset_saved_alert": "Preset saved!",
        "no_answer_alert": "Please provide an answer!"
    },
    "hy": {
        "page_title": "Փչացած հեռախոս",
        "setup_title": "Փչացած հեռախոս",
        "setup_description": "Ավելացրեք հարցեր, որ խաղացողները պատասխանեն։ Վերջում ստացված պատասխաններից կստեղծվի ամբողջական պատմություն։ Կարող եք ընտրել նաեւ պատրաստի հարցաշար։",
        "preset_name_label": "Նոր հարցաշարի անվանում (ըստ ցանկության)։",
        "preset_name_placeholder": "Թույն֊հարցաշարի֊անվանում777",
        "load_preset_label": "Բեռնել հարցաշար։",
        "load_preset_option": "Ընտրել հարցաշար",
        "question_placeholder": "Խոսքի․․․ ուրիշ բան, էդ էլ դու մտածի",
        "add_question_btn": "Ավելացնել եւս մեկ հարց",
        "save_preset_btn": "Պահպանել հարցաշարը",
        "start_game_btn": "Սկսել խաղը",
        "game_title": "Հարց {player}",
        "answer_placeholder": "Գրեք Ձեր պատասխանը",
        "submit_answer_btn": "Հաստատել եւ փոխանցել",
        "result_title": "Հլը էս ինչ պատմություն են հնարել է",
        "restart_game_btn": "Կրկին խաղալ",
        "no_preset_name_alert": "Անունը մոռացաք հարցաշարի!!",
        "no_questions_alert": "Այ ցավդ, տանեմ հարց չես գրել ախր",
        "preset_saved_alert": "Պահպանվեց",
        "no_answer_alert": "Լավ էէ միքիչ կրեատիվ էղի, նորմալ պատասխան գրի"
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.getElementById('page-title').textContent = translations[lang].page_title;
    document.getElementById('setup-title').textContent = translations[lang].setup_title;
    document.getElementById('setup-description').textContent = translations[lang].setup_description;
    document.getElementById('preset-name-label').textContent = translations[lang].preset_name_label;
    document.getElementById('preset-name').placeholder = translations[lang].preset_name_placeholder;
    document.getElementById('load-preset-label').textContent = translations[lang].load_preset_label;
    document.getElementById('load-preset').options[0].textContent = translations[lang].load_preset_option;
    document.querySelectorAll('.question-input').forEach(input => {
        input.placeholder = translations[lang].question_placeholder;
    });
    document.getElementById('add-question-btn').textContent = translations[lang].add_question_btn;
    document.getElementById('save-preset-btn').textContent = translations[lang].save_presetbtn;
    document.getElementById('start-game-btn').textContent = translations[lang].start_game_btn;
    document.getElementById('game-title').textContent = translations[lang].game_title;
    document.getElementById('answer-input').placeholder = translations[lang].answer_placeholder;
    document.getElementById('submit-answer-btn').textContent = translations[lang].submit_answer_btn;
    document.getElementById('result-title').textContent = translations[lang].result_title;
    document.getElementById('restart-game-btn').textContent = translations[lang].restart_game_btn;
}

function addQuestion(question = '') {
    const questionList = document.getElementById('question-list');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'flex items-center space-x-2';
    questionDiv.innerHTML = `
        <input type="text" class="question-input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${translations[currentLanguage].question_placeholder}" value="${question}">
        <button onclick="removeQuestion(this)" class="text-red-500 hover:text-red-700">✕</button>
    `;
    questionList.appendChild(questionDiv);
}

function removeQuestion(button) {
    if (document.querySelectorAll('.question-input').length > 1) {
        button.parentElement.remove();
    }
}

function savePreset() {
    const presetName = document.getElementById('preset-name').value.trim();
    if (!presetName) {
        alert(translations[currentLanguage].no_preset_name_alert);
        return;
    }
    const questions = Array.from(document.querySelectorAll('.question-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
    if (questions.length === 0) {
        alert(translations[currentLanguage].no_questions_alert);
        return;
    }
    const presets = JSON.parse(localStorage.getItem('presets') || '{}');
    presets[presetName] = questions;
    localStorage.setItem('presets', JSON.stringify(presets));
    updatePresetDropdown();
    alert(translations[currentLanguage].preset_saved_alert);
}

function updatePresetDropdown() {
    const dropdown = document.getElementById('load-preset');
    const presets = JSON.parse(localStorage.getItem('presets') || '{}');
    dropdown.innerHTML = `<option value="">${translations[currentLanguage].load_preset_option}</option>`;
    for (const presetName in presets) {
        const option = document.createElement('option');
        option.value = presetName;
        option.textContent = presetName;
        dropdown.appendChild(option);
    }
}

function loadPreset(presetName) {
    if (!presetName) return;
    const presets = JSON.parse(localStorage.getItem('presets') || '{}');
    const questions = presets[presetName] || [];
    document.getElementById('question-list').innerHTML = '';
    questions.forEach(question => addQuestion(question));
    document.getElementById('preset-name').value = presetName;
}

function startGame() {
    questions = Array.from(document.querySelectorAll('.question-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
    if (questions.length === 0) {
        alert(translations[currentLanguage].no_questions_alert);
        return;
    }
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    currentQuestionIndex = 0;
    answers = [];
    showQuestion();
}

function showQuestion() {
    document.getElementById('game-title').textContent = translations[currentLanguage].game_title.replace('{player}', currentQuestionIndex + 1);
    document.getElementById('current-question').textContent = questions[currentQuestionIndex];
    document.getElementById('answer-input').value = '';
}

function submitAnswer() {
    const answer = document.getElementById('answer-input').value.trim();
    if (answer === '') {
        alert(translations[currentLanguage].no_answer_alert);
        return;
    }
    answers.push(answer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const story = answers.join(' ');
    document.getElementById('final-story').textContent = story;
}

function restartGame() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
    questions = [];
    answers = [];
    currentQuestionIndex = 0;
    document.getElementById('question-list').innerHTML = `
        <div class="flex items-center space-x-2">
            <input type="text" class="question-input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${translations[currentLanguage].question_placeholder}">
            <button onclick="removeQuestion(this)" class="text-red-500 hover:text-red-700">✕</button>
        </div>
    `;
    document.getElementById('preset-name').value = '';
    updatePresetDropdown();
}

// Initialize
window.onload = function() {
    updateLanguage(currentLanguage);
    document.getElementById('language-toggle').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
};_
