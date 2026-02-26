/* ===================================================
   ENGLISH ADVENTURE — Main Application JS
   Target: Children 8-12 | A1-A2 Level
   =================================================== */

'use strict';

// ============================================================
// VIDEO SWITCHER (for sections with multiple videos)
// ============================================================
function switchVideo(section, id1, id2, index) {
  const iframe = document.getElementById(`${section}-iframe`);
  if (!iframe) return;
  iframe.src = `https://www.youtube.com/embed/${index === 0 ? id1 : id2}`;
  const btns = document.querySelectorAll(`#screen-${section} .video-tab-btn`);
  btns.forEach((b, i) => b.classList.toggle('active', i === index));
}

// ============================================================
// CONSTANTS & STATE
// ============================================================
const TEACHER_PASSWORD = 'TEACHER123';
const PROGRESS_KEYS = ['library','connectors','clothes','haveto','playground','finalquiz'];
const SECTIONS_NEEDED = 3; // sections to unlock final quiz

let teacherModeActive = false;
let showAnswers = false;

// ============================================================
// DATA — ALL EXERCISE CONTENT
// ============================================================

/* ----- LIBRARY: CAN/CAN'T ----- */
const libraryComprehension = [
  { q: '1. Can you borrow books from the library?', answer: true, type: 'tf' },
  { q: '2. Can you eat food inside the library?', answer: false, type: 'tf' },
  { q: '3. Can you use the computers for 2 hours?', answer: false, type: 'tf' },
  { q: '4. Can you listen to audiobooks with headphones?', answer: true, type: 'tf' },
  { q: '5. Can you bring your dog to the library?', answer: false, type: 'tf' },
  { q: '6. How many books can you borrow?', options: ['2 books','5 books','10 books','1 book'], correct: 1, type: 'mcq' },
  { q: '7. Can you take photos of pages?', options: ['Yes, for study','No, never','Only on Monday','Only with a ticket'], correct: 0, type: 'mcq' },
  { q: '8. What CAN\'T you do in the library?', options: ['Read books','Make phone calls','Take notes','Use computers'], correct: 1, type: 'mcq' },
  { q: '9. Can you play loud music?', options: ['Yes, always','No, never','Only with headphones','Yes, on weekends'], correct: 1, type: 'mcq' },
  { q: '10. Can you cut or damage books?', answer: false, type: 'tf' }
];

const libraryMatching = [
  { left: 'You can borrow',      right: 'up to 5 books.' },
  { left: 'You can\'t make',     right: 'phone calls in the library.' },
  { left: 'You can use',         right: 'the computers for 1 hour.' },
  { left: 'You can\'t bring',    right: 'pets to the library.' },
  { left: 'You can take',        right: 'notes quietly.' },
  { left: 'You can\'t eat',      right: 'food or drinks inside.' },
  { left: 'You can listen',      right: 'to audiobooks with headphones.' },
  { left: 'You can\'t damage',   right: 'or cut the books.' }
];

const libraryTrueFalse = [
  { q: 'You can borrow 10 books from the library.', answer: false },
  { q: 'You can use computers in the library.', answer: true },
  { q: 'You can eat a sandwich inside the library.', answer: false },
  { q: 'You can take notes quietly.', answer: true },
  { q: 'You can play loud music.', answer: false },
  { q: 'You can bring your cat to the library.', answer: false },
  { q: 'You can take photos of pages for study.', answer: true },
  { q: 'You can listen to audiobooks with headphones.', answer: true }
];

/* ----- CONNECTORS: AND/BUT/OR ----- */
const connectorsFillBlank = [
  { sentence: 'I like cats ___ dogs.', answer: 'and', explanation: 'AND adds two things you like.' },
  { sentence: 'Do you want milk ___ juice?', answer: 'or', explanation: 'OR shows a choice.' },
  { sentence: 'She is smart ___ lazy.', answer: 'but', explanation: 'BUT shows a contrast.' },
  { sentence: 'We can walk ___ take the bus.', answer: 'or', explanation: 'OR offers an alternative.' },
  { sentence: 'He plays football ___ basketball.', answer: 'and', explanation: 'AND joins two sports.' },
  { sentence: 'I am tired ___ I cannot sleep.', answer: 'but', explanation: 'BUT shows contrast between tired and cannot sleep.' },
  { sentence: 'She can sing ___ dance.', answer: 'and', explanation: 'AND adds two abilities.' },
  { sentence: 'Is your brother tall ___ short?', answer: 'or', explanation: 'OR gives two choices.' },
  { sentence: 'I want to go out ___ it is raining.', answer: 'but', explanation: 'BUT contrasts the desire and the problem.' },
  { sentence: 'You can read ___ write here.', answer: 'and', explanation: 'AND joins two allowed activities.' },
  { sentence: 'He is young ___ very strong.', answer: 'but', explanation: 'BUT shows a surprising contrast.' },
  { sentence: 'We can eat pizza ___ pasta for dinner.', answer: 'or', explanation: 'OR presents a dinner choice.' }
];

const connectorsMCQ = [
  { q: 'I like swimming ___ running.', options: ['and','but','or'], correct: 0 },
  { q: 'She is happy ___ her sister is sad.', options: ['and','but','or'], correct: 1 },
  { q: 'Do you want tea ___ coffee?', options: ['and','but','or'], correct: 2 },
  { q: 'He can read ___ write in English.', options: ['and','but','or'], correct: 0 },
  { q: 'It is cold outside ___ I forgot my coat.', options: ['and','but','or'], correct: 1 },
  { q: 'We can go by bus ___ by taxi.', options: ['and','but','or'], correct: 2 },
  { q: 'My mum is tall ___ my dad is short.', options: ['and','but','or'], correct: 1 },
  { q: 'I study English ___ Maths every day.', options: ['and','but','or'], correct: 0 },
  { q: 'Would you like a pen ___ a pencil?', options: ['and','but','or'], correct: 2 },
  { q: 'She has long hair ___ blue eyes.', options: ['and','but','or'], correct: 0 },
  { q: 'I want to help ___ I don\'t know how.', options: ['and','but','or'], correct: 1 },
  { q: 'You can call ___ send a message.', options: ['and','but','or'], correct: 2 }
];

/* ----- CLOTHES VOCABULARY ----- */
const clothesItems = [
  { emoji: '👔', word: 'shirt',    color: '#DBEAFE', hint: 'You wear this on your upper body, usually with buttons.' },
  { emoji: '👗', word: 'dress',    color: '#FCE7F3', hint: 'A one-piece garment, usually worn by girls.' },
  { emoji: '👟', word: 'shoes',    color: '#D1FAE5', hint: 'You wear these on your feet to walk.' },
  { emoji: '🎩', word: 'hat',      color: '#FEF9C3', hint: 'You wear this on your head.' },
  { emoji: '🧥', word: 'jacket',   color: '#E0E7FF', hint: 'A short coat worn over your clothes when it is cold.' },
  { emoji: '👖', word: 'trousers', color: '#FEE2E2', hint: 'You wear these on your legs, from waist to ankle.' },
  { emoji: '🧦', word: 'socks',    color: '#ECFDF5', hint: 'Soft coverings for your feet, worn inside shoes.' },
  { emoji: '🩱', word: 'skirt',    color: '#FDF4FF', hint: 'A garment worn below the waist, open at the bottom.' },
  { emoji: '🥾', word: 'boots',    color: '#FEF3C7', hint: 'Strong shoes that cover your ankle and lower leg.' },
  { emoji: '🧤', word: 'gloves',   color: '#F0FDF4', hint: 'You wear these on your hands to keep them warm.' },
  { emoji: '🧣', word: 'scarf',    color: '#FFF7ED', hint: 'A long piece of cloth worn around your neck.' },
  { emoji: '🥼', word: 'coat',     color: '#EFF6FF', hint: 'A long warm outer garment worn in cold weather.' }
];

const clothesMatching = [
  { item: 'shirt', desc: 'worn on the upper body, usually with buttons' },
  { item: 'shoes', desc: 'worn on the feet for walking' },
  { item: 'hat', desc: 'covers the top of your head' },
  { item: 'jacket', desc: 'a short coat worn over your clothes' },
  { item: 'trousers', desc: 'covers both legs from waist to ankle' },
  { item: 'socks', desc: 'soft coverings for your feet inside shoes' },
  { item: 'dress', desc: 'a one-piece garment for girls' },
  { item: 'gloves', desc: 'keeps your hands warm in winter' },
  { item: 'scarf', desc: 'wrapped around the neck for warmth' },
  { item: 'boots', desc: 'strong shoes that cover the ankle' }
];

