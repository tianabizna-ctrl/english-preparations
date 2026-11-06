// British–American English Learner App
// Single-page app with vocabulary reference, fluency conversations, speed drills, and progress tracking.

const App = (function () {
  // --- State ---
  let currentView = 'home';
  let currentFilter = 'all';
  let drillTimer = null;
  let drillTimeLeft = 60;
  let drillScore = 0;
  let drillDirection = 'br-to-am';
  let drillCurrentPair = null;
  let drillPairs = [];

  // Progress stored in localStorage
  const STORAGE_KEY = 'bram_learner_progress';

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultProgress();
    } catch {
      return defaultProgress();
    }
  }

  function defaultProgress() {
    return { vocabSeen: {}, quizCorrect: 0, quizTotal: 0, bestDrill: 0, drillsPlayed: 0 };
  }

  function saveProgress(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  // --- Navigation ---
  function navigate(view, filter) {
    currentView = view;
    if (filter) currentFilter = filter;

    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    if (view === 'vocabulary') renderVocabulary();
    if (view === 'fluency') renderConversations();
    if (view === 'progress') renderProgress();
    if (view === 'drill') resetDrill();
  }

  // --- Vocabulary View ---
  function renderVocabulary() {
    const filtersEl = document.getElementById('vocab-filters');
    const listEl = document.getElementById('vocab-list');
    const categories = ['all', 'spelling', 'vocabulary', 'grammar'];

    filtersEl.innerHTML = categories.map(c =>
      '<button class="filter-tab' + (currentFilter === c ? ' active' : '') + '" onclick="App.setFilter(\'' + c + '\')">' +
      c.charAt(0).toUpperCase() + c.slice(1) + '</button>'
    ).join('');

    const filtered = currentFilter === 'all'
      ? VOCABULARY
      : VOCABULARY.filter(v => v.category === currentFilter);

    listEl.innerHTML = filtered.map(v => {
      const progress = loadProgress();
      const seen = progress.vocabSeen[v.british] || 0;
      const stars = seen >= 3 ? ' ⭐' : '';
      return '<li class="vocab-item" onclick="App.markSeen(\'' + escapeAttr(v.british) + '\')">' +
        '<span class="badge badge-br">BrE</span>' +
        '<span class="vocab-word">' + v.british + '</span>' +
        '<span class="vocab-arrow">→</span>' +
        '<span class="badge badge-am">AmE</span>' +
        '<span class="vocab-word">' + v.american + '</span>' +
        '<span class="vocab-example">' + (currentFilter !== 'grammar' ? v.exampleBr : v.exampleBr) + '</span>' +
        '<span style="font-size:0.75rem;color:#bbb;">' + stars + '</span>' +
        '</li>';
    }).join('');
  }

  function setFilter(f) {
    currentFilter = f;
    renderVocabulary();
  }

  function markSeen(word) {
    const p = loadProgress();
    p.vocabSeen[word] = (p.vocabSeen[word] || 0) + 1;
    saveProgress(p);
    renderVocabulary();
  }

  // --- Fluency / Conversations ---
  function renderConversations() {
    const container = document.getElementById('conversations-container');
    container.innerHTML = CONVERSATIONS.map((conv, ci) => {
      const badgeClass = conv.dialect === 'british' ? 'badge-br' : 'badge-am';
      const badgeLabel = conv.dialect === 'british' ? 'British English' : 'American English';

      const linesHtml = conv.lines.map(l =>
        '<div class="dialogue-line">' +
        '<span class="dialogue-speaker">' + l.speaker + ':</span>' +
        '<span class="dialogue-text">\'' + l.text + '\'</span>' +
        '</div>'
      ).join('');

      const questionsHtml = conv.questions.map((q, qi) =>
        '<div class="quiz-question" id="qq-' + ci + '-' + qi + '">' +
        '<p>' + (qi + 1) + '. ' + q.q + '</p>' +
        '<input type="text" placeholder="Type your answer…" data-ci="' + ci + '" data-qi="' + qi + '" data-answer="' + escapeAttr(q.a) + '" onkeyup="App.checkQuizInput(this)">' +
        '<div class="quiz-feedback"></div>' +
        '</div>'
      ).join('');

      return '<div class="conversation-card">' +
        '<div class="conversation-header">' +
        '<h3>' + conv.title + '</h3>' +
        '<span class="badge ' + badgeClass + '">' + badgeLabel + '</span>' +
        '</div>' +
        '<div class="dialogue-lines">' + linesHtml + '</div>' +
        '<div class="quiz-section">' +
        '<h4>Comprehension Check</h4>' +
        questionsHtml +
        '</div></div>';
    }).join('');
  }

  function checkQuizInput(input) {
    const expected = input.dataset.answer.toLowerCase().trim();
    const given = input.value.toLowerCase().trim();
    const feedback = input.nextElementSibling;
    const p = loadProgress();

    if (given.length < 2) {
      input.className = '';
      feedback.textContent = '';
      return;
    }

    p.quizTotal++;

    if (expected.includes(given) || given.includes(expected) || levenshtein(given, expected) <= 2) {
      input.className = 'correct';
      feedback.textContent = '✓ Well done!';
      feedback.style.color = 'var(--success)';
      p.quizCorrect++;
    } else {
      input.className = 'incorrect';
      feedback.textContent = '✗ Expected: ' + input.dataset.answer;
      feedback.style.color = 'var(--error)';
    }
    saveProgress(p);
  }

  // Simple Levenshtein for fuzzy matching
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  // --- Speed Drill ---
  function startDrill(direction) {
    drillDirection = direction;
    drillScore = 0;
    drillTimeLeft = 60;
    drillPairs = shuffle([...SPEED_PAIRS]);

    document.getElementById('drill-start-screen').style.display = 'none';
    document.getElementById('drill-game-screen').style.display = 'block';
    document.getElementById('drill-end-screen').style.display = 'none';
    document.getElementById('drill-direction-hint').textContent =
      direction === 'br-to-am' ? 'Convert to American English:' : 'Convert to British English:';

    nextDrillWord();
    updateDrillDisplay();

    const input = document.getElementById('drill-input');
    input.focus();
    input.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter') { checkDrill(); }
    });

    drillTimer = setInterval(function () {
      drillTimeLeft--;
      document.getElementById('drill-timer').textContent = drillTimeLeft;
      if (drillTimeLeft <= 0) endDrill();
    }, 1000);
  }

  function nextDrillWord() {
    if (drillPairs.length === 0) drillPairs = shuffle([...SPEED_PAIRS]);
    drillCurrentPair = drillPairs.pop();
    const prompt = drillDirection === 'br-to-am' ? drillCurrentPair.british : drillCurrentPair.american;
    document.getElementById('drill-prompt').textContent = prompt;
    document.getElementById('drill-input').value = '';
    document.getElementById('drill-feedback').textContent = '';
    document.getElementById('drill-input').focus();
  }

  function checkDrill() {
    const input = document.getElementById('drill-input');
    const given = input.value.trim().toLowerCase();
    const expected = drillDirection === 'br-to-am'
      ? drillCurrentPair.american.toLowerCase()
      : drillCurrentPair.british.toLowerCase();
    const feedback = document.getElementById('drill-feedback');

    if (!given) return;

    if (given === expected || levenshtein(given, expected) <= 1) {
      drillScore++;
      feedback.textContent = '✓ Correct!';
      feedback.style.color = 'var(--success)';
    } else {
      feedback.textContent = '✗ ' + expected;
      feedback.style.color = 'var(--error)';
    }

    updateDrillDisplay();
    setTimeout(nextDrillWord, 600);
  }

  function updateDrillDisplay() {
    document.getElementById('drill-score-display').textContent = 'Score: ' + drillScore;
  }

  function endDrill() {
    clearInterval(drillTimer);
    document.getElementById('drill-game-screen').style.display = 'none';
    document.getElementById('drill-end-screen').style.display = 'block';
    document.getElementById('drill-final-score').textContent = drillScore + ' / 60 seconds';

    const p = loadProgress();
    p.drillsPlayed++;
    if (drillScore > p.bestDrill) p.bestDrill = drillScore;
    saveProgress(p);

    const msg = drillScore >= 20 ? 'Brilliant work!' : drillScore >= 10 ? 'Good effort — keep practising!' : 'Keep going — you will improve!';
    document.getElementById('drill-final-msg').textContent = msg;
  }

  function resetDrill() {
    clearInterval(drillTimer);
    document.getElementById('drill-start-screen').style.display = 'block';
    document.getElementById('drill-game-screen').style.display = 'none';
    document.getElementById('drill-end-screen').style.display = 'none';
  }

  // --- Progress ---
  function renderProgress() {
    const p = loadProgress();
    const totalWords = VOCABULARY.length;
    const mastered = Object.values(p.vocabSeen).filter(v => v >= 3).length;
    const pct = totalWords > 0 ? Math.round((mastered / totalWords) * 100) : 0;
    const quizPct = p.quizTotal > 0 ? Math.round((p.quizCorrect / p.quizTotal) * 100) : 0;

    document.getElementById('stat-grid').innerHTML =
      statCard(mastered, 'Words Mastered') +
      statCard(p.quizCorrect + '/' + p.quizTotal, 'Quiz Answers') +
      statCard(p.drillsPlayed, 'Drills Played') +
      statCard(p.bestDrill, 'Best Drill Score');

    document.getElementById('vocab-progress').style.width = pct + '%';
    document.getElementById('vocab-progress-text').textContent = mastered + ' of ' + totalWords + ' words seen 3+ times (' + pct + '%)';

    document.getElementById('quiz-progress').style.width = quizPct + '%';
    document.getElementById('quiz-progress-text').textContent = p.quizCorrect + ' correct out of ' + p.quizTotal + ' attempts (' + quizPct + '%)';

    document.getElementById('best-drill-score').textContent = p.bestDrill + ' words';
  }

  function statCard(num, label) {
    return '<div class="stat-card"><div class="stat-number">' + num + '</div><div class="stat-label">' + label + '</div></div>';
  }

  function clearProgress() {
    if (confirm('Are you sure you want to reset all progress?')) {
      saveProgress(defaultProgress());
      renderProgress();
    }
  }

  // --- Helpers ---
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeAttr(s) {
    return s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // --- Init ---
  function init() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.view));
    });
    navigate('home');
  }

  document.addEventListener('DOMContentLoaded', init);

  // Public API
  return { navigate, setFilter, markSeen, checkQuizInput, startDrill, checkDrill, resetDrill, clearProgress };
})();
