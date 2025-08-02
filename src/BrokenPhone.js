let questions = [];
let answers = [];
let currentQuestionIndex = 0;
let translations = {};
let currentLanguage = 'en';

async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        translations = await response.json();
        initializeDefaultPreset();
        updateLanguage(currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
        alert('Failed to load translations. Please try refreshing the page.');
    }
}

function initializeDefaultPreset() {
    const presets = JSON.parse(localStorage.getItem('presets') || '{}');
    // Initialize default preset for each language if not already present
    ['en', 'hy'].forEach(lang => {
        const presetName = `${lang}_${translations[lang].default_preset_name}`;
        if (!presets[presetName]) {
            presets[presetName] = translations[lang].default_questions;
        }
    });
    localStorage.setItem('presets', JSON.stringify(presets));
    updatePresetDropdown();
}

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
    document.getElementById('save-preset-btn').textContent = translations[lang].save_preset_btn;
    document.getElementById('start-game-btn').textContent = translations[lang].start_game_btn;
    document.getElementById('game-title').textContent = translations[lang].game_title;
    document.getElementById('answer-input').placeholder = translations[lang].answer_placeholder;
    document.getElementById('submit-answer-btn').textContent = translations[lang].submit_answer_btn;
    document.getElementById('result-title').textContent = translations[lang].result_title;
    document.getElementById('restart-game-btn').textContent = translations[lang].restart_game_btn;

    // remove remains  
  document.getElementById('preset-name').value = "";
  clearQuestionList();
  console.log("upd");  

    // Update preset dropdown and translate loaded preset questions
    updatePresetDropdown();
    const currentPresetName = document.getElementById('preset-name').value.trim();
    if (currentPresetName) {
        const translatedPresetName = translatePresetName(currentPresetName, lang);
        document.getElementById('preset-name').value = translatedPresetName;
        loadPreset(translatedPresetName);
    }
}

function translatePresetName(presetName, targetLang) {
    // If preset is the default preset, return the translated name
    const defaultPresetEn = `en_${translations.en.default_preset_name}`;
    const defaultPresetHy = `hy_${translations.hy.default_preset_name}`;
    if (presetName === defaultPresetEn && targetLang === 'hy') {
        return defaultPresetHy;
    } else if (presetName === defaultPresetHy && targetLang === 'en') {
        return defaultPresetEn;
    }
    // For non-default presets, keep the name as is
    return presetName.replace(/^en_|^hy_/, `${targetLang}_`);
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

function clearQuestionList() {
    document.getElementById('question-list').innerHTML = `
        <div class="flex items-center space-x-2">
            <input type="text" class="question-input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${translations[currentLanguage].question_placeholder}">
            <button onclick="removeQuestion(this)" class="text-red-500 hover:text-red-700">✕</button>
        </div>
    `;
}

function savePreset() {
    const presetNameInput = document.getElementById('preset-name').value.trim();
    if (!presetNameInput) {
        alert(translations[currentLanguage].no_preset_name_alert);
        return;
    }
    const presetName = `${currentLanguage}_${presetNameInput}`;
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
        if (presetName.startsWith(`${currentLanguage}_`)) {
            const displayName = presetName.replace(`${currentLanguage}_`, '');
            const option = document.createElement('option');
            option.value = presetName;
            option.textContent = displayName;
            dropdown.appendChild(option);
        }
    }
}

function loadPreset(presetName) {
    if (!presetName) return;
    const presets = JSON.parse(localStorage.getItem('presets') || '{}');
    const questions = presets[presetName] || [];
    document.getElementById('question-list').innerHTML = '';
    questions.forEach(question => addQuestion(question));
    document.getElementById('preset-name').value = presetName.replace(`${currentLanguage}_`, '');
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
    loadTranslations();
    document.getElementById('language-toggle').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
};