const clothesWritingPrompts = [
  { prompt: '🌞 You are going to the beach. What are you wearing?', clue: 'Mention summer clothes!' },
  { prompt: '❄️ It is snowing outside. What are you wearing?', clue: 'Think warm clothes!' },
  { prompt: '🏫 You are at school today. What are you wearing?', clue: 'School clothes!' },
  { prompt: '🎉 You are going to a party. What are you wearing?', clue: 'Special occasion clothes!' },
  { prompt: '⚽ You are playing football. What are you wearing?', clue: 'Sports clothes!' },
  { prompt: '🌧️ It is raining. What are you wearing?', clue: 'Think about rain gear!' },
  { prompt: '🌷 It is spring. What are you wearing today?', clue: 'Light spring clothes!' },
  { prompt: '🏖️ You are going for a walk in the park. What are you wearing?', clue: 'Comfortable clothes!' }
];

/* ----- HAVE TO / HAS TO ----- */
const havetoTableData = [
  { subject: 'I', negative: false },
  { subject: 'She', negative: false },
  { subject: 'They', negative: false },
  { subject: 'He', negative: true },
  { subject: 'We', negative: true },
  { subject: 'You', negative: false },
  { subject: 'It', negative: true },
  { subject: 'My friends', negative: false }
];

const havetoFillBlank = [
  { sentence: 'I ___ study for the test.', answer: 'have to', explanation: 'I → have to' },
  { sentence: 'She ___ wear a uniform.', answer: 'has to', explanation: 'She → has to' },
  { sentence: 'They ___ be quiet in the library.', answer: 'have to', explanation: 'They → have to' },
  { sentence: 'He ___ do his homework now.', answer: 'has to', explanation: 'He → has to' },
  { sentence: 'We ___ be at school at 8am.', answer: 'have to', explanation: 'We → have to' },
  { sentence: 'My dog ___ see the vet tomorrow.', answer: 'has to', explanation: 'My dog = it → has to' },
  { sentence: 'You ___ eat your vegetables.', answer: 'have to', explanation: 'You → have to' },
  { sentence: 'The teacher ___ prepare the lesson.', answer: 'has to', explanation: 'The teacher = she/he → has to' },
  { sentence: 'I don\'t ___ go to school on Sunday.', answer: 'have to', explanation: 'Negative: don\'t have to' },
  { sentence: 'She doesn\'t ___ cook dinner today.', answer: 'have to', explanation: 'Negative: doesn\'t have to' },
  { sentence: 'We ___ save water every day.', answer: 'have to', explanation: 'We → have to' },
  { sentence: 'The student ___ read the book carefully.', answer: 'has to', explanation: 'The student = he/she → has to' }
];

const havetoMCQ = [
  { q: 'Maria ___ do her homework every night.', options: ['have to','has to','don\'t have to'], correct: 1 },
  { q: 'My parents ___ work on Saturdays.', options: ['has to','don\'t have to','have to'], correct: 2 },
  { q: 'The cat ___ visit the vet.', options: ['has to','have to','don\'t have to'], correct: 0 },
  { q: 'I ___ wake up at 6am tomorrow.', options: ['has to','have to','doesn\'t have to'], correct: 1 },
  { q: 'She ___ wear glasses to read.', options: ['have to','don\'t have to','has to'], correct: 2 },
  { q: 'You ___ pay to enter the park.', options: ['has to','have to','doesn\'t have to'], correct: 1 },
  { q: 'Tom and Ann ___ share a room.', options: ['has to','have to','doesn\'t have to'], correct: 1 },
  { q: 'It ___ be cold to snow.', options: ['have to','don\'t have to','has to'], correct: 2 },
  { q: 'We ___ turn off the lights.', options: ['has to','have to','doesn\'t have to'], correct: 1 },
  { q: 'He ___ take medicine twice a day.', options: ['have to','has to','don\'t have to'], correct: 1 },
  { q: 'They ___ bring their own lunch.', options: ['has to','have to','doesn\'t have to'], correct: 1 },
  { q: 'My sister ___ practise piano every day.', options: ['have to','don\'t have to','has to'], correct: 2 }
];

const havetoShort = [
  { context: 'Tom / clean his room', answer: 'Tom has to clean his room.' },
  { context: 'I / do my homework', answer: 'I have to do my homework.' },
  { context: 'She / go to school', answer: 'She has to go to school.' },
  { context: 'We / drink water every day', answer: 'We have to drink water every day.' },
  { context: 'He / wake up early', answer: 'He has to wake up early.' },
  { context: 'They / study for the exam', answer: 'They have to study for the exam.' },
  { context: 'My dog / eat at 7pm', answer: 'My dog has to eat at 7pm.' },
  { context: 'You / brush your teeth', answer: 'You have to brush your teeth.' },
  { context: 'The baby / sleep a lot', answer: 'The baby has to sleep a lot.' },
  { context: 'We / be quiet in the library', answer: 'We have to be quiet in the library.' }
];

/* ----- VIDEO QUIZ DATA ----- */
const videoQuizData = {
  library: [
    { type: 'trueFalse', question: 'CAN is used to express permission or possibility.', answer: true, explanation: 'Yes! CAN means it is allowed or possible.' },
    { type: 'mcq', question: 'Which sentence uses CAN correctly?', options: ["I can't swimming.", "She can swims.", "He can sing.", "They cans play."], correctIndex: 2, explanation: 'CAN + base verb: He can sing.' },
    { type: 'fillBlank', question: 'You ___ (not) eat in the library. Fill the blank with CAN\'T:', answer: "can't", explanation: 'CAN\'T = not allowed' },
    { type: 'shortAnswer', question: 'Write one thing you can do at school.', minWords: 3 }
  ],
  connectors: [
    { type: 'trueFalse', question: 'BUT is used to show a contrast between two ideas.', answer: true, explanation: 'Correct! BUT shows contrast.' },
    { type: 'mcq', question: 'Choose the correct connector: I like maths ___ science.', options: ['but','or','and','not'], correctIndex: 2, explanation: 'AND joins two things you like.' },
    { type: 'fillBlank', question: 'She is tall ___ her brother is short. (contrast)', answer: 'but', explanation: 'BUT contrasts two opposite ideas.' },
    { type: 'shortAnswer', question: 'Write a sentence using the word BUT.', minWords: 4 }
  ],
  clothes: [
    { type: 'trueFalse', question: 'Gloves are worn on your feet.', answer: false, explanation: 'Gloves are worn on your HANDS, not feet.' },
    { type: 'mcq', question: 'What do you wear on your head?', options: ['socks','hat','jacket','shoes'], correctIndex: 1, explanation: 'A HAT is worn on your head.' },
    { type: 'fillBlank', question: 'In winter I wear a warm ___ (starts with C, keeps you warm)', answer: 'coat', explanation: 'A coat keeps you warm in winter.' },
    { type: 'shortAnswer', question: 'Name three pieces of clothing you are wearing today.', minWords: 4 }
  ],
  haveto: [
    { type: 'trueFalse', question: 'We use HAS TO with he, she, and it.', answer: true, explanation: 'Correct! He/She/It → HAS TO' },
    { type: 'mcq', question: 'Which sentence is correct?', options: ["She have to study.", "He has to studies.", "They has to go.", "He has to go."], correctIndex: 3, explanation: 'He has to go. = correct form' },
    { type: 'fillBlank', question: 'My brother ___ clean his room. (he, obligation)', answer: 'has to', explanation: 'My brother = he → has to' },
    { type: 'shortAnswer', question: 'Write a sentence using HAS TO about a friend.', minWords: 4 }
  ]
};

/* ----- FINAL QUIZ DATA ----- */
const finalQuizData = [
  // MCQ (6)
  { type: 'mcq', section: 'CAN/CAN\'T', question: 'Which sentence is correct?', options: ["You can't singing.", "You can sing.", "You cans sing.", "You can to sing."], correct: 1 },
  { type: 'mcq', section: 'CAN/CAN\'T', question: 'What does CAN\'T mean?', options: ['allowed','impossible or not allowed','must','should'], correct: 1 },
  { type: 'mcq', section: 'Connectors', question: 'I like tennis ___ football.', options: ['but','or','and','can'], correct: 2 },
  { type: 'mcq', section: 'Connectors', question: 'Do you want pizza ___ pasta?', options: ['and','but','can','or'], correct: 3 },
  { type: 'mcq', section: 'Have To', question: 'She ___ do her homework.', options: ['have to','has to','don\'t have to','can\'t have to'], correct: 1 },
  { type: 'mcq', section: 'Clothes', question: 'What do you wear on your feet?', options: ['hat','gloves','shoes','scarf'], correct: 2 },
  // Fill Blanks (6)
  { type: 'fillBlank', section: 'CAN/CAN\'T', question: 'You ___ bring food to the library. (not allowed)', answer: "can't" },
  { type: 'fillBlank', section: 'Connectors', question: 'He is kind ___ very shy. (contrast)', answer: 'but' },
  { type: 'fillBlank', section: 'Have To', question: 'I ___ study for the exam. (obligation, I)', answer: 'have to' },
  { type: 'fillBlank', section: 'Have To', question: 'She ___ wake up early. (obligation, she)', answer: 'has to' },
  { type: 'fillBlank', section: 'Clothes', question: 'In winter I wear a ___ around my neck. (warm accessory)', answer: 'scarf' },
  { type: 'fillBlank', section: 'Connectors', question: 'We can go swimming ___ cycling today. (choice)', answer: 'or' },
  // Reading (4)
  { type: 'reading', section: 'CAN/CAN\'T', passage: 'The park has rules. You can play football. You can ride bikes. But you can\'t drive cars. You also can\'t pick the flowers.', question: 'Can you ride a bike in the park?', options: ['Yes','No','Only on Monday','Only with an adult'], correct: 0 },
  { type: 'reading', section: 'CAN/CAN\'T', passage: 'The park has rules. You can play football. You can ride bikes. But you can\'t drive cars. You also can\'t pick the flowers.', question: 'What CAN\'T you do in the park?', options: ['Ride bikes','Play football','Pick flowers','Run'], correct: 2 },
  { type: 'reading', section: 'Have To', passage: 'At school, students have to arrive at 8am. They have to wear a uniform. The teacher has to prepare lessons. But students don\'t have to do sport every day.', question: 'Does the teacher have to prepare lessons?', options: ['Yes','No','Only on Mondays','Sometimes'], correct: 0 },
  { type: 'reading', section: 'Have To', passage: 'At school, students have to arrive at 8am. They have to wear a uniform. The teacher has to prepare lessons. But students don\'t have to do sport every day.', question: 'Do students have to do sport every day?', options: ['Yes, always','No, not every day','Yes, twice a day','No, never'], correct: 1 },
  // Matching (2)
  { type: 'matching', section: 'Clothes', question: 'Match the clothing item with its description.', pairs: [
    { item: 'hat', desc: 'worn on the head' },
    { item: 'gloves', desc: 'worn on the hands' },
    { item: 'boots', desc: 'heavy shoes over the ankle' },
    { item: 'scarf', desc: 'wrapped around the neck' }
  ]},
  { type: 'matching', section: 'Connectors', question: 'Match the connector with its use.', pairs: [
    { item: 'AND', desc: 'adds two ideas' },
    { item: 'BUT', desc: 'shows contrast' },
    { item: 'OR', desc: 'shows a choice' },
    { item: 'CAN', desc: 'expresses ability or permission' }
  ]},
  // Writing (2)
  { type: 'writing', section: 'CAN/CAN\'T', question: 'Write 2 sentences about your school rules using CAN and CAN\'T.', minWords: 6 },
  { type: 'writing', section: 'Have To', question: 'Write 2 sentences about things you have to do every day.', minWords: 6 }
];

// ============================================================
// PROGRESS MANAGEMENT
// ============================================================
function getProgress() {
  const saved = localStorage.getItem('studentProgress');
  return saved ? JSON.parse(saved) : {};
}
function saveProgress(key) {
  const p = getProgress();
  p[key] = true;
  localStorage.setItem('studentProgress', JSON.stringify(p));
  updateProgressBar();
  updateMenuCards();
}
function updateProgressBar() {
  const p = getProgress();
  const name = localStorage.getItem('studentName') || 'Student';
  const done = PROGRESS_KEYS.filter(k => p[k]).length;
  const pct = Math.round((done / PROGRESS_KEYS.length) * 100);
  document.getElementById('progress-percent').textContent = pct;
  document.getElementById('progress-name').textContent = name;
  document.getElementById('progress-bar-inner').style.width = pct + '%';
  // Pills
  const pillsEl = document.getElementById('progress-sections');
  pillsEl.innerHTML = PROGRESS_KEYS.map(k => {
    const isDone = !!p[k];
    const labels = { library:'📚 Library', connectors:'🔗 Connectors', clothes:'👕 Clothes', haveto:'📋 Have To', playground:'🛝 Playground', finalquiz:'🏆 Quiz' };
    return `<span class="progress-pill ${isDone?'done':''}">${isDone?'✅':'⬜'} ${labels[k]}</span>`;
  }).join('');
}
function updateMenuCards() {
  const p = getProgress();
  PROGRESS_KEYS.forEach(k => {
    const el = document.getElementById('status-' + k);
    if (!el) return;
    if (k === 'finalquiz') {
      const done = PROGRESS_KEYS.filter(key => key !== 'finalquiz' && p[key]).length;
      if (p['finalquiz']) {
        el.textContent = '✅ Completed!';
        el.className = 'card-status done';
      } else if (done >= SECTIONS_NEEDED) {
        el.textContent = '🔓 Ready!';
        el.className = 'card-status done';
      } else {
        el.textContent = `🔒 Complete ${SECTIONS_NEEDED - done} more section(s)`;
        el.className = 'card-status locked';
      }
    } else {
      if (p[k]) {
        el.textContent = '✅ Completed!';
        el.className = 'card-status done';
      } else {
        el.textContent = '🔓 Open';
        el.className = 'card-status';
      }
    }
  });
}

// ============================================================
// SCREEN NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
    s.style.display = '';
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
    target.style.display = '';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'screen-menu') {
    updateProgressBar();
    updateMenuCards();
  }
}

// ============================================================
// STUDENT NAME SYSTEM
// ============================================================
function saveName() {
  const input = document.getElementById('student-name-input');
  const errorEl = document.getElementById('name-error');
  const name = input.value.trim();
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-]{2,20}$/;
  if (!nameRegex.test(name)) {
    errorEl.textContent = '❌ Please enter a valid name (2–20 letters, no numbers). / Por favor ingresa un nombre válido (2-20 letras, sin números).';
    errorEl.classList.remove('hidden');
    input.focus();
    return;
  }
  errorEl.classList.add('hidden');
  localStorage.setItem('studentName', name);
  initApp();
}
function initApp() {
  const name = localStorage.getItem('studentName');
  if (!name) {
    showScreen('screen-home');
    document.getElementById('progress-container').style.display = 'none';
    return;
  }
  document.getElementById('menu-name').textContent = name;
  document.getElementById('student-greeting').textContent = '👋 ' + name;
  document.getElementById('student-greeting').classList.remove('hidden');
  document.getElementById('progress-container').style.display = '';
  updateProgressBar();
  updateMenuCards();
  showScreen('screen-menu');
  buildAllExercises();
}
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// ============================================================
// TAB SYSTEM
// ============================================================
function switchTab(screen, tab) {
  const contentEls = document.querySelectorAll(`[id^="${screen}-"]`);
  contentEls.forEach(el => {
    if (el.classList.contains('tab-content')) {
      el.classList.remove('active');
      el.classList.add('hidden');
    }
  });
  const targetTab = document.getElementById(`${screen}-${tab}`);
  if (targetTab) {
    targetTab.classList.add('active');
    targetTab.classList.remove('hidden');
  }
  // Update tab buttons
  const tabBtns = document.querySelectorAll(`#screen-${screen} .tab-btn`);
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${tab}'`)) {
      btn.classList.add('active');
    }
  });
}

// ============================================================
// BUILD ALL EXERCISES
// ============================================================
function buildAllExercises() {
  buildLibraryExercises();
  buildConnectorsExercises();
  buildClothesExercises();
  buildHaveToExercises();
  buildPlaygroundExercises();
  buildVideoQuizzes();
  buildFinalQuiz();
}

// ============================================================
// LIBRARY EXERCISES
// ============================================================
function buildLibraryExercises() {
  // Comprehension (mixed TF and MCQ)
  const compEl = document.getElementById('library-comprehension');
  if (compEl) compEl.innerHTML = libraryComprehension.map((q, i) => buildQuestion(q, i, 'library-comp')).join('');

  // Matching
  const matchEl = document.getElementById('library-matching');
  if (matchEl) {
    const shuffled = [...libraryMatching].sort(() => Math.random() - 0.5);
    const rights = shuffled.map(s => s.right).sort(() => Math.random() - 0.5);
    matchEl.innerHTML = shuffled.map((m, i) => `
      <div class="matching-item" data-correct="${m.right}">
        <span class="matching-left">${m.left}</span>
        <span class="matching-arrow">→</span>
        <select class="matching-select" id="match-lib-${i}" aria-label="Match for: ${m.left}">
          <option value="">Choose...</option>
          ${rights.map(r => `<option value="${r}">${r}</option>`).join('')}
        </select>
      </div>
    `).join('');
    matchEl.dataset.type = 'matching';
    matchEl.dataset.id = 'library-matching';
  }

  // True/False
  const tfEl = document.getElementById('library-truefalse');
  if (tfEl) tfEl.innerHTML = libraryTrueFalse.map((q, i) => buildTFQuestion(q, i, 'lib-tf')).join('');
}

function buildQuestion(q, i, prefix) {
  if (q.type === 'tf') {
    return buildTFQuestion(q, i, prefix);
  } else if (q.type === 'mcq') {
    return `<div class="question-item" id="${prefix}-q${i}">
      <div class="question-text"><span class="question-num">${i+1}</span>${q.q}</div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => `
          <li><label class="option-label">
            <input type="radio" name="${prefix}-${i}" value="${oi}"> ${opt}
          </label></li>`).join('')}
      </ul>
      <div class="explanation" id="${prefix}-exp${i}"></div>
    </div>`;
  }
  return '';
}

function buildTFQuestion(q, i, prefix) {
  return `<div class="question-item" id="${prefix}-q${i}">
    <div class="question-text"><span class="question-num">${i+1}</span>${q.q || q.question || q.q}</div>
    <div class="tf-buttons">
      <button class="tf-btn" onclick="selectTF(this, '${prefix}-${i}', true)" data-val="true">✅ True</button>
      <button class="tf-btn" onclick="selectTF(this, '${prefix}-${i}', false)" data-val="false">❌ False</button>
    </div>
    <div class="explanation" id="${prefix}-exp${i}"></div>
  </div>`;
}

// ============================================================
// CONNECTORS EXERCISES
// ============================================================
function buildConnectorsExercises() {
  const fbEl = document.getElementById('connectors-fb-exercises');
  if (fbEl) {
    fbEl.innerHTML = connectorsFillBlank.map((q, i) => `
      <div class="question-item" id="connectors-fb-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>
          ${q.sentence.replace('___', `<input type="text" class="fill-input" id="cfb-${i}" data-answer="${q.answer}" placeholder="AND/BUT/OR" aria-label="Fill in the blank">`)}
        </div>
        <div class="explanation" id="cfb-exp${i}">${q.explanation}</div>
      </div>
    `).join('');
    fbEl.dataset.type = 'fillblank';
    fbEl.dataset.id = 'connectors-fb';
  }

  const mcqEl = document.getElementById('connectors-mcq-exercises');
  if (mcqEl) {
    mcqEl.innerHTML = connectorsMCQ.map((q, i) => `
      <div class="question-item" id="connectors-mcq-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>${q.q}</div>
        <ul class="options-list">
          ${q.options.map((opt, oi) => `
            <li><label class="option-label">
              <input type="radio" name="cmcq-${i}" value="${oi}"> ${opt.toUpperCase()}
            </label></li>`).join('')}
        </ul>
        <div class="explanation" id="cmcq-exp${i}"></div>
      </div>
    `).join('');
    mcqEl.dataset.type = 'mcq-data';
    mcqEl.dataset.id = 'connectors-mcq';
  }
}

// ============================================================
// CLOTHES EXERCISES
// ============================================================
function buildClothesExercises() {
  const labelEl = document.getElementById('clothes-label-exercises');
  if (labelEl) {
    labelEl.innerHTML = `<div class="clothes-card-grid">${clothesItems.map((c, i) => `
      <div class="clothes-card" id="clothes-label-q${i}" style="background:${c.color}">
        <div class="clothes-card-emoji" role="img" aria-label="${c.word}">${c.emoji}</div>
        <input type="text" class="clothes-card-input fill-input" id="cl-${i}" data-answer="${c.word}" 
          placeholder="What is this?" 
          aria-label="Type the name of this clothing item"
          autocomplete="off">
        <div class="explanation clothes-card-exp" id="cl-exp${i}">
          ✅ <strong>${c.word}</strong><br><small>${c.hint}</small>
        </div>
      </div>`).join('')}</div>`;
    labelEl.dataset.type = 'fillblank';
    labelEl.dataset.id = 'clothes-label';
  }

  const matchEl = document.getElementById('clothes-match-exercises');
  if (matchEl) {
    const descs = clothesMatching.map(c => c.desc).sort(() => Math.random() - 0.5);
    matchEl.innerHTML = clothesMatching.map((c, i) => `
      <div class="matching-item" data-correct="${c.desc}">
        <span class="matching-left">${c.item}</span>
        <span class="matching-arrow">→</span>
        <select class="matching-select" id="cm-${i}" aria-label="Match for: ${c.item}">
          <option value="">Choose description...</option>
          ${descs.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
      </div>
    `).join('');
    matchEl.dataset.type = 'matching';
    matchEl.dataset.id = 'clothes-match';
  }

  const writingEl = document.getElementById('clothes-writing-exercises');
  if (writingEl) {
    writingEl.innerHTML = clothesWritingPrompts.map((p, i) => `
      <div class="playground-prompt" id="cw-prompt-${i}">
        <div class="playground-prompt-text">${p.prompt}<br><small style="color:#64748b">💡 ${p.clue}</small></div>
        <textarea class="playground-textarea" id="cw-${i}" placeholder='Write: "I\'m wearing..."' rows="2" aria-label="${p.prompt}"></textarea>
        <div class="playground-feedback" id="cw-fb-${i}"></div>
      </div>
    `).join('');
    writingEl.dataset.type = 'clothes-writing';
    writingEl.dataset.id = 'clothes-writing';
  }
}

// ============================================================
// HAVE TO EXERCISES
// ============================================================
function buildHaveToExercises() {
  // Table
  const tableEl = document.getElementById('haveto-table-exercises');
  if (tableEl) {
    tableEl.innerHTML = havetoTableData.map((row, i) => {
      const correct = getHaveTo(row.subject, row.negative);
      return `<div class="question-item" id="ht-tbl-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>
          <strong>${row.subject}</strong> ${row.negative ? '(negative)' : ''} → 
          <input type="text" class="fill-input" id="ht-tbl-${i}" data-answer="${correct}" placeholder="have to / has to" aria-label="Fill in have to or has to">
          + do something
        </div>
        <div class="explanation" id="ht-tbl-exp${i}">Answer: <strong>${correct}</strong></div>
      </div>`;
    }).join('');
    tableEl.dataset.type = 'fillblank';
    tableEl.dataset.id = 'haveto-table';
  }

  // Fill blanks
  const fbEl = document.getElementById('haveto-fb-exercises');
  if (fbEl) {
    fbEl.innerHTML = havetoFillBlank.map((q, i) => `
      <div class="question-item" id="ht-fb-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>
          ${q.sentence.replace('___', `<input type="text" class="fill-input" id="htfb-${i}" data-answer="${q.answer}" placeholder="have to/has to" aria-label="Fill in have to or has to">`)}
        </div>
        <div class="explanation" id="htfb-exp${i}">${q.explanation}</div>
      </div>
    `).join('');
    fbEl.dataset.type = 'fillblank';
    fbEl.dataset.id = 'haveto-fb';
  }

  // MCQ
  const mcqEl = document.getElementById('haveto-mcq-exercises');
  if (mcqEl) {
    mcqEl.innerHTML = havetoMCQ.map((q, i) => `
      <div class="question-item" id="ht-mcq-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>${q.q}</div>
        <ul class="options-list">
          ${q.options.map((opt, oi) => `
            <li><label class="option-label">
              <input type="radio" name="htmcq-${i}" value="${oi}"> ${opt}
            </label></li>`).join('')}
        </ul>
        <div class="explanation" id="htmcq-exp${i}"></div>
      </div>
    `).join('');
    mcqEl.dataset.type = 'mcq-haveto';
    mcqEl.dataset.id = 'haveto-mcq';
  }

  // Short answer
  const shortEl = document.getElementById('haveto-short-exercises');
  if (shortEl) {
    shortEl.innerHTML = havetoShort.map((q, i) => `
      <div class="question-item" id="ht-short-q${i}">
        <div class="question-text"><span class="question-num">${i+1}</span>
          Write a sentence using: <strong>${q.context}</strong>
        </div>
        <textarea class="playground-textarea" id="htsa-${i}" rows="2" placeholder="Write a full sentence..." aria-label="Write a sentence using have to or has to"></textarea>
        <div class="playground-feedback" id="htsa-fb-${i}"></div>
        <div class="explanation" id="htsa-exp${i}">Example: <em>${q.answer}</em></div>
      </div>
    `).join('');
    shortEl.dataset.type = 'haveto-short';
    shortEl.dataset.id = 'haveto-short';
  }
}

function getHaveTo(subj, negative) {
  const hasTo = ['She','He','It','My dog','The teacher','The student','The cat','The baby'].some(s => subj.startsWith(s) || subj === s);
  if (negative) return hasTo ? "doesn't have to" : "don't have to";
  return hasTo ? "has to" : "have to";
}

// ============================================================
// PLAYGROUND WRITING
// ============================================================
function buildPlaygroundExercises() {
  const prompts = [
    "Write a rule about running.",
    "Write a rule about sharing toys.",
    "Write a rule about throwing objects.",
    "Write a rule about speaking to friends.",
    "Write a rule about helping others.",
    "Write a rule about being safe.",
    "Write a rule about eating snacks.",
    "Write a rule about using the equipment."
  ];
  const el = document.getElementById('playground-prompts');
  if (el) {
    el.innerHTML = prompts.map((p, i) => `
      <div class="playground-prompt">
        <div class="playground-prompt-text">✏️ ${i+1}. ${p}</div>
        <textarea class="playground-textarea" id="pg-${i}" rows="2" placeholder='Example: "You can run on the grass."' aria-label="${p}"></textarea>
        <div class="playground-feedback" id="pg-fb-${i}"></div>
      </div>
    `).join('');
  }
}

function submitPlayground() {
  let passed = 0;
  for (let i = 0; i < 8; i++) {
    const ta = document.getElementById(`pg-${i}`);
    const fb = document.getElementById(`pg-fb-${i}`);
    if (!ta || !fb) continue;
    const val = ta.value.trim();
    const result = validateWriting(val);
    fb.innerHTML = result.checks.map(c => `<div class="check-item ${c.pass?'pass':'fail'}">${c.pass?'✅':'❌'} ${c.label}</div>`).join('');
    if (result.pass) passed++;
    ta.style.borderColor = result.pass ? 'var(--green)' : 'var(--red)';
  }
  const resEl = document.getElementById('playground-result');
  resEl.classList.remove('hidden');
  if (passed === 8) {
    resEl.className = 'result-box success';
    resEl.textContent = '🎉 Perfect! All 8 sentences are correct!';
    document.getElementById('playground-complete-banner').classList.remove('hidden');
    saveProgress('playground');
    showToast('🛝 Playground section complete!');
  } else if (passed >= 5) {
    resEl.className = 'result-box partial';
    resEl.textContent = `👍 Good effort! ${passed}/8 sentences are correct. Fix the ones with ❌ and try again!`;
  } else {
    resEl.className = 'result-box fail';
    resEl.textContent = `📝 You got ${passed}/8. Remember: start with a capital letter, end with a period, use CAN or CAN'T!`;
  }
}

function validateWriting(text) {
  const clothingWords = ['shirt','dress','shoes','hat','jacket','trousers','socks','skirt','boots','gloves','scarf','coat','t-shirt','jeans'];
  const checks = [
    { label: 'Starts with a capital letter', pass: text.length > 0 && text[0] === text[0].toUpperCase() && /[A-Z]/.test(text[0]) },
    { label: 'Ends with a period (.)', pass: text.endsWith('.') },
    { label: 'Contains "can" or "can\'t"', pass: /\bcan'?t?\b/i.test(text) },
    { label: 'Has at least 3 words', pass: text.split(/\s+/).filter(w => w.length > 0).length >= 3 }
  ];
  return { pass: checks.every(c => c.pass), checks };
}

function validateClothesWriting(text) {
  const clothingWords = ['shirt','dress','shoes','hat','jacket','trousers','socks','skirt','boots','gloves','scarf','coat','jeans','t-shirt'];
  const hasClothing = clothingWords.some(w => text.toLowerCase().includes(w));
  const hasWearing = /wearing|wear/i.test(text);
  const checks = [
    { label: 'Starts with capital letter', pass: text.length > 0 && /[A-Z]/.test(text[0]) },
    { label: 'Ends with a period', pass: text.endsWith('.') },
    { label: 'Contains a clothing word', pass: hasClothing },
    { label: 'Uses "wearing" or "wear"', pass: hasWearing },
    { label: 'At least 3 words', pass: text.split(/\s+/).filter(w => w.length > 0).length >= 3 }
  ];
  return { pass: checks.every(c => c.pass), checks };
}

// ============================================================
// VIDEO QUIZZES
// ============================================================
function buildVideoQuizzes() {
  Object.keys(videoQuizData).forEach(section => {
    const el = document.getElementById(`${section}-video-questions`);
    if (!el) return;
    el.innerHTML = videoQuizData[section].map((q, i) => buildVideoQuestion(q, i, section)).join('');
  });
}

function buildVideoQuestion(q, i, section) {
  if (q.type === 'trueFalse') {
    return `<div class="question-item" id="vq-${section}-${i}">
      <div class="question-text"><span class="question-num">${i+1}</span>${q.question}</div>
      <div class="tf-buttons">
        <button class="tf-btn" onclick="selectTF(this, 'vq-${section}-tf-${i}', true)">✅ True</button>
        <button class="tf-btn" onclick="selectTF(this, 'vq-${section}-tf-${i}', false)">❌ False</button>
      </div>
      <input type="hidden" id="vq-${section}-tf-${i}" value="">
      <div class="explanation" id="vq-${section}-exp${i}">${q.explanation}</div>
    </div>`;
  } else if (q.type === 'mcq') {
    return `<div class="question-item" id="vq-${section}-${i}">
      <div class="question-text"><span class="question-num">${i+1}</span>${q.question}</div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => `
          <li><label class="option-label">
            <input type="radio" name="vq-${section}-${i}" value="${oi}"> ${opt}
          </label></li>`).join('')}
      </ul>
      <div class="explanation" id="vq-${section}-exp${i}">${q.explanation}</div>
    </div>`;
  } else if (q.type === 'fillBlank') {
    return `<div class="question-item" id="vq-${section}-${i}">
      <div class="question-text"><span class="question-num">${i+1}</span>${q.question}</div>
      <input type="text" class="fill-input" id="vq-fb-${section}-${i}" data-answer="${q.answer}" placeholder="Type here..." aria-label="Fill in the blank">
      <div class="explanation" id="vq-${section}-exp${i}">${q.explanation}</div>
    </div>`;
  } else if (q.type === 'shortAnswer') {
    return `<div class="question-item" id="vq-${section}-${i}">
      <div class="question-text"><span class="question-num">${i+1}</span>${q.question}</div>
      <textarea class="playground-textarea" id="vq-sa-${section}-${i}" rows="2" placeholder="Write your answer..." aria-label="${q.question}"></textarea>
      <div class="explanation" id="vq-${section}-exp${i}"></div>
    </div>`;
  }
  return '';
}

function submitVideoQuiz(section) {
  const qs = videoQuizData[section];
  let correct = 0;
  qs.forEach((q, i) => {
    const expEl = document.getElementById(`vq-${section}-exp${i}`);
    if (q.type === 'trueFalse') {
      const hidEl = document.getElementById(`vq-${section}-tf-${i}`);
      const val = hidEl ? hidEl.value : '';
      const userAns = val === 'true';
      const isCorrect = (val !== '') && (userAns === q.answer);
      if (isCorrect) correct++;
      if (expEl) expEl.classList.add('visible');
    } else if (q.type === 'mcq') {
      const selected = document.querySelector(`input[name="vq-${section}-${i}"]:checked`);
      const isCorrect = selected && parseInt(selected.value) === q.correctIndex;
      if (isCorrect) correct++;
      if (expEl) expEl.classList.add('visible');
    } else if (q.type === 'fillBlank') {
      const inp = document.getElementById(`vq-fb-${section}-${i}`);
      if (inp) {
        const isCorrect = inp.value.trim().toLowerCase() === q.answer.toLowerCase();
        inp.classList.toggle('correct', isCorrect);
        inp.classList.toggle('incorrect', !isCorrect);
        if (isCorrect) correct++;
      }
      if (expEl) expEl.classList.add('visible');
    } else if (q.type === 'shortAnswer') {
      const ta = document.getElementById(`vq-sa-${section}-${i}`);
      const words = (ta ? ta.value.trim() : '').split(/\s+/).filter(Boolean).length;
      if (words >= q.minWords) correct++;
    }
  });
  const resultEl = document.getElementById(`${section}-video-result`);
  if (resultEl) {
    resultEl.classList.remove('hidden');
    const pct = correct / qs.length;
    if (pct >= 0.75) {
      resultEl.className = 'result-box success';
      resultEl.textContent = `🎉 Great! ${correct}/${qs.length} correct! Video quiz complete!`;
      saveProgress(section);
      document.getElementById(`${section}-complete-banner`).classList.remove('hidden');
      showToast(`⭐ ${section.charAt(0).toUpperCase()+section.slice(1)} section complete!`);
    } else {
      resultEl.className = 'result-box partial';
      resultEl.textContent = `📝 ${correct}/${qs.length} correct. Watch the video again and try!`;
    }
  }
}

// ============================================================
// TF SELECTION
// ============================================================
function selectTF(btn, name, value) {
  const parent = btn.closest('.question-item') || btn.parentElement.parentElement;
  parent.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected','selected-true','selected-false'));
  btn.classList.add('selected', value ? 'selected-true' : 'selected-false');
  // For video quiz, store in hidden input
  const hid = document.getElementById(name);
  if (hid) hid.value = value;
}

// ============================================================
// GENERIC EXERCISE CHECKER
// ============================================================
function checkExercise(id) {
  let container, correct = 0, total = 0;

  switch(id) {
    case 'library-comprehension': {
      total = libraryComprehension.length;
      libraryComprehension.forEach((q, i) => {
        if (q.type === 'tf') {
          const btns = document.querySelectorAll(`#library-comp-q${i} .tf-btn`);
          let userAns = null;
          btns.forEach(b => { if (b.classList.contains('selected-true')) userAns = true; if (b.classList.contains('selected-false')) userAns = false; });
          const pass = userAns === q.answer;
          if (pass) correct++;
          btns.forEach(b => {
            const v = b.getAttribute('data-val') === 'true';
            if (v === q.answer) b.classList.add('correct-answer');
            else if (b.classList.contains('selected-true') || b.classList.contains('selected-false')) b.classList.add('wrong-answer');
          });
        } else if (q.type === 'mcq') {
          const sel = document.querySelector(`input[name="library-comp-${i}"]:checked`);
          const pass = sel && parseInt(sel.value) === q.correct;
          if (pass) correct++;
          const labels = document.querySelectorAll(`#library-comp-q${i} .option-label`);
          labels.forEach((l, li) => {
            if (li === q.correct) l.classList.add('correct');
            else if (l.querySelector('input').checked) l.classList.add('incorrect');
          });
        }
      });
      showResult('library-comprehension-result', correct, total);
      break;
    }
    case 'library-matching': {
      const items = document.querySelectorAll('#library-matching .matching-item');
      total = items.length;
      items.forEach(item => {
        const sel = item.querySelector('select');
        const pass = sel && sel.value === item.dataset.correct;
        if (pass) correct++;
        if (sel) sel.classList.toggle('correct', pass), sel.classList.toggle('incorrect', !pass);
      });
      showResult('library-matching-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('library');
      break;
    }
    case 'library-truefalse': {
      total = libraryTrueFalse.length;
      libraryTrueFalse.forEach((q, i) => {
        const btns = document.querySelectorAll(`#lib-tf-q${i} .tf-btn`);
        let userAns = null;
        btns.forEach(b => { if (b.classList.contains('selected-true')) userAns = true; if (b.classList.contains('selected-false')) userAns = false; });
        const pass = userAns === q.answer;
        if (pass) correct++;
        btns.forEach(b => {
          const v = b.getAttribute('data-val') === 'true';
          if (v === q.answer) b.classList.add('correct-answer');
        });
      });
      showResult('library-truefalse-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('library');
      break;
    }
    case 'connectors-fb': {
      const inputs = document.querySelectorAll('#connectors-fb-exercises .fill-input');
      total = inputs.length;
      inputs.forEach((inp, i) => {
        const pass = inp.value.trim().toLowerCase() === inp.dataset.answer.toLowerCase();
        if (pass) correct++;
        inp.classList.toggle('correct', pass);
        inp.classList.toggle('incorrect', !pass);
        const exp = document.getElementById(`cfb-exp${i}`);
        if (exp && !pass) exp.classList.add('visible');
      });
      showResult('connectors-fb-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('connectors');
      break;
    }
    case 'connectors-mcq': {
      total = connectorsMCQ.length;
      connectorsMCQ.forEach((q, i) => {
        const sel = document.querySelector(`input[name="cmcq-${i}"]:checked`);
        const pass = sel && parseInt(sel.value) === q.correct;
        if (pass) correct++;
        const labels = document.querySelectorAll(`#connectors-mcq-q${i} .option-label`);
        labels.forEach((l, li) => {
          if (li === q.correct) l.classList.add('correct');
          else if (l.querySelector('input').checked) l.classList.add('incorrect');
        });
      });
      showResult('connectors-mcq-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('connectors');
      break;
    }
    case 'clothes-label': {
      total = clothesItems.length;
      clothesItems.forEach((c, i) => {
        const inp = document.getElementById(`cl-${i}`);
        if (!inp) return;
        const pass = inp.value.trim().toLowerCase() === c.word.toLowerCase();
        if (pass) correct++;
        inp.classList.toggle('correct', pass);
        inp.classList.toggle('incorrect', !pass);
        const exp = document.getElementById(`cl-exp${i}`);
        if (exp) exp.classList.toggle('visible', !pass);
      });
      showResult('clothes-label-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('clothes');
      break;
    }
    case 'clothes-match': {
      const items = document.querySelectorAll('#clothes-match-exercises .matching-item');
      total = items.length;
      items.forEach(item => {
        const sel = item.querySelector('select');
        const pass = sel && sel.value === item.dataset.correct;
        if (pass) correct++;
        if (sel) sel.classList.toggle('correct', pass), sel.classList.toggle('incorrect', !pass);
      });
      showResult('clothes-match-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('clothes');
      break;
    }
    case 'clothes-writing': {
      total = clothesWritingPrompts.length;
      for (let i = 0; i < total; i++) {
        const ta = document.getElementById(`cw-${i}`);
        const fb = document.getElementById(`cw-fb-${i}`);
        if (!ta || !fb) continue;
        const r = validateClothesWriting(ta.value.trim());
        fb.innerHTML = r.checks.map(c => `<div class="check-item ${c.pass?'pass':'fail'}">${c.pass?'✅':'❌'} ${c.label}</div>`).join('');
        if (r.pass) correct++;
        ta.style.borderColor = r.pass ? 'var(--green)' : 'var(--red)';
      }
      showResult('clothes-writing-result', correct, total);
      if (correct >= 6) saveProgress('clothes');
      break;
    }
    case 'haveto-table': {
      const inputs = document.querySelectorAll('#haveto-table-exercises .fill-input');
      total = inputs.length;
      inputs.forEach((inp, i) => {
        const pass = inp.value.trim().toLowerCase() === inp.dataset.answer.toLowerCase();
        if (pass) correct++;
        inp.classList.toggle('correct', pass);
        inp.classList.toggle('incorrect', !pass);
        const exp = document.getElementById(`ht-tbl-exp${i}`);
        if (exp && !pass) exp.classList.add('visible');
      });
      showResult('haveto-table-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('haveto');
      break;
    }
    case 'haveto-fb': {
      const inputs = document.querySelectorAll('#haveto-fb-exercises .fill-input');
      total = inputs.length;
      inputs.forEach((inp, i) => {
        const pass = inp.value.trim().toLowerCase() === inp.dataset.answer.toLowerCase();
        if (pass) correct++;
        inp.classList.toggle('correct', pass);
        inp.classList.toggle('incorrect', !pass);
        const exp = document.getElementById(`htfb-exp${i}`);
        if (exp && !pass) exp.classList.add('visible');
      });
      showResult('haveto-fb-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('haveto');
      break;
    }
    case 'haveto-mcq': {
      total = havetoMCQ.length;
      havetoMCQ.forEach((q, i) => {
        const sel = document.querySelector(`input[name="htmcq-${i}"]:checked`);
        const pass = sel && parseInt(sel.value) === q.correct;
        if (pass) correct++;
        const labels = document.querySelectorAll(`#ht-mcq-q${i} .option-label`);
        labels.forEach((l, li) => {
          if (li === q.correct) l.classList.add('correct');
          else if (l.querySelector('input').checked) l.classList.add('incorrect');
        });
        const exp = document.getElementById(`htmcq-exp${i}`);
        if (exp && !pass) exp.classList.add('visible');
      });
      showResult('haveto-mcq-result', correct, total);
      if (correct >= Math.ceil(total * 0.7)) saveProgress('haveto');
      break;
    }
    case 'haveto-short': {
      total = havetoShort.length;
      for (let i = 0; i < total; i++) {
        const ta = document.getElementById(`htsa-${i}`);
        const fb = document.getElementById(`htsa-fb-${i}`);
        const exp = document.getElementById(`htsa-exp${i}`);
        if (!ta) continue;
        const text = ta.value.trim();
        const hasHaveTo = /\b(have to|has to|don't have to|doesn't have to)\b/i.test(text);
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const pass = hasHaveTo && wordCount >= 4;
        if (pass) correct++;
        ta.style.borderColor = pass ? 'var(--green)' : 'var(--red)';
        if (fb) fb.innerHTML = `<div class="check-item ${hasHaveTo?'pass':'fail'}">${hasHaveTo?'✅':'❌'} Contains "have to" or "has to"</div>
          <div class="check-item ${wordCount>=4?'pass':'fail'}">${wordCount>=4?'✅':'❌'} At least 4 words</div>`;
        if (exp) exp.classList.toggle('visible', !pass);
      }
      showResult('haveto-short-result', correct, total);
      if (correct >= 7) saveProgress('haveto');
      break;
    }
  }
}

function showResult(elId, correct, total) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.classList.remove('hidden');
  const pct = correct / total;
  if (pct >= 0.8) {
    el.className = 'result-box success';
    el.innerHTML = `🎉 Excellent! <strong>${correct}/${total}</strong> correct! Amazing work!`;
  } else if (pct >= 0.5) {
    el.className = 'result-box partial';
    el.innerHTML = `👍 Good try! <strong>${correct}/${total}</strong> correct. Review the mistakes and try again!`;
  } else {
    el.className = 'result-box fail';
    el.innerHTML = `📝 Keep trying! <strong>${correct}/${total}</strong> correct. Go back to the reading section and try again!`;
  }
}

function retryExercise(id) {
  // Clear results
  const resultIds = { 'library-comprehension':'library-comprehension-result', 'library-matching':'library-matching-result', 'library-truefalse':'library-truefalse-result', 'connectors-fb':'connectors-fb-result', 'connectors-mcq':'connectors-mcq-result', 'clothes-label':'clothes-label-result', 'clothes-match':'clothes-match-result', 'clothes-writing':'clothes-writing-result', 'haveto-table':'haveto-table-result', 'haveto-fb':'haveto-fb-result', 'haveto-mcq':'haveto-mcq-result', 'haveto-short':'haveto-short-result' };
  const res = document.getElementById(resultIds[id]);
  if (res) res.classList.add('hidden');
  // Reset inputs/selections
  const containers = {
    'library-comprehension': '#library-comprehension',
    'library-matching': '#library-matching',
    'library-truefalse': '#library-truefalse',
    'connectors-fb': '#connectors-fb-exercises',
    'connectors-mcq': '#connectors-mcq-exercises',
    'clothes-label': '#clothes-label-exercises',
    'clothes-match': '#clothes-match-exercises',
    'clothes-writing': '#clothes-writing-exercises',
    'haveto-table': '#haveto-table-exercises',
    'haveto-fb': '#haveto-fb-exercises',
    'haveto-mcq': '#haveto-mcq-exercises',
    'haveto-short': '#haveto-short-exercises'
  };
  const sel = containers[id];
  if (sel) {
    const el = document.querySelector(sel);
    if (el) {
      el.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      el.querySelectorAll('input[type="text"]').forEach(t => { t.value = ''; t.className = t.className.replace(/\b(correct|incorrect)\b/g,'').trim(); });
      el.querySelectorAll('select').forEach(s => { s.selectedIndex = 0; s.className = s.className.replace(/\b(correct|incorrect)\b/g,'').trim(); });
      el.querySelectorAll('textarea').forEach(t => { t.value = ''; t.style.borderColor = ''; });
      el.querySelectorAll('.tf-btn').forEach(b => { b.classList.remove('selected','selected-true','selected-false','correct-answer','wrong-answer'); });
      el.querySelectorAll('.option-label').forEach(l => l.classList.remove('correct','incorrect'));
      el.querySelectorAll('.explanation').forEach(e => e.classList.remove('visible'));
      el.querySelectorAll('.playground-feedback').forEach(e => e.innerHTML = '');
    }
  }
}

// ============================================================
// HINT SYSTEM
// ============================================================
function showHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

// ============================================================
// SENTENCE BUILDER
// ============================================================
function buildSentence() {
  const p1 = document.getElementById('builder-part1').value.trim();
  const conn = document.getElementById('builder-connector').value.toUpperCase();
  const p2 = document.getElementById('builder-part2').value.trim();
  if (!p1 || !p2) { showToast('⚠️ Please fill both parts!'); return; }
  const sentence = `${p1} ${conn} ${p2}.`;
  const output = document.getElementById('builder-output');
  output.textContent = '✨ ' + sentence;
  output.classList.remove('hidden');
  const history = document.getElementById('builder-history');
  const item = document.createElement('div');
  item.className = 'builder-history-item';
  item.textContent = sentence;
  history.prepend(item);
  document.getElementById('builder-part1').value = '';
  document.getElementById('builder-part2').value = '';
}

// ============================================================
// FINAL QUIZ
// ============================================================
function attemptFinalQuiz() {
  const p = getProgress();
  const done = PROGRESS_KEYS.filter(k => k !== 'finalquiz' && p[k]).length;
  if (done < SECTIONS_NEEDED) {
    showToast(`🔒 Complete ${SECTIONS_NEEDED - done} more section(s) to unlock!`);
    return;
  }
  showScreen('screen-finalquiz');
  if (localStorage.getItem('finalQuizSubmitted') === 'true') {
    document.getElementById('final-quiz-locked').classList.remove('hidden');
    document.getElementById('final-quiz-content').classList.add('hidden');
    document.getElementById('final-quiz-results').classList.add('hidden');
    const savedScore = localStorage.getItem('finalQuizScore');
    if (savedScore) {
      document.getElementById('final-quiz-locked-score').innerHTML = `<p>Your score: <strong>${savedScore}</strong></p>`;
    }
  }
}

function buildFinalQuiz() {
  const el = document.getElementById('final-quiz-questions');
  if (!el) return;
  el.innerHTML = '';

  // Group by section type
  const sections = [
    { label: '📖 Section 1: Multiple Choice', type: 'mcq' },
    { label: '✏️ Section 2: Fill in the Blanks', type: 'fillBlank' },
    { label: '📄 Section 3: Reading Comprehension', type: 'reading' },
    { label: '🔀 Section 4: Matching', type: 'matching' },
    { label: '✍️ Section 5: Writing', type: 'writing' }
  ];

  let questionNum = 1;
  sections.forEach(sec => {
    const qs = finalQuizData.filter(q => q.type === sec.type);
    if (!qs.length) return;
    el.innerHTML += `<h3 class="quiz-section-header">${sec.label}</h3>`;
    qs.forEach((q, qi) => {
      const idx = finalQuizData.indexOf(q);
      el.innerHTML += buildFinalQuestion(q, idx, questionNum++);
    });
  });
}

function buildFinalQuestion(q, idx, num) {
  if (q.type === 'mcq') {
    return `<div class="question-item" id="fq-${idx}">
      <div class="question-text"><span class="question-num">${num}</span>${q.question} <small style="color:#94a3b8">[${q.section}]</small></div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => `<li><label class="option-label"><input type="radio" name="fq-${idx}" value="${oi}"> ${opt}</label></li>`).join('')}
      </ul>
    </div>`;
  } else if (q.type === 'fillBlank') {
    return `<div class="question-item" id="fq-${idx}">
      <div class="question-text"><span class="question-num">${num}</span>${q.question} <small style="color:#94a3b8">[${q.section}]</small></div>
      <input type="text" class="fill-input" id="fq-inp-${idx}" placeholder="Your answer..." aria-label="${q.question}">
    </div>`;
  } else if (q.type === 'reading') {
    return `<div class="question-item" id="fq-${idx}">
      <div style="background:var(--blue-light);padding:12px;border-radius:8px;margin-bottom:10px;font-size:0.9rem;line-height:1.7">${q.passage}</div>
      <div class="question-text"><span class="question-num">${num}</span>${q.question} <small style="color:#94a3b8">[${q.section}]</small></div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => `<li><label class="option-label"><input type="radio" name="fq-${idx}" value="${oi}"> ${opt}</label></li>`).join('')}
      </ul>
    </div>`;
  } else if (q.type === 'matching') {
    const shuffledDescs = [...q.pairs].map(p => p.desc).sort(() => Math.random() - 0.5);
    return `<div class="question-item" id="fq-${idx}">
      <div class="question-text"><span class="question-num">${num}</span>${q.question} <small style="color:#94a3b8">[${q.section}]</small></div>
      ${q.pairs.map((p, pi) => `
        <div class="matching-item" style="margin:6px 0" data-correct="${p.desc}">
          <span class="matching-left">${p.item}</span>
          <span class="matching-arrow">→</span>
          <select class="matching-select" id="fq-match-${idx}-${pi}" aria-label="Match for ${p.item}">
            <option value="">Choose...</option>
            ${shuffledDescs.map(d => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>`).join('')}
    </div>`;
  } else if (q.type === 'writing') {
    return `<div class="question-item" id="fq-${idx}">
      <div class="question-text"><span class="question-num">${num}</span>${q.question} <small style="color:#94a3b8">[${q.section}]</small></div>
      <textarea class="playground-textarea" id="fq-write-${idx}" rows="3" placeholder="Write here..." aria-label="${q.question}"></textarea>
    </div>`;
  }
  return '';
}

function submitFinalQuiz() {
  if (localStorage.getItem('finalQuizSubmitted') === 'true') {
    showToast('⚠️ Quiz already submitted!'); return;
  }
  const breakdown = { 'CAN/CAN\'T': {correct:0,total:0}, 'Connectors':{correct:0,total:0}, 'Have To':{correct:0,total:0}, 'Clothes':{correct:0,total:0} };
  let totalCorrect = 0;
  const totalQ = finalQuizData.length;

  finalQuizData.forEach((q, idx) => {
    const sec = q.section;
    if (!breakdown[sec]) breakdown[sec] = {correct:0,total:0};
    breakdown[sec].total++;
    let correct = false;
    if (q.type === 'mcq' || q.type === 'reading') {
      const sel = document.querySelector(`input[name="fq-${idx}"]:checked`);
      correct = sel && parseInt(sel.value) === q.correct;
    } else if (q.type === 'fillBlank') {
      const inp = document.getElementById(`fq-inp-${idx}`);
      correct = inp && inp.value.trim().toLowerCase() === q.answer.toLowerCase();
    } else if (q.type === 'matching') {
      const pairs = document.querySelectorAll(`#fq-${idx} .matching-item`);
      let matchCorrect = 0;
      pairs.forEach(p => {
        const sel = p.querySelector('select');
        if (sel && sel.value === p.dataset.correct) matchCorrect++;
      });
      correct = matchCorrect === q.pairs.length;
    } else if (q.type === 'writing') {
      const ta = document.getElementById(`fq-write-${idx}`);
      const words = (ta ? ta.value.trim() : '').split(/\s+/).filter(Boolean).length;
      correct = words >= q.minWords;
    }
    if (correct) { totalCorrect++; breakdown[sec].correct++; }
  });

  const score = `${totalCorrect}/${totalQ}`;
  const pct = Math.round((totalCorrect/totalQ)*100);
  localStorage.setItem('finalQuizSubmitted', 'true');
  localStorage.setItem('finalQuizScore', score);
  saveProgress('finalquiz');

  // Show results
  document.getElementById('final-quiz-content').classList.add('hidden');
  document.getElementById('final-quiz-results').classList.remove('hidden');
  document.getElementById('final-score-display').innerHTML = `${pct}% (${score})`;
  
  // Breakdown
  const bdEl = document.getElementById('final-breakdown');
  bdEl.innerHTML = '<div class="breakdown-grid">' + Object.entries(breakdown).map(([sec, data]) => `
    <div class="breakdown-item">
      <h5>${sec}</h5>
      <div class="bd-score">${data.correct}/${data.total}</div>
      <div style="font-size:0.8rem;color:#64748b">${Math.round(data.correct/data.total*100)||0}%</div>
    </div>`).join('') + '</div>';

  // Study suggestions
  const suggestions = [];
  Object.entries(breakdown).forEach(([sec, data]) => {
    if (data.total > 0 && data.correct/data.total < 0.7) suggestions.push(`📚 Review <strong>${sec}</strong> — you got ${data.correct}/${data.total}`);
  });
  const suggEl = document.getElementById('study-suggestions');
  if (suggestions.length) {
    suggEl.innerHTML = '<div class="study-suggestions"><h4>💡 Study Suggestions:</h4>' + suggestions.map(s => `<p>${s}</p>`).join('') + '</div>';
  } else {
    suggEl.innerHTML = '<div class="study-suggestions"><h4>🌟 Fantastic work!</h4><p>You did great in all sections!</p></div>';
  }

  // Teacher reset button
  if (teacherModeActive) {
    document.getElementById('teacher-reset-section').classList.remove('hidden');
  }
  showToast('🏆 Final Quiz submitted! Great work!');
}

// ============================================================
// TEACHER MODE
// ============================================================
function submitTeacherLogin() {
  const pw = document.getElementById('teacher-password-input').value;
  const errEl = document.getElementById('teacher-pass-error');
  if (pw === TEACHER_PASSWORD) {
    teacherModeActive = true;
    errEl.classList.add('hidden');
    document.getElementById('teacher-login-form').classList.add('hidden');
    document.getElementById('teacher-panel').classList.remove('hidden');
    document.getElementById('teacher-student-name').textContent = localStorage.getItem('studentName') || '—';
    document.getElementById('teacher-quiz-status').textContent = localStorage.getItem('finalQuizSubmitted') === 'true' ? `Submitted (Score: ${localStorage.getItem('finalQuizScore')})` : 'Not submitted';
  } else {
    errEl.classList.remove('hidden');
    document.getElementById('teacher-password-input').value = '';
    document.getElementById('teacher-password-input').focus();
  }
}

function closeTeacherModal() {
  document.getElementById('teacher-modal').classList.add('hidden');
  document.getElementById('teacher-login-form').classList.remove('hidden');
  document.getElementById('teacher-panel').classList.add('hidden');
  document.getElementById('teacher-password-input').value = '';
  document.getElementById('teacher-pass-error').classList.add('hidden');
}

document.getElementById('teacher-btn').addEventListener('click', () => {
  document.getElementById('teacher-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('teacher-password-input').focus(), 100);
});

function teacherResetName() {
  if (!confirm('Reset student name? This will restart the app. / ¿Resetear el nombre?')) return;
  localStorage.removeItem('studentName');
  closeTeacherModal();
  showScreen('screen-home');
  document.getElementById('progress-container').style.display = 'none';
  showToast('🔄 Student name reset!');
}

function teacherResetQuiz() {
  localStorage.removeItem('finalQuizSubmitted');
  localStorage.removeItem('finalQuizScore');
  const p = getProgress();
  delete p.finalquiz;
  localStorage.setItem('studentProgress', JSON.stringify(p));
  document.getElementById('teacher-quiz-status').textContent = 'Not submitted';
  showToast('🔄 Final quiz reset!');
  buildFinalQuiz();
  document.getElementById('final-quiz-locked').classList.add('hidden');
  document.getElementById('final-quiz-content').classList.remove('hidden');
  document.getElementById('final-quiz-results').classList.add('hidden');
  updateProgressBar();
  updateMenuCards();
}

function teacherResetAll() {
  if (!confirm('Reset ALL progress? / ¿Resetear TODO el progreso?')) return;
  localStorage.removeItem('studentProgress');
  localStorage.removeItem('finalQuizSubmitted');
  localStorage.removeItem('finalQuizScore');
  document.getElementById('teacher-quiz-status').textContent = 'Not submitted';
  updateProgressBar();
  updateMenuCards();
  showToast('⚠️ All progress reset!');
}

function teacherShowAnswers() {
  showAnswers = !showAnswers;
  document.querySelectorAll('.explanation').forEach(e => {
    if (showAnswers) e.classList.add('visible');
    else e.classList.remove('visible');
  });
  showToast(showAnswers ? '👁️ Answers shown!' : '👁️ Answers hidden!');
}

// Close modal on backdrop click
document.getElementById('teacher-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeTeacherModal();
});

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.classList.add('hidden'), 400); }, 3000);
}

// ============================================================
// KEYBOARD NAVIGATION (Enter key support)
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (active && active.id === 'student-name-input') saveName();
    if (active && active.id === 'teacher-password-input') submitTeacherLogin();
  }
  if (e.key === 'Escape') closeTeacherModal();
});

// Auto-init if name exists in localStorage
document.getElementById('student-name-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveName();
});
