/* ═══════════════════════════════════════════════════════════════════════
   Easy English — Full app logic with TTS, Drills, Conversations
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TTS (Text-To-Speech) via Web Speech API ─────────────────────────
  const tts = {
    synth: window.speechSynthesis,
    sequenceToken: 0,
    baseRate() { return (settings && settings.speechRate) || 0.85; },
    preferredLocale() {
      return settings && settings.voiceAccent === 'american' ? 'en-US' : 'en-GB';
    },
    getVoices() {
      if (!this.synth || !this.synth.getVoices) return [];
      return this.synth.getVoices() || [];
    },
    voiceGenderMatches(voice, gender) {
      if (!gender || gender === 'any') return true;
      var declared = String(voice.gender || '').toLowerCase();
      if (declared.indexOf(gender) >= 0) return true;
      var name = String(voice.name || '').toLowerCase();
      var femaleNames = /female|woman|samantha|karen|victoria|moira|fiona|zira|susan|hazel|ava|siri/;
      var maleNames = /male|man|daniel|alex|arthur|george|david|james|oliver|tom/;
      return gender === 'female' ? femaleNames.test(name) : maleNames.test(name);
    },
    resolveVoice() {
      var voices = this.getVoices();
      if (!voices.length || this.synth.__native) return null;
      var locale = this.preferredLocale();
      var accentVoices = voices.filter(function (voice) {
        return String(voice.lang || '').toLowerCase() === locale.toLowerCase();
      });
      var englishVoices = voices.filter(function (voice) {
        return /^en(?:-|$)/i.test(String(voice.lang || ''));
      });
      var candidates = accentVoices.length ? accentVoices : englishVoices;
      var gender = settings && settings.voiceGender || 'any';
      return candidates.find(function (voice) {
        return tts.voiceGenderMatches(voice, gender);
      }) || candidates[0] || null;
    },
    syncVoicePreference() {
      if (window.AndroidTTS && window.AndroidTTS.setVoicePreference) {
        try {
          window.AndroidTTS.setVoicePreference(settings.voiceAccent || 'british', settings.voiceGender || 'any');
        } catch (_) { /* ignore bridge differences in older installs */ }
      }
    },
    createUtterance(text, rate, pitch) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = this.preferredLocale();
      // `rate` is a multiplier on the learner's chosen speaking speed.
      utter.rate = (typeof rate === 'number' ? rate : 1) * this.baseRate();
      utter.pitch = pitch || 1.0;
      var voice = this.resolveVoice();
      if (voice) utter.voice = voice;
      return utter;
    },
    speak(text, rate, pitch) {
      if (!this.synth) return;
      this.sequenceToken++;
      this.synth.cancel(); // stop any ongoing speech
      this.synth.speak(this.createUtterance(text, rate, pitch));
    },
    speakSequence(texts, rate, gap) {
      var items = (texts || []).filter(function (text) { return String(text || '').trim(); });
      if (!this.synth || !items.length) return;
      this.sequenceToken++;
      var token = this.sequenceToken;
      var pause = typeof gap === 'number' ? gap : 400;
      this.synth.cancel();

      // Android's native engine can queue a real silence between utterances.
      if (this.synth.__native && window.AndroidTTS && window.AndroidTTS.speakSequence && items.length === 2) {
        window.AndroidTTS.speakSequence(items[0], items[1], this.baseRate() * (typeof rate === 'number' ? rate : 1), pause);
        return;
      }
      if (this.synth.__native && window.AndroidTTS && window.AndroidTTS.speakSequenceMany && items.length > 1) {
        window.AndroidTTS.speakSequenceMany(items, this.baseRate() * (typeof rate === 'number' ? rate : 1), pause);
        return;
      }

      var index = 0;
      var speakNext = function () {
        if (token !== tts.sequenceToken || index >= items.length) return;
        var utter = tts.createUtterance(items[index++], rate, 1.0);
        var continueSequence = function () {
          if (token !== tts.sequenceToken) return;
          window.setTimeout(speakNext, pause);
        };
        utter.onend = continueSequence;
        utter.onerror = continueSequence;
        tts.synth.speak(utter);
      };
      speakNext();
    },
    speakPair(first, second, rate) {
      this.speakSequence([first, second], rate, 500);
    },
    speakSlow(text) {
      this.speak(text, 0.7, 1.0);
    },
  };

  // Pre-load voices (they load async in Chrome)
  if (tts.synth) {
    tts.synth.getVoices(); // trigger async load
    if (tts.synth.onvoiceschanged !== undefined) {
      tts.synth.onvoiceschanged = function () {
        tts.synth.getVoices();
        if (typeof syncSettingsUI === 'function') syncSettingsUI();
      };
    }
  }

  // ─── SETTINGS (theme, text size, speech, hints) ─────────────────────
  var SETTINGS_KEY = 'easyEnglishSettings';

  function loadSettings() {
    var defaults = {
      theme: 'system',
      textSize: 'medium',
      speechRate: 0.85,
      voiceAccent: 'british',
      voiceGender: 'any',
      learningLevel: 'beginner',
      malagasyHints: true,
      autoSpeak: false,
      reduceMotion: false,
    };
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return Object.assign(defaults, JSON.parse(raw) || {});
    } catch (_) { /* ignore */ }
    return defaults;
  }

  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
    catch (_) { /* ignore */ }
  }

  var settings = loadSettings();
  tts.syncVoicePreference();

  function prefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function resolveDark() {
    if (settings.theme === 'dark') return true;
    if (settings.theme === 'light') return false;
    return prefersDark();
  }

  function applyTheme() {
    var dark = resolveDark();
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0a1120' : '#0f766e');
    var icon = document.getElementById('themeToggleIcon');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';
  }

  function applyTextSize() {
    document.documentElement.setAttribute('data-textsize', settings.textSize || 'medium');
  }

  function applyPreferences() {
    document.documentElement.setAttribute('data-mg', settings.malagasyHints === false || levelIsEnglishOnly() ? 'off' : 'on');
    document.documentElement.setAttribute('data-level', selectedLevel().id);
    if (settings.reduceMotion) document.documentElement.setAttribute('data-motion', 'reduce');
    else document.documentElement.removeAttribute('data-motion');
  }

  function describeRate(rate) {
    if (rate <= 0.65) return 'Very slow';
    if (rate <= 0.8) return 'Slow';
    if (rate <= 0.95) return 'Normal';
    if (rate <= 1.1) return 'Fast';
    return 'Very fast';
  }

  // ─── STUDY LEVELS ─────────────────────────────────────────────────────
  var STUDY_LEVELS = [
    { id: 'beginner', label: 'Beginner', mg: 'Vao manomboka', rank: 1 },
    { id: 'elementary', label: 'Elementary', mg: 'Fototra', rank: 2 },
    { id: 'pre-intermediate', label: 'Pre-Intermediate', mg: 'Alohan’ny antonony', rank: 3 },
    { id: 'intermediate', label: 'Intermediate', mg: 'Antonony', rank: 4 },
    { id: 'advanced', label: 'Advanced', mg: 'Ambony', rank: 5 },
  ];

  function levelInfo(level) {
    var value = String(level || '').toLowerCase().replace(/\s+/g, '-');
    return STUDY_LEVELS.find(function (item) {
      return item.id === value || item.label.toLowerCase().replace(/\s+/g, '-') === value;
    }) || STUDY_LEVELS[0];
  }

  function selectedLevel() { return levelInfo(settings.learningLevel || 'beginner'); }
  function levelRank(level) { return levelInfo(level).rank; }
  function levelIsEnglishOnly() { return selectedLevel().rank >= 4; }

  function levelFiltered(items, getLevel) {
    var rank = selectedLevel().rank;
    var exact = items.filter(function (item) { return levelRank(getLevel(item)) === rank; });
    if (exact.length) return exact;
    // Never silently show a lower level. Shared essentials such as the
    // alphabet are rendered by their own screens and do not use this helper.
    return [];
  }

  function setLearningLevel(level) {
    var next = levelInfo(level);
    settings.learningLevel = next.id;
    settings.malagasyHints = next.rank < 4;
    saveSettings();
    applyPreferences();
    syncSettingsUI();
    refreshActiveView();
    showToast(next.label + ' study plan selected.', 'success');
  }

  // ─── STATE ────────────────────────────────────────────────────────────
  const state = {
    progress: loadProgress(),
    activeTab: 'today',
    vocabFilter: null,
    vocabSearch: '',
    vocabStatus: 'all',
    classroomGroup: null,
    classroomSearch: '',
    grammarFilter: null,
    grammarId: null,
    convFilter: null,
    lessonCategory: null,
    lessonFocus: false,
    readingId: null,
    convId: null,
    writingId: null,
    speakingId: null,
    listeningId: null,
    alphabetSection: 'alphabet',
    drillType: 'fillGap',
    drillRenderedType: null,
    drillQueue: [],
    drillScore: 0,
    drillCorrect: 0,
    drillIndex: 0,
    drillAnswered: false,
    devDay: null,
    devMonth: null,
  };

  // ─── LOCAL STORAGE ────────────────────────────────────────────────────
  function loadProgress() {
    try {
      var raw = localStorage.getItem('easyEnglishProgress');
      if (raw) {
        var saved = JSON.parse(raw);
        return Object.assign({
          learned: {}, stars: 0, streak: 0, lastDate: null,
          activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {}, saved: {}, malagasyCorrections: {},
          classroom: {}, devotional: { days: {}, words: {} }, days: {},
        }, saved, {
          learned: saved.learned || {},
          activities: saved.activities || {},
          writingDrafts: saved.writingDrafts || {},
          lessons: saved.lessons || {},
          needsPractice: saved.needsPractice || {},
          saved: saved.saved || {},
          malagasyCorrections: saved.malagasyCorrections || {},
          textCorrections: saved.textCorrections || {},
          classroom: saved.classroom || {},
          devotional: normalizeDevotional(saved.devotional),
          days: saved.days || {},
        });
      }
    } catch (_) { /* ignore */ }
    return { learned: {}, stars: 0, streak: 0, lastDate: null, activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {}, saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {}, devotional: { days: {}, words: {} }, days: {} };
  }

  function normalizeDevotional(saved) {
    saved = saved || {};
    return {
      days: saved.days || {},
      words: saved.words || {},
    };
  }

  function saveProgress() {
    try { localStorage.setItem('easyEnglishProgress', JSON.stringify(state.progress)); }
    catch (_) { /* ignore */ }
  }

  function getVocabMalagasy(word) {
    if (!word) return '';
    var corrections = state.progress.malagasyCorrections || {};
    var curriculumCorrections = state.progress.textCorrections || {};
    return corrections[word.id] || curriculumCorrections['curriculum-word:' + word.id] || word.malagasy || '';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getTextMalagasy(id, original) {
    var corrections = state.progress.textCorrections || {};
    return corrections[id] || original || '';
  }

  // Every non-vocabulary translation uses the same local correction control.
  // Corrections stay on this device and do not alter the bundled lesson data.
  function correctableMalagasy(id, original, label, english) {
    return '<span class="mg-correctable"><span class="mg-corrected-text">' + escapeHtml(getTextMalagasy(id, original)) + '</span>' +
      '<button class="mg-edit-btn" type="button" data-correction-id="' + escapeHtml(id) + '" data-original="' + escapeHtml(original) + '" data-english="' + escapeHtml(english || '') + '" data-correction-label="' + escapeHtml(label || 'Malagasy translation') + '" aria-label="Correct Malagasy translation">✏️</button></span>';
  }

  function renderGlobalCourseBar() {
    var bar = $('courseBar');
    if (!bar) return;
    var info = typeof COURSE_LEVELS !== 'undefined' ? COURSE_LEVELS.find(function (level) { return level.id === selectedLevel().id; }) : null;
    var lessons = getCurrentCurriculumLessons();
    var courseProgress = getCourseProgress(lessons);
    var total = lessons.length || 1;
    var title = $('courseBarTitle');
    var stage = $('courseBarStage');
    var progress = $('courseBarProgress');
    var fill = $('courseBarTrackFill');
    if (title) title.textContent = info ? info.label : selectedLevel().label;
    if (stage) stage.textContent = info ? info.stage : 'Choose a level to begin';
    if (progress) progress.textContent = courseProgress.completed + ' / ' + lessons.length + ' units · Unit ' + (lessons.length ? courseProgress.currentIndex + 1 : 0);
    if (fill) fill.style.width = courseProgress.percent + '%';
    renderChoicePicker($('globalLevelPicker'), 'Course level', STUDY_LEVELS.map(function (level) {
      return { value: level.id, label: level.label + (level.mg && level.rank < 4 ? ' · ' + level.mg : ''), meta: (typeof COURSE_LEVELS !== 'undefined' && COURSE_LEVELS.find(function (item) { return item.id === level.id; }) || {}).stage || '' };
    }), selectedLevel().id, function (value) { setLearningLevel(value); });
    var mapButton = $('courseBarMapBtn');
    if (mapButton) mapButton.onclick = function () { state.lessonFocus = false; switchTab('syllabus'); };
  }

  function refreshActiveView() {
    renderGlobalCourseBar();
    if (state.activeTab === 'today') renderToday();
    else if (state.activeTab === 'syllabus') renderSyllabus();
    else if (state.activeTab === 'vocabulary') renderVocabulary();
    else if (state.activeTab === 'alphabet') renderAlphabet();
    else if (state.activeTab === 'classroom') renderClassroom();
    else if (state.activeTab === 'grammar') renderGrammar();
    else if (state.activeTab === 'reading') renderReading();
    else if (state.activeTab === 'conversations') renderConversations();
    else if (state.activeTab === 'writing') renderWriting();
    else if (state.activeTab === 'listening') renderListening();
    else if (state.activeTab === 'speaking') renderSpeaking();
    else if (state.activeTab === 'devotional') renderDevotional();
    else if (state.activeTab === 'irregular-verbs') renderIrregularVerbs();
  }

  function getSavedCount() {
    return Object.keys(state.progress.saved || {}).length;
  }

  function findCurriculumWord(wordId) {
    var lessons = typeof COURSE_LESSONS !== 'undefined' ? COURSE_LESSONS : (typeof CURRICULUM_LESSONS !== 'undefined' ? CURRICULUM_LESSONS : []);
    for (var i = 0; i < lessons.length; i++) {
      var found = (lessons[i].words || []).find(function (word) { return word.id === wordId; });
      if (found) return found;
    }
    return null;
  }

  function toggleSaved(wordId) {
    if (!state.progress.saved) state.progress.saved = {};
    if (state.progress.saved[wordId]) delete state.progress.saved[wordId];
    else state.progress.saved[wordId] = true;
    saveProgress();
    updateStatsUI();
    return !!state.progress.saved[wordId];
  }

  function updateStreak() {
    function localDate(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }
    var today = localDate(new Date());
    if (state.progress.lastDate === today) return;
    var yesterday = localDate(new Date(Date.now() - 86400000));
    if (state.progress.lastDate === null || state.progress.lastDate === yesterday) {
      state.progress.streak = (state.progress.streak || 0) + 1;
    } else {
      state.progress.streak = 1;
    }
    state.progress.lastDate = today;
    saveProgress();
  }

  function markLearned(wordId) {
    if (!state.progress.learned[wordId]) {
      state.progress.learned[wordId] = true;
      delete state.progress.needsPractice[wordId];
      state.progress.stars = (state.progress.stars || 0) + 2;
      updateStreak();
      recordDay();
      saveProgress();
      updateStatsUI();
      if (settings.autoSpeak) {
        var learnedWord = VOCABULARY.find(function (v) { return v.id === wordId; }) || findCurriculumWord(wordId);
        if (learnedWord) tts.speak(learnedWord.word);
      }
      return true;
    }
    return false;
  }

  function markNeedsPractice(wordId) {
    if (!state.progress.needsPractice[wordId]) {
      state.progress.needsPractice[wordId] = true;
      saveProgress();
    }
  }

  function markClassroomLearned(phraseId) {
    if (!state.progress.classroom[phraseId]) {
      state.progress.classroom[phraseId] = true;
      state.progress.stars = (state.progress.stars || 0) + 2;
      updateStreak();
      recordDay();
      saveProgress();
      updateStatsUI();
      return true;
    }
    return false;
  }

  function markActivity(activityId) {
    if (!state.progress.activities[activityId]) {
      state.progress.activities[activityId] = true;
      state.progress.stars = (state.progress.stars || 0) + 1;
      updateStreak();
      recordDay();
      saveProgress();
      updateStatsUI();
    }
  }

  function getCompletedActivityCount() {
    return Object.keys(state.progress.activities || {}).length;
  }

  function getLearnedCount() {
    return Object.keys(state.progress.learned).length;
  }

  function getLearnedForCategory(category) {
    return VOCABULARY.filter(function (v) { return v.category === category && state.progress.learned[v.id]; }).length;
  }

  function getTotalForCategory(category) {
    return VOCABULARY.filter(function (v) { return v.category === category; }).length;
  }

  // ─── DOM REFS ─────────────────────────────────────────────────────────
  var $ = function (id) { return document.getElementById(id); };
  var starCount = $('starCount');
  var streakCount = $('streakCount');
  var speakingRecognition = null;

  // ─── TOAST ────────────────────────────────────────────────────────────
  var toastTimer = null;
  var toast = $('toast');

  function showToast(msg, type) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.className = 'toast';
    if (type) toast.classList.add(type);
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }

  function closeVocabCorrection() {
    var overlay = document.getElementById('vocabCorrectionOverlay');
    if (overlay) overlay.remove();
  }

  function closeTextCorrection() {
    var overlay = document.getElementById('textCorrectionOverlay');
    if (overlay) overlay.remove();
  }

  function openTextCorrection(id, original, label, english) {
    closeTextCorrection();
    var corrections = state.progress.textCorrections || {};
    var current = getTextMalagasy(id, original);
    var hasCorrection = !!corrections[id];
    var overlay = document.createElement('div');
    overlay.className = 'quiz-overlay correction-overlay';
    overlay.id = 'textCorrectionOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'textCorrectionTitle');
    overlay.innerHTML = '<div class="quiz-modal correction-modal">' +
      '<div class="correction-kicker">Correct this Malagasy translation</div>' +
      '<h2 id="textCorrectionTitle">' + escapeHtml(label || 'Lesson sentence') + '</h2>' +
      '<p class="correction-source"><strong>English:</strong> ' + escapeHtml(english || label || id) + '</p>' +
      '<p class="correction-hint">Your correction is saved only on this device and will appear wherever this sentence is shown.</p>' +
      '<label class="correction-label" for="textCorrectionInput">Malagasy translation</label>' +
      '<textarea id="textCorrectionInput" class="correction-input" rows="4" maxlength="300"></textarea>' +
      '<div class="correction-actions">' +
        '<button class="btn btn-ghost" id="cancelTextCorrection">Cancel</button>' +
        (hasCorrection ? '<button class="btn btn-outline" id="restoreTextCorrection">Restore original</button>' : '') +
        '<button class="btn btn-primary" id="saveTextCorrection">Save correction</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    var input = document.getElementById('textCorrectionInput');
    input.value = current;
    input.focus();
    input.select();
    document.getElementById('cancelTextCorrection').addEventListener('click', closeTextCorrection);
    document.getElementById('saveTextCorrection').addEventListener('click', function () {
      var value = input.value.trim();
      if (!value) {
        input.focus();
        showToast('Write a Malagasy translation first.', 'error');
        return;
      }
      if (!state.progress.textCorrections) state.progress.textCorrections = {};
      state.progress.textCorrections[id] = value;
      saveProgress();
      closeTextCorrection();
      showToast('Malagasy translation corrected.', 'success');
      refreshActiveView();
    });
    var restore = document.getElementById('restoreTextCorrection');
    if (restore) restore.addEventListener('click', function () {
      delete state.progress.textCorrections[id];
      saveProgress();
      closeTextCorrection();
      showToast('Original translation restored.');
      refreshActiveView();
    });
  }

  function openVocabCorrection(word) {
    closeVocabCorrection();
    var current = getVocabMalagasy(word);
    var hasCorrection = !!(state.progress.malagasyCorrections && state.progress.malagasyCorrections[word.id]);
    var overlay = document.createElement('div');
    overlay.className = 'quiz-overlay correction-overlay';
    overlay.id = 'vocabCorrectionOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'vocabCorrectionTitle');
    overlay.innerHTML = '<div class="quiz-modal correction-modal">' +
      '<div class="correction-kicker">Help improve the Malagasy meaning</div>' +
      '<h2 id="vocabCorrectionTitle">' + escapeHtml(word.word) + '</h2>' +
      '<p class="correction-hint">Write the Malagasy meaning you prefer. This correction is saved only on this device.</p>' +
      '<label class="correction-label" for="malagasyCorrectionInput">Malagasy meaning</label>' +
      '<textarea id="malagasyCorrectionInput" class="correction-input" rows="3" maxlength="160"></textarea>' +
      '<div class="correction-actions">' +
        '<button class="btn btn-ghost" id="cancelVocabCorrection">Cancel</button>' +
        (hasCorrection ? '<button class="btn btn-outline" id="restoreVocabCorrection">Restore original</button>' : '') +
        '<button class="btn btn-primary" id="saveVocabCorrection">Save correction</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    var input = document.getElementById('malagasyCorrectionInput');
    input.value = current;
    input.focus();
    input.select();
    document.getElementById('cancelVocabCorrection').addEventListener('click', closeVocabCorrection);
    document.getElementById('saveVocabCorrection').addEventListener('click', function () {
      var value = input.value.trim();
      if (!value) {
        input.focus();
        showToast('Write a Malagasy meaning first.', 'error');
        return;
      }
      if (!state.progress.malagasyCorrections) state.progress.malagasyCorrections = {};
      state.progress.malagasyCorrections[word.id] = value;
      saveProgress();
      closeVocabCorrection();
      showToast('Malagasy meaning updated for "' + word.word + '".', 'success');
      if (state.activeTab === 'vocabulary') renderVocabulary();
      if (state.activeTab === 'today') renderToday();
      if (state.activeTab === 'alphabet') renderAlphabet();
    });
    var restore = document.getElementById('restoreVocabCorrection');
    if (restore) restore.addEventListener('click', function () {
      delete state.progress.malagasyCorrections[word.id];
      saveProgress();
      closeVocabCorrection();
      showToast('Original Malagasy meaning restored.');
      if (state.activeTab === 'vocabulary') renderVocabulary();
      if (state.activeTab === 'today') renderToday();
      if (state.activeTab === 'alphabet') renderAlphabet();
    });
  }

  // ─── UPDATE UI ────────────────────────────────────────────────────────
  function updateStatsUI() {
    starCount.textContent = state.progress.stars;
    streakCount.textContent = state.progress.streak;
    var savedCount = document.getElementById('savedCount');
    if (savedCount) savedCount.textContent = getSavedCount();
  }

  // ─── GUIDED DAILY LESSON ─────────────────────────────────────────────
  // Keep the first learning path small and predictable for beginners.
  var DAILY_LESSONS = [
    { category: 'Greetings', label: 'Greetings', mg: 'Fiarahabana', goal: 'Say hello and be polite.' },
    { category: 'Family', label: 'Family', mg: 'Ankohonana', goal: 'Talk about the people at home.' },
    { category: 'Numbers', label: 'Numbers', mg: 'Isa', goal: 'Count from one to ten.' },
    { category: 'Colours', label: 'Colours', mg: 'Loko', goal: 'Name colours around you.' },
    { category: 'Animals', label: 'Animals', mg: 'Biby', goal: 'Name familiar animals.' },
    { category: 'Food & Drink', label: 'Food & drink', mg: 'Sakafo sy fisotro', goal: 'Talk about food and drinks.' },
    { category: 'School', label: 'School', mg: 'Sekoly', goal: 'Use useful classroom words.' },
    { category: 'Classroom Life', label: 'Classroom life', mg: 'Fiainana an-tsekoly', goal: 'Talk about your day at school.' },
    { category: 'Village Life', label: 'Village life', mg: 'Fiainana an-tanàna', goal: 'Talk about the village and the farm.' },
    { category: 'Body', label: 'Body', mg: 'Vatana', goal: 'Name parts of the body.' },
    { category: 'Daily Routine', label: 'Daily routine', mg: 'Fahazarana isanandro', goal: 'Describe your day.' },
  ];

  // Short, high-value language support for primary-school learners.
  var PRIMARY_TOOLKIT = [
    {
      icon: '🙋', title: 'Ask your teacher', mg: 'Anontanio ny mpampianatra',
      items: [
        ['Excuse me, teacher.', 'Azafady, tompoko.'],
        ['I do not understand.', 'Tsy azoko.'],
        ['Can you repeat, please?', 'Azafady, avereno azafady.'],
      ],
    },
    {
      icon: '🧱', title: 'Build a sentence', mg: 'Manamboara fehezanteny',
      items: [
        ['My name is …', '… no anarako.'],
        ['I am … years old.', '… taona aho.'],
        ['I like …', 'Tiako ny …'],
      ],
    },
    {
      icon: '⏱️', title: 'A 5-minute study plan', mg: 'Drafitra fianarana 5 minitra',
      items: [
        ['1 minute: listen to 3 words.', 'Mihainoa teny 3.'],
        ['2 minutes: say each word aloud.', 'Lazao mafy ny teny tsirairay.'],
        ['2 minutes: write one sentence.', 'Manorata fehezanteny iray.'],
      ],
    },
  ];

  var LEVEL_TOOLKITS = {
    beginner: PRIMARY_TOOLKIT,
    elementary: [
      { icon: '🙋', title: 'Ask for help', mg: 'Mangataha fanampiana', items: [['Could you repeat that, please?', 'Afaka averinao ve izany, azafady?'], ['I am not sure.', 'Tsy azoko antoka.'], ['Can you show me an example?', 'Afaka mampiseho ohatra ve ianao?']] },
      { icon: '💬', title: 'Build a clear answer', mg: 'Manorata valiny mazava', items: [['I think … because …', 'Heveriko fa … satria …'], ['First … Then … Finally …', 'Voalohany … Avy eo … Farany …'], ['I agree with you.', 'Manaiky anao aho.']] },
      { icon: '⏱️', title: 'A 10-minute study plan', mg: 'Drafitra fianarana 10 minitra', items: [['3 minutes: read a short text.', '3 minitra: mamakia lahatsoratra fohy.'], ['4 minutes: write five sentences.', '4 minitra: manorata fehezanteny dimy.'], ['3 minutes: read your sentences aloud.', '3 minitra: vakio mafy ny fehezanteninao.']] },
    ],
    'pre-intermediate': [
      { icon: '💡', title: 'Explain your opinion', mg: 'Hazavao ny hevitrao', items: [['In my opinion, …', 'Araka ny hevitro, …'], ['The main reason is …', 'Ny antony lehibe dia …'], ['However, we should also consider …', 'Na izany aza, tokony hodinihintsika koa ny …']] },
      { icon: '📖', title: 'Tell a better story', mg: 'Mitantara tsara kokoa', items: [['At first, …', 'Tamin’ny voalohany, …'], ['While this was happening, …', 'Raha nitranga izany, …'], ['Eventually, …', 'Tamin’ny farany, …']] },
      { icon: '🧭', title: 'Study independently', mg: 'Mianara tsy miankina', items: [['Look up the word in a dictionary.', 'Tadiavo ao amin’ny rakibolana ilay teny.'], ['Underline the main idea.', 'Tsipiho ny hevi-dehibe.'], ['Summarise the text in your own words.', 'Fintino amin’ny teninao ilay lahatsoratra.']] },
    ],
    intermediate: [
      { icon: '🎓', title: 'Seminar language', mg: '', items: [['Could you clarify the last point?', ''], ['I would like to build on that idea.', ''], ['I am not entirely convinced because …', '']] },
      { icon: '🔎', title: 'Use evidence', mg: '', items: [['The evidence suggests that …', ''], ['This example supports the claim because …', ''], ['A different perspective would be …', '']] },
      { icon: '✍️', title: 'Improve your writing', mg: '', items: [['Use a clear topic sentence.', ''], ['Link ideas with however and therefore.', ''], ['Proofread before you submit your work.', '']] },
    ],
    advanced: [
      { icon: '⚖️', title: 'Academic argument', mg: '', items: [['May I challenge that assumption?', ''], ['A counterargument would be that …', ''], ['On balance, the evidence indicates …', '']] },
      { icon: '💼', title: 'Professional English', mg: '', items: [['Could we return to the central question?', ''], ['I would recommend proceeding with caution.', ''], ['Let me summarise the action points.', '']] },
      { icon: '🧠', title: 'Critical thinking', mg: '', items: [['The author appears to imply that …', ''], ['This interpretation overlooks …', ''], ['The conclusion does not necessarily follow from the evidence.', '']] },
    ],
  };

  var SPEAKING_PROMPTS = [
    { id: 'speak-1', category: 'Greetings', target: 'Hello, how are you?', mg: 'Salama, manao ahoana ianao?', tip: 'Say hello with a friendly voice.' },
    { id: 'speak-2', category: 'Greetings', target: 'Thank you very much.', mg: 'Misaotra indrindra.', tip: 'Remember the /th/ sound in thank.' },
    { id: 'speak-3', category: 'Family', target: 'This is my mother.', mg: 'Ity no reniko.', tip: 'Speak clearly: this is my…' },
    { id: 'speak-4', category: 'School', target: 'I go to school every day.', mg: 'Mandeha any an-tsekoly isanandro aho.', tip: 'Join the words go-to-school.' },
    { id: 'speak-5', category: 'Food & Drink', target: 'I eat rice every day.', mg: 'Mihinana vary isanandro aho.', tip: 'Make the final sound in eat clear.' },
    { id: 'speak-6', category: 'Colours', target: 'The sky is blue.', mg: 'Manga ny lanitra.', tip: 'Keep the sentence short and steady.' },
    { id: 'speak-7', category: 'Daily Routine', target: 'I wake up at six o\'clock.', mg: 'Mifoha amin\'ny enina ora aho.', tip: 'Listen to the rhythm before speaking.' },
    { id: 'speak-8', category: 'Daily Routine', target: 'I do my homework after school.', mg: 'Manao devoara aho rehefa avy mianatra.', tip: 'Say homework as one word.' },
    { id: 'speak-9', category: 'Classroom Life', target: 'May I go to the toilet, please?', mg: 'Azafady, afaka mivoaka ve aho?', tip: 'Say "please" at the end to be polite.' },
    { id: 'speak-10', category: 'Classroom Life', target: 'I do not understand. Can you repeat, please?', mg: 'Tsy azoko. Azafady, mba avereno kely?', tip: 'Pause after "I do not understand".' },
    { id: 'speak-11', category: 'Classroom Life', target: 'The English lesson is fun.', mg: 'Mahafinaritra ny lesona anglisy.', tip: 'Stress the word "fun".' },
    { id: 'speak-12', category: 'Classroom Life', target: 'We write in our exercise book.', mg: 'Manoratra ao amin\'ny kahintsika isika.', tip: 'Link write-in smoothly.' },
    { id: 'speak-13', category: 'Village Life', target: 'I live in a small village.', mg: 'Mipetraka ao amin\'ny tanàna kely aho.', tip: 'Keep the sentence calm and clear.' },
    { id: 'speak-14', category: 'Village Life', target: 'My father is a farmer.', mg: 'Tantsaha i Dada.', tip: 'Stress the word farmer.' },
    { id: 'speak-15', category: 'Village Life', target: 'We help each other in our village.', mg: 'Mifanampy izahay ao amin\'ny tanànantsika.', tip: 'Pause after "each other".' },
    { id: 'speak-16', category: 'Family', target: 'My family eats together every evening.', mg: 'Miara-misakafo isan-kariva ny fianakavianay.', tip: 'Say "every evening" as one smooth phrase.' },
    { id: 'speak-17', level: 'Intermediate', category: 'Ideas', target: 'I agree with you, but I have another suggestion.', mg: '', tip: 'Use a clear pause before “but”.' },
    { id: 'speak-18', level: 'Advanced', category: 'Presentation', target: 'The evidence suggests that this solution could help the community.', mg: '', tip: 'Stress evidence, solution and community.' },
    { id: 'speak-19', level: 'Intermediate', category: 'Study', target: 'Could you clarify the last point, please?', mg: '', tip: 'Use a polite rising tone at the end.' },
    { id: 'speak-20', level: 'Intermediate', category: 'Discussion', target: 'Although the plan is difficult, it is still possible.', mg: '', tip: 'Stress although, difficult and possible.' },
    { id: 'speak-21', level: 'Intermediate', category: 'Presentation', target: 'The main reason is that everyone needs reliable information.', mg: '', tip: 'Pause after the main reason.' },
    { id: 'speak-22', level: 'Advanced', category: 'Formal English', target: 'Nevertheless, the available evidence remains limited.', mg: '', tip: 'Keep nevertheless as one clear rhythm group.' },
    { id: 'speak-23', level: 'Advanced', category: 'Argument', target: 'Had it not been for their cooperation, the project would have failed.', mg: '', tip: 'Practise the inversion slowly first.' },
    { id: 'speak-24', level: 'Advanced', category: 'Professional English', target: 'We should evaluate the proposal before implementing it.', mg: '', tip: 'Link evaluate-the naturally.' },
    { id: 'speak-25', level: 'Advanced', category: 'Critical thinking', target: 'The conclusion does not necessarily follow from the evidence.', mg: '', tip: 'Stress necessarily and evidence.' },
    { id: 'speak-26', level: 'beginner', category: 'Introductions', target: 'My name is Lova and I am from Madagascar.', mg: 'Lova no anarako ary avy any Madagasikara aho.', tip: 'Stress your name and country.' },
    { id: 'speak-27', level: 'beginner', category: 'Classroom', target: 'Please open your book and listen.', mg: 'Azafady, sokafy ny bokinao ary mihainoa.', tip: 'Use a polite voice for the instruction.' },
    { id: 'speak-28', level: 'beginner', category: 'Routine', target: 'I usually walk to school with my sister.', mg: 'Matetika aho mandeha an-tongotra any an-tsekoly miaraka amin’ny rahavaviko.', tip: 'Keep usually before the main verb.' },
    { id: 'speak-29', level: 'beginner', category: 'Requests', target: 'Could I have some water, please?', mg: 'Afaka mahazo rano ve aho, azafady?', tip: 'Rise gently at the end of the question.' },
    { id: 'speak-30', level: 'beginner', category: 'Description', target: 'There are three books on the small table.', mg: 'Misy boky telo eo ambonin’ny latabatra kely.', tip: 'Make three books plural and clear.' },
    { id: 'speak-31', level: 'elementary', category: 'Past events', target: 'Yesterday, we went to the market and bought fruit.', mg: 'Omaly, nandeha tany an-tsena izahay ary nividy voankazo.', tip: 'Make went and bought distinct.' },
    { id: 'speak-32', level: 'elementary', category: 'Directions', target: 'Go straight, turn left, and cross the bridge.', mg: 'Mandehana mahitsy, mivilia miankavia, ary miampita ny tetezana.', tip: 'Pause after each direction.' },
    { id: 'speak-33', level: 'elementary', category: 'Advice', target: 'You should rest because you have a headache.', mg: 'Tokony hiala sasatra ianao satria marary andoha.', tip: 'Stress should and because.' },
    { id: 'speak-34', level: 'elementary', category: 'Plans', target: 'We are meeting at three, so please arrive early.', mg: 'Hihaona amin’ny telo isika, ka tongava aloha azafady.', tip: 'Use so to connect the reason and result.' },
    { id: 'speak-35', level: 'elementary', category: 'Story', target: 'Suddenly, the rain stopped and the children went outside.', mg: 'Tampoka teo, nitsahatra ny orana ary nivoaka ny ankizy.', tip: 'Change your intonation at suddenly.' },
    { id: 'speak-36', level: 'pre-intermediate', category: 'Experience', target: 'I have never travelled by plane, but I would like to try.', mg: 'Tsy mbola nandeha fiaramanidina aho, saingy te hanandrana.', tip: 'Connect the two ideas smoothly.' },
    { id: 'speak-37', level: 'pre-intermediate', category: 'Explanation', target: 'The river is polluted because people leave waste near it.', mg: 'Maloto ny renirano satria mamela fako eo akaikiny ny olona.', tip: 'Stress the cause and the result.' },
    { id: 'speak-38', level: 'pre-intermediate', category: 'Discussion', target: 'In my opinion, the plan is useful, although it needs more time.', mg: 'Araka ny hevitro dia ilaina ilay drafitra, na dia mila fotoana bebe kokoa aza.', tip: 'Pause before although.' },
    { id: 'speak-39', level: 'pre-intermediate', category: 'Summary', target: 'The article explains how farmers protect the rice crop.', mg: '', tip: 'Stress explains and protect.' },
    { id: 'speak-40', level: 'pre-intermediate', category: 'Presentation', target: 'First I will describe the problem, and then I will suggest a solution.', mg: '', tip: 'Use clear signposting.' },
    { id: 'speak-41', level: 'intermediate', category: 'Clarification', target: 'Could you clarify which evidence supports that conclusion?', mg: '', tip: 'Use a polite rising tone on the request.' },
    { id: 'speak-42', level: 'intermediate', category: 'Comparison', target: 'Whereas the first source is brief, the second provides more detail.', mg: '', tip: 'Stress whereas and more detail.' },
    { id: 'speak-43', level: 'intermediate', category: 'Formal English', target: 'The proposal should be reviewed before it is implemented.', mg: '', tip: 'Keep the passive forms distinct.' },
    { id: 'speak-44', level: 'intermediate', category: 'Debate', target: 'I understand your point; nevertheless, the evidence is limited.', mg: '', tip: 'Acknowledge before you challenge.' },
    { id: 'speak-45', level: 'intermediate', category: 'Presentation', target: 'To begin, I will outline three reasons for this recommendation.', mg: '', tip: 'Pause after To begin.' },
    { id: 'speak-46', level: 'advanced', category: 'Negotiation', target: 'Provided that the timeline is adjusted, the proposal may be feasible.', mg: '', tip: 'Stress provided that and feasible.' },
    { id: 'speak-47', level: 'advanced', category: 'Critical reading', target: 'The writer appears to imply that the policy is not sustainable.', mg: '', tip: 'Use cautious stress on appears and imply.' },
    { id: 'speak-48', level: 'advanced', category: 'Argument', target: 'Had it not been for the evidence, the conclusion would be unconvincing.', mg: '', tip: 'Practise the inversion slowly, then link it.' },
    { id: 'speak-49', level: 'advanced', category: 'Professional English', target: 'I appreciate your concern; however, we need a more practical approach.', mg: '', tip: 'Keep the disagreement diplomatic.' },
    { id: 'speak-50', level: 'advanced', category: 'Presentation', target: 'The central question is not whether change is possible, but how it should be managed.', mg: '', tip: 'Balance the two halves of the sentence.' },
  ];

  function getCurrentCurriculumLessons() {
    if (typeof COURSE_LESSONS === 'undefined' && typeof CURRICULUM_LESSONS === 'undefined') return DAILY_LESSONS;
    var level = selectedLevel().id;
    var lessons = typeof COURSE_LESSONS !== 'undefined' ? COURSE_LESSONS : CURRICULUM_LESSONS;
    return lessons.filter(function (lesson) { return lesson.level === level; });
  }

  function getRecommendedLesson() {
    var available = getCurrentCurriculumLessons();
    if (!available.length) available = DAILY_LESSONS;
    var next = available.find(function (lesson) {
      return !state.progress.lessons[lesson.id || lesson.category];
    });
    if (next) return next;
    return available[(new Date().getDate() - 1) % available.length];
  }

  function getCourseProgress(lessons) {
    lessons = lessons || getCurrentCurriculumLessons();
    var completed = lessons.filter(function (lesson) { return !!state.progress.lessons[lesson.id]; }).length;
    var currentIndex = lessons.findIndex(function (lesson) { return !state.progress.lessons[lesson.id]; });
    if (currentIndex < 0) currentIndex = lessons.length ? lessons.length - 1 : 0;
    var current = lessons[currentIndex] || null;
    var words = current ? (current.words || []) : [];
    var wordsLearned = words.filter(function (word) { return !!state.progress.learned[word.id]; }).length;
    return {
      completed: completed,
      total: lessons.length,
      currentIndex: currentIndex,
      current: current,
      wordsLearned: wordsLearned,
      wordTotal: words.length,
      percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
      wordPercent: words.length ? Math.round((wordsLearned / words.length) * 100) : 0,
    };
  }

  function renderCoursePlan(lesson) {
    if (!lesson || !lesson.outcomes) return '';
    var skillCards = [
      { icon: '📖', title: 'Read', text: lesson.reading },
      { icon: '✍️', title: 'Write', text: lesson.writing },
      { icon: '🗣️', title: 'Speak', text: lesson.speaking },
      { icon: '🎧', title: 'Listen', text: lesson.listening },
      { icon: '🔤', title: 'Spelling & language', text: lesson.spelling },
    ];
    return '<section class="course-plan" aria-labelledby="coursePlanTitle">' +
      '<div class="course-plan-header"><div><span class="eyebrow">Complete lesson plan</span><h4 id="coursePlanTitle">Learn · practise · show what you know</h4></div>' +
        (lesson.sourceFocus ? '<span class="course-source-badge">Curriculum aligned</span>' : '') + '</div>' +
      '<div class="course-outcomes"><strong>By the end of this lesson, you can:</strong><ul>' +
        lesson.outcomes.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="course-skills">' + skillCards.map(function (card) {
        return '<article class="course-skill"><span class="course-skill-icon" aria-hidden="true">' + card.icon + '</span><div><h5>' + card.title + '</h5><p>' + escapeHtml(card.text || '') + '</p></div></article>';
      }).join('') + '</div>' +
      '<div class="course-review"><div><strong>Review check</strong><p>' + escapeHtml(lesson.review || '') + '</p></div>' +
        '<div><strong>Lesson route</strong><ol>' + lesson.lessonFlow.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('') + '</ol></div></div>' +
      (lesson.sourceFocus ? '<p class="course-source-note"><strong>Source focus:</strong> ' + escapeHtml(lesson.sourceFocus) + '</p>' : '') +
    '</section>';
  }

  function renderToday() {
    var picker = $('lessonPicker');
    var content = $('todayContent');
    if (!picker || !content) return;

    var availableDailyLessons = getCurrentCurriculumLessons();
    if (!availableDailyLessons.length) availableDailyLessons = DAILY_LESSONS;
    var focusedLesson = !!state.lessonFocus;
    document.body.classList.toggle('focused-lesson-active', focusedLesson);
    var todayView = $('view-today');
    if (todayView) todayView.classList.toggle('focused-mode', focusedLesson);
    var viewTitle = $('viewTitle');
    var viewSub = $('viewSub');
    if (focusedLesson) {
      if (viewTitle) viewTitle.textContent = 'Lesson';
      if (viewSub) viewSub.textContent = selectedLevel().label;
    } else {
      if (viewTitle) viewTitle.textContent = 'Practice';
      if (viewSub) viewSub.textContent = 'Fampiofanana';
    }
    var recommended = getRecommendedLesson();
    var selected = availableDailyLessons.find(function (lesson) { return (lesson.id || lesson.category) === state.lessonCategory; }) || recommended;
    state.lessonCategory = selected.id || selected.category;
    if (!focusedLesson) {
      renderChoicePicker($('studyLevelPicker'), 'Study level', STUDY_LEVELS.map(function (level) {
        return { value: level.id, label: level.label + ' · ' + level.mg };
      }), selectedLevel().id, function (value) {
        setLearningLevel(value);
      });
    } else {
      $('studyLevelPicker').innerHTML = '';
    }
    var words = selected.words || VOCABULARY.filter(function (word) { return word.category === selected.category; }).slice(0, 6);
    var learned = words.filter(function (word) { return state.progress.learned[word.id]; }).length;
    var lessonKey = selected.id || selected.category;
    var isComplete = !!state.progress.lessons[lessonKey];

    renderChoicePicker(picker, 'Choose a lesson', availableDailyLessons.map(function (lesson) {
      var done = !!state.progress.lessons[lesson.id || lesson.category];
      return { value: lesson.id || lesson.category, label: (done ? '✅ ' : '') + lesson.label + (levelIsEnglishOnly() ? '' : (lesson.mg ? ' · ' + lesson.mg : '')), meta: lesson.goal };
    }), lessonKey, function (value) {
      state.lessonCategory = value;
      renderToday();
    });

    var pct = words.length ? Math.round((learned / words.length) * 100) : 0;

    content.innerHTML =
          (focusedLesson ? '<div class="focused-lesson-nav"><button class="btn btn-ghost btn-sm" id="backToCourseMap">← Curriculum</button><span class="focused-lesson-level">' + escapeHtml(selectedLevel().label) + ' · Unit ' + (availableDailyLessons.indexOf(selected) + 1) + ' of ' + availableDailyLessons.length + '</span></div>' : '') +
      '<div class="today-hero' + (focusedLesson ? ' focused-lesson-hero' : '') + '">' +
        '<div class="th-top">' +
          (focusedLesson ? '<div class="focused-lesson-kicker"><span class="eyebrow">' + (isComplete ? 'Lesson completed ✅' : 'Course lesson') + '</span><h2>' + escapeHtml(selected.label) + '</h2></div>' : '<div class="th-date"><span class="dh-emoji">📅</span><strong>' + formatDate(new Date()) + '</strong></div>') +
          '<div class="th-side">' + ringPct(pct, 'Learned', learned + '/' + words.length + ' words') + '</div>' +
        '</div>' +
        (focusedLesson ? '<div class="focused-lesson-summary"><p>' + escapeHtml(selected.goal) + '</p>' + (selected.grammar ? '<p class="lesson-focus"><strong>Grammar focus:</strong> ' + escapeHtml(selected.grammar) + '</p>' : '') + '</div>' : '<div><span class="eyebrow">' + (isComplete ? 'Lesson completed ✅' : 'Next lesson') + '</span><h3>' + selected.label + ' <span class="mg-label">' + selected.mg + '</span></h3><p>' + selected.goal + '</p>' + (selected.grammar ? '<p class="lesson-focus"><strong>Grammar focus:</strong> ' + selected.grammar + '</p>' : '') + '</div>') +
        '<div class="th-actions">' +
          '<button class="btn btn-primary btn-lg" id="todayContinueBtn">' + (focusedLesson ? 'Start lesson quiz 🎯' : 'Continue lesson 🎯') + '</button>' +
          '<button class="btn btn-ghost btn-sm" id="todayRepeatBtn">Repeat the words</button>' +
           (focusedLesson ? '' : '<button class="btn btn-ghost btn-sm" id="todayVocabTopBtn">Words</button><button class="btn btn-ghost btn-sm" id="todayDrillTopBtn">Drill</button>') +
        '</div>' +
      '</div>' +
      '<div class="lesson-progress" aria-label="' + learned + ' of ' + words.length + ' words marked learned"><span style="width:' + pct + '%"></span></div>' +
      '<div class="today-word-grid">' + words.map(function (word) {
        var wordLearned = !!state.progress.learned[word.id];
        return '<article class="today-word' + (wordLearned ? ' learned' : '') + '">' +
          '<div class="today-word-top"><span class="today-emoji">' + word.emoji + '</span>' +
            '<button class="speak-btn" data-word="' + word.word.replace(/"/g, '&quot;') + '" aria-label="Listen to ' + word.word.replace(/"/g, '&quot;') + '" title="Listen">🔊</button></div>' +
          '<h4>' + word.word + '</h4>' +
           '<p class="today-mg">' + correctableMalagasy('curriculum-word:' + word.id, word.malagasy, 'Lesson word', word.word) + '</p>' +
          '<p class="today-example">' + word.example + '</p>' +
          '<button class="btn ' + (wordLearned ? 'btn-secondary' : 'btn-outline') + ' btn-sm mark-word-btn" data-id="' + word.id + '">' + (wordLearned ? '✅ Learned' : 'Mark learned') + '</button>' +
        '</article>';
      }).join('') + '</div>' +
       renderCoursePlan(selected) +
       '<div class="today-actions' + (focusedLesson ? ' focused-lesson-actions' : '') + '">' +
         '<p>' + (focusedLesson ? 'Study the lesson, then check what you can do.' : 'Say each word aloud, then test yourself.') + '</p>' +
         '<div class="today-action-buttons">' +
           '<button class="btn btn-primary" id="todayQuizBtn">Start lesson quiz 🎯</button>' +
           (focusedLesson ? '' : '<button class="btn btn-outline" id="todayVocabBtn">Useful vocabulary</button><button class="btn btn-outline" id="todayDrillBtn">Try a drill</button>') +
         '</div>' +
       '</div>' +
       '';

    content.querySelectorAll('.speak-btn').forEach(function (button) {
      button.addEventListener('click', function () { tts.speak(button.dataset.word); });
    });
    content.querySelectorAll('.mark-word-btn').forEach(function (button) {
      button.addEventListener('click', function () {
         var word = words.find(function (item) { return item.id === button.dataset.id; });
        if (word) {
          markLearned(word.id);
          showToast('"' + word.word + '" learned! +2 ⭐', 'success');
          renderToday();
        }
      });
    });
    function startTodayQuiz() {
      if (words.length < 4) return showToast('This lesson needs at least four words for a quiz.', 'error');
      startQuiz(words, selected.label, function (score, total) {
        var passed = score / total >= 0.67;
        if (passed) {
           state.progress.lessons[lessonKey] = true;
           markActivity('lesson:' + lessonKey);
          saveProgress();
            var nextLesson = getRecommendedLesson();
            state.lessonCategory = nextLesson.id || nextLesson.category;
           renderToday();
           renderGlobalCourseBar();
           showToast('Lesson complete! Keep practising tomorrow. 🌟', 'success');
        } else {
           delete state.progress.lessons[lessonKey];
          saveProgress();
          showToast('Almost there — review the words and try the lesson again.', 'error');
        }
      });
    }
    $('todayContinueBtn').addEventListener('click', startTodayQuiz);
    $('todayQuizBtn').addEventListener('click', startTodayQuiz);
    $('todayRepeatBtn').addEventListener('click', function () {
      var text = words.map(function (w) { return w.word; }).join('. ');
      tts.speakSlow(text);
    });
    if ($('todayVocabTopBtn')) $('todayVocabTopBtn').addEventListener('click', function () { switchTab('vocabulary'); });
    if ($('todayDrillTopBtn')) $('todayDrillTopBtn').addEventListener('click', function () { switchTab('drills'); });
    if ($('todayVocabBtn')) $('todayVocabBtn').addEventListener('click', function () { switchTab('vocabulary'); });
    if ($('todayDrillBtn')) $('todayDrillBtn').addEventListener('click', function () { switchTab('drills'); });
    if ($('backToCourseMap')) $('backToCourseMap').addEventListener('click', function () { state.lessonFocus = false; switchTab('syllabus'); });
  }

  // ─── NAVIGATION ──────────────────────────────────────────────────────
  var VIEW_META = {
    today:         { title: 'Practice',                 sub: 'Fampiofanana' },
    syllabus:      { title: 'Curriculum',               sub: 'Fandaharam-pianarana' },
    vocabulary:    { title: 'Useful vocabulary',        sub: 'Voambolana' },
    alphabet:      { title: 'Alphabet & essentials',    sub: 'Abidia sy Andavanandro' },
    classroom:     { title: 'Classroom English',        sub: 'Teny baiko' },
    conversations: { title: 'Conversations',            sub: 'Resadresaka' },
    grammar:       { title: 'Grammar & Tenses',         sub: 'Fitsipi-pitenenana' },
    'irregular-verbs': { title: 'Irregular verbs',       sub: 'Matoanteny miova' },
    reading:       { title: 'Reading',                  sub: 'Famakiana' },
    writing:       { title: 'Writing',                  sub: 'Fanoratana' },
    drills:        { title: 'Drills',                   sub: 'Fanazaran-tena' },
    listening:     { title: 'Listening & Pronunciation', sub: 'Fihainoana' },
    speaking:      { title: 'Speaking practice',        sub: 'Fitenenana' },
    devotional:    { title: 'Daily devotional',         sub: 'Fandalinana Baiboly' },
    progress:      { title: 'Your Progress',            sub: 'Fandrosoana' },
  };

  function switchTab(tabId, options) {
    options = options || {};
    // A normal Practice tap opens the daily dashboard. Course-map lesson
    // links explicitly opt in to the focused lesson screen.
    if (tabId !== 'today' || !options.lessonFocus) state.lessonFocus = false;
    if (state.activeTab === 'speaking' && tabId !== 'speaking') stopSpeakingRecognition();
    state.activeTab = tabId;
    document.body.classList.toggle('focused-lesson-active', tabId === 'today' && !!state.lessonFocus);
    renderGlobalCourseBar();

    document.querySelectorAll('.nav-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.view === tabId);
      if (t.dataset.view === tabId) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    var moreButton = document.getElementById('moreBtn');
    var mobilePrimaryTabs = ['today', 'vocabulary', 'classroom', 'conversations'];
    if (moreButton) {
      var isMoreSection = mobilePrimaryTabs.indexOf(tabId) < 0;
      moreButton.classList.toggle('active', isMoreSection);
      if (isMoreSection) moreButton.setAttribute('aria-current', 'page');
      else moreButton.removeAttribute('aria-current');
    }
    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
      v.setAttribute('aria-hidden', 'true');
    });
    var view = document.getElementById('view-' + tabId);
    if (view) {
      view.classList.add('active');
      view.setAttribute('aria-hidden', 'false');
    }

    // Header reflects the current screen (like a real app title bar).
    var meta = VIEW_META[tabId];
    if (meta) {
      var titleEl = document.getElementById('viewTitle');
      var subEl = document.getElementById('viewSub');
      if (titleEl) titleEl.textContent = meta.title;
      if (subEl) subEl.textContent = meta.sub;
    }

    // Lazy render
    if (tabId === 'today') renderToday();
    else if (tabId === 'syllabus') renderSyllabus();
    else if (tabId === 'vocabulary') renderVocabulary();
    else if (tabId === 'alphabet') renderAlphabet();
    else if (tabId === 'classroom') renderClassroom();
    else if (tabId === 'grammar') renderGrammar();
    else if (tabId === 'irregular-verbs') renderIrregularVerbs();
    else if (tabId === 'reading') renderReading();
    else if (tabId === 'conversations') renderConversations();
    else if (tabId === 'writing') renderWriting();
    else if (tabId === 'drills') renderDrills();
    else if (tabId === 'listening') renderListening();
    else if (tabId === 'speaking') renderSpeaking();
    else if (tabId === 'devotional') renderDevotional();
    else if (tabId === 'progress') renderProgress();

    hideSheet();
    var scroller = document.getElementById('contentScroll');
    if (scroller) scroller.scrollTop = 0;

    // Keep the URL in sync so browser back/forward navigate between screens,
    // like a real app's navigation history.
    if (!state.applyingHash && location.hash !== '#' + tabId) {
      try { history.pushState(null, '', '#' + tabId); } catch (_) { /* file:// */ }
    }
  }

  // Navigate from the URL hash (deep links + back/forward buttons).
  function tabFromHash() {
    var id = (location.hash || '').replace('#', '');
    return VIEW_META[id] ? id : null;
  }

  // ─── SHEETS (settings / more menu) ───────────────────────────────────
  var openSheet = null;

  function showSheet(id) {
    var sheet = document.getElementById(id);
    var scrim = document.getElementById('scrim');
    if (!sheet || !scrim) return;
    if (openSheet && openSheet !== sheet) hideSheet();
    openSheet = sheet;
    var trigger = id === 'moreSheet' ? document.getElementById('moreBtn') : document.getElementById('settingsBtn');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    sheet.hidden = false;
    void sheet.offsetWidth; // force a reflow so the transition runs
    scrim.classList.add('show');
    sheet.classList.add('show');
    var focusable = sheet.querySelector('button, input, [tabindex]');
    if (focusable) focusable.focus();
  }

  function hideSheet() {
    var sheet = openSheet;
    var scrim = document.getElementById('scrim');
    openSheet = null;
    if (sheet) {
      var trigger = sheet.id === 'moreSheet' ? document.getElementById('moreBtn') : document.getElementById('settingsBtn');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
    if (sheet) {
      sheet.classList.remove('show');
      var sheetEl = sheet;
      setTimeout(function () {
        if (!sheetEl.classList.contains('show')) sheetEl.hidden = true;
      }, 220);
    }
    if (scrim) {
      scrim.classList.remove('show');
      setTimeout(function () {
        if (!scrim.classList.contains('show')) scrim.hidden = true;
      }, 220);
    }
  }

  function syncSettingsUI() {
    var themeSeg = document.getElementById('themeSeg');
    if (themeSeg) themeSeg.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.themeChoice === (settings.theme || 'system'));
    });
    var sizeSeg = document.getElementById('sizeSeg');
    if (sizeSeg) sizeSeg.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.sizeChoice === (settings.textSize || 'medium'));
    });
    var learningLevel = document.getElementById('learningLevel');
    if (learningLevel) learningLevel.value = selectedLevel().id;
    var studyLevelPicker = document.getElementById('studyLevelPicker');
    if (studyLevelPicker) studyLevelPicker.setAttribute('data-selected-level', selectedLevel().label);
    var rate = document.getElementById('rateRange');
    if (rate) rate.value = settings.speechRate;
    var rateValue = document.getElementById('rateValue');
    if (rateValue) rateValue.textContent = describeRate(settings.speechRate);
    var voiceAccent = document.getElementById('voiceAccent');
    if (voiceAccent) voiceAccent.value = settings.voiceAccent || 'british';
    var voiceGender = document.getElementById('voiceGender');
    if (voiceGender) voiceGender.value = settings.voiceGender || 'any';
    var voiceHint = document.getElementById('voiceHint');
    if (voiceHint) {
      var accentLabel = settings.voiceAccent === 'american' ? 'American English' : 'British English';
      var genderLabel = settings.voiceGender === 'female' ? 'female' : settings.voiceGender === 'male' ? 'male' : 'any available';
      if (tts.synth && tts.synth.__native) {
        voiceHint.textContent = 'Android will use the closest installed ' + accentLabel + ' ' + genderLabel + ' voice.';
      } else if (tts.getVoices().length) {
        var selectedVoice = tts.resolveVoice();
        voiceHint.textContent = selectedVoice ? 'Using: ' + selectedVoice.name : 'The closest installed English voice will be used.';
      } else {
        voiceHint.textContent = 'Voice choices appear when your device makes its English voices available.';
      }
    }
    var mg = document.getElementById('setMg');
    if (mg) {
      mg.checked = settings.malagasyHints !== false && !levelIsEnglishOnly();
      mg.disabled = levelIsEnglishOnly();
    }
    var auto = document.getElementById('setAutoSpeak');
    if (auto) auto.checked = !!settings.autoSpeak;
    var motion = document.getElementById('setMotion');
    if (motion) motion.checked = !!settings.reduceMotion;
  }

  // ─── TTS HELPER FOR BUTTONS ──────────────────────────────────────────
  function makeSpeakBtn(text, slow) {
    var btn = document.createElement('button');
    btn.className = 'speak-btn';
    btn.innerHTML = '🔊';
    btn.setAttribute('title', 'Listen');
    btn.setAttribute('aria-label', 'Listen to ' + text);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (slow) tts.speakSlow(text);
      else tts.speak(text);
    });
    return btn;
  }

  // ─── PROGRESS RING ───────────────────────────────────────────────────
  // A small SVG progress ring (label + ring) used across the app.
  function ringPct(pct, label, sub) {
    pct = Math.max(0, Math.min(100, pct));
    var circ = 2 * Math.PI * 22; // r = 22
    var dash = circ * (1 - pct / 100);
    return '<span class="ring">' +
      '<svg class="ring-svg" viewBox="0 0 52 52" aria-hidden="true">' +
        '<circle class="ring-bg" cx="26" cy="26" r="22"></circle>' +
        '<circle class="ring-fg" cx="26" cy="26" r="22" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + dash.toFixed(1) + '"></circle>' +
      '</svg>' +
      '<span class="ring-text"><strong>' + pct + '%</strong><span>' + (sub || '') + '</span></span>' +
    '</span>';
  }

  // ─── DATE / DAY HELPERS ──────────────────────────────────────────────
  function formatDate(date) {
    var d = date.getDate();
    var m = date.toLocaleString('default', { month: 'long' });
    var w = date.toLocaleString('default', { weekday: 'long' });
    return w + ', ' + m + ' ' + d;
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  // ─── DAY TRACKING (for the streak calendar) ──────────────────────────
  // Marks the current calendar day as "active" whenever the user does
  // something (learns a word, finishes a lesson, reads a devotional day).
  // Stored as a set of "YYYY-MM-DD" keys so the progress page can draw a
  // 30-day activity calendar.
  function recordDay() {
    var key = todayKey();
    if (state.progress.days[key]) return;
    state.progress.days[key] = true;
    state.progress.lastDate = key;
    saveProgress();
  }

  function dayActivity(key) {
    if (!state.progress.days || !state.progress.days[key]) return 'none';
    // A day counts as "done" if the user also marked a devotional day read
    // or completed a lesson that day — otherwise it was a light touch.
    return 'done';
  }

  function streakCalendar() {
    var cells = [];
    var today = new Date();
    for (var i = 29; i >= 0; i--) {
      var d = new Date(today);
      d.setDate(today.getDate() - i);
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      var active = !!(state.progress.days && state.progress.days[key]);
      var isToday = (i === 0);
      cells.push('<span class="sc-day' + (active ? ' sc-done' : ' sc-empty') + (isToday ? ' sc-today' : '') + '" title="' + key + '"></span>');
    }
    return cells.join('');
  }

  // ─── TOPIC CARD RING ─────────────────────────────────────────────────
  // A tiny inline ring for topic cards (no label text, just the arc).
  function topicRing(pct) {
    pct = Math.max(0, Math.min(100, pct));
    var circ = 2 * Math.PI * 13; // r = 13
    var dash = circ * (1 - pct / 100);
    return '<svg class="tc-ring" viewBox="0 0 30 30" aria-hidden="true">' +
      '<circle class="ring-bg" cx="15" cy="15" r="13"></circle>' +
      '<circle class="ring-fg" cx="15" cy="15" r="13" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + dash.toFixed(1) + '"></circle>' +
    '</svg>';
  }

  // Compact in-app chooser used across learning screens. A custom menu keeps
  // long lesson lists contained instead of opening an oversized OS dropdown.
  var choiceMenusBound = false;

  function closeChoiceMenus(except) {
    document.querySelectorAll('.content-picker.open').forEach(function (picker) {
      if (picker !== except) {
        picker.classList.remove('open');
        var trigger = picker.querySelector('.content-picker-button');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        var menu = picker.querySelector('.content-picker-menu');
        if (menu) menu.hidden = true;
      }
    });
  }

  function renderChoicePicker(host, label, options, selected, onChange) {
    if (!host) return selected;
    host.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'content-picker';
    var labelEl = document.createElement('span');
    labelEl.className = 'content-picker-label';
    labelEl.textContent = label;
    var valid = options.some(function (option) { return option.value === selected; });
    var chosenValue = valid ? selected : (options[0] ? options[0].value : '');
    var chosen = options.find(function (option) { return option.value === chosenValue; });
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'content-picker-button';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span class="content-picker-current"></span><span class="content-picker-chevron" aria-hidden="true">⌄</span>';
    trigger.querySelector('.content-picker-current').textContent = chosen ? chosen.label : 'Choose an option';
    var menu = document.createElement('div');
    menu.className = 'content-picker-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'listbox');
    options.forEach(function (option) {
      var optionEl = document.createElement('button');
      optionEl.type = 'button';
      optionEl.className = 'content-picker-option' + (option.value === chosenValue ? ' selected' : '');
      optionEl.dataset.value = option.value;
      optionEl.setAttribute('role', 'option');
      optionEl.setAttribute('aria-selected', option.value === chosenValue ? 'true' : 'false');
      optionEl.textContent = option.label;
      if (option.meta) optionEl.title = option.meta;
      optionEl.addEventListener('click', function () {
        trigger.querySelector('.content-picker-current').textContent = option.label;
        menu.querySelectorAll('.content-picker-option').forEach(function (item) {
          var isSelected = item === optionEl;
          item.classList.toggle('selected', isSelected);
          item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
        closeChoiceMenus();
        onChange(option.value);
      });
      menu.appendChild(optionEl);
    });
    trigger.addEventListener('click', function () {
      var isOpen = wrap.classList.contains('open');
      closeChoiceMenus(wrap);
      wrap.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      menu.hidden = isOpen;
    });
    wrap.appendChild(labelEl);
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    host.appendChild(wrap);
    if (!choiceMenusBound) {
      document.addEventListener('click', function (event) {
        if (!event.target.closest('.content-picker')) closeChoiceMenus();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeChoiceMenus();
      });
      choiceMenusBound = true;
    }
    return chosenValue;
  }

  function renderPrimaryToolkit() {
    var level = selectedLevel();
    var toolkit = (LEVEL_TOOLKITS && LEVEL_TOOLKITS[level.id]) || PRIMARY_TOOLKIT;
    return '<details class="primary-toolkit" aria-labelledby="toolkitTitle">' +
      '<summary class="toolkit-summary"><span class="eyebrow">Level support · ' + escapeHtml(level.label) + '</span><strong id="toolkitTitle">Useful everyday toolkit</strong><span>Open practical phrases and study habits for this level</span></summary>' +
      '<div class="toolkit-heading"><div><h3>Your learner toolkit</h3><p>Practical language and study habits for your current level.</p></div><span class="toolkit-badge">' + (level.rank < 4 ? 'Ho an\'ny mpianatra' : 'Level ' + level.label) + '</span></div>' +
      '<div class="toolkit-grid">' + toolkit.map(function (group) {
        return '<article class="toolkit-card"><div class="toolkit-card-title"><span>' + group.icon + '</span><div><h4>' + group.title + '</h4><p>' + group.mg + '</p></div></div>' +
          '<ul>' + group.items.map(function (item) { return '<li><strong>' + item[0] + '</strong><span>' + item[1] + '</span></li>'; }).join('') + '</ul></article>';
      }).join('') + '</div></details>';
  }

  // ─── VOCABULARY ──────────────────────────────────────────────────────
  function getVocabularyCatalog() {
    var courseLessons = typeof COURSE_LESSONS !== 'undefined' ? COURSE_LESSONS : [];
    var guidedLessons = typeof CURRICULUM_LESSONS !== 'undefined' ? CURRICULUM_LESSONS : [];
    if (!courseLessons.length && !guidedLessons.length) return VOCABULARY;
    var lessonWords = [];
    courseLessons.concat(guidedLessons).forEach(function (lesson) {
      (lesson.words || []).forEach(function (word) {
        lessonWords.push(Object.assign({
          level: lesson.level,
          category: 'Course: ' + lesson.label,
          categoryMg: lesson.mg || '',
          phonetic: '',
          british: true,
          usNote: null,
        }, word));
      });
    });
    return VOCABULARY.concat(lessonWords);
  }

  function vocabularyLevel(word) {
    if (word.level) return word.level;
    var elementary = ['Food & Drink', 'Body', 'Clothes', 'Weather', 'Time & Days', 'Months', 'House & Home', 'At Home'];
    var preIntermediate = ['Daily Routine', 'Verbs & Actions', 'Emotions', 'Places & Directions', 'Transport', 'Village Life', 'Adjectives', 'Measuring & Distance', 'At the Market', 'Field & Farm', 'At Church'];
    if (elementary.indexOf(word.category) >= 0) return 'elementary';
    if (preIntermediate.indexOf(word.category) >= 0) return 'pre-intermediate';
    return 'beginner';
  }

  function renderVocabulary() {
    var grid = $('vocabGrid');
    var filters = $('categoryFilters');
    if (!grid) return;

    var filter = state.vocabFilter;
    var search = state.vocabSearch.trim().toLowerCase();
    var status = state.vocabStatus;
    var catalog = getVocabularyCatalog();
    var toolkit = $('vocabToolkit');
    if (toolkit) toolkit.innerHTML = renderPrimaryToolkit();
    var availableWords = levelFiltered(catalog, vocabularyLevel);
    if (filter && !availableWords.some(function (word) { return word.category === filter; })) {
      filter = null;
      state.vocabFilter = null;
    }
    var words = availableWords.filter(function (v) {
      var matchesCategory = !filter || v.category === filter;
      var matchesSearch = !search || [v.word, getVocabMalagasy(v), v.example].join(' ').toLowerCase().indexOf(search) >= 0;
      var isLearned = !!state.progress.learned[v.id];
      var isNeedsPractice = !!state.progress.needsPractice[v.id];
      var isSaved = !!state.progress.saved[v.id];
      var matchesStatus = status === 'all' || (status === 'new' && !isLearned) || (status === 'learned' && isLearned) || (status === 'practice' && isNeedsPractice) || (status === 'saved' && isSaved);
      return matchesCategory && matchesSearch && matchesStatus;
    });

    var cats = [...new Set(availableWords.map(function (v) { return v.category; }))];
    var categoryCounts = {};
    cats.forEach(function (category) {
      categoryCounts[category] = {
        total: availableWords.filter(function (v) { return v.category === category; }).length,
        learned: availableWords.filter(function (v) { return v.category === category && state.progress.learned[v.id]; }).length,
      };
    });
    var statuses = [
      { key: 'all', label: 'All' },
      { key: 'new', label: 'New' },
      { key: 'learned', label: 'Learned' },
      { key: 'practice', label: 'Needs practice' },
      { key: 'saved', label: 'Saved words' },
    ];
    renderChoicePicker($('vocabStatusFilters'), 'Show', statuses.map(function (item) {
      return { value: item.key, label: item.label };
    }), status, function (value) {
      state.vocabStatus = value;
      renderVocabulary();
    });
    var searchInput = $('vocabSearch');
    searchInput.value = state.vocabSearch;
    searchInput.oninput = function () {
      state.vocabSearch = searchInput.value;
      renderVocabulary();
      searchInput.focus();
    };
    filters.innerHTML = '';

    var topics = $('vocabTopics');
    if (topics) {
       renderChoicePicker(topics, 'Choose a topic', [{ value: '', label: 'All topics · ' + availableWords.length + ' words' }].concat(cats.map(function (c) {
        var info = CATEGORIES.find(function (item) { return item.name === c; });
       return { value: c, label: c + (info && !levelIsEnglishOnly() ? ' · ' + info.nameMg : '') + ' · ' + categoryCounts[c].learned + '/' + categoryCounts[c].total };
      })), filter || '', function (value) {
        state.vocabFilter = value || null;
        renderVocabulary();
      });
    }

    if (words.length === 0) {
      grid.innerHTML = '<div class="empty-state"><strong>No words found.</strong><span>Try another search or choose a different status.</span><button class="btn btn-outline btn-sm" id="clearVocabFilters">Clear filters</button></div>';
      $('clearVocabFilters').addEventListener('click', function () {
        state.vocabSearch = '';
        state.vocabStatus = 'all';
        state.vocabFilter = null;
        renderVocabulary();
      });
      return;
    }

    grid.innerHTML = words.map(function (v) {
      var learned = state.progress.learned[v.id];
      var saved = !!state.progress.saved[v.id];
      var usBadge = v.usNote && v.usNote !== 'Same spelling' ? '<span class="vi-us">🇺🇸 ' + v.usNote + '</span>' : '';
      var practiceBadge = state.progress.needsPractice[v.id] ? '<span class="vi-practice">Needs practice</span>' : '';
      return '<article class="vocab-item' + (learned ? ' learned' : '') + '" data-id="' + v.id + '">' +
        '<span class="vi-emoji">' + v.emoji + '</span>' +
        '<div>' +
          '<div class="vi-word">' + v.word + ' <span class="vi-details">/' + v.phonetic + '/</span></div>' +
           '<div class="vi-details"><span class="vi-mg">' + getVocabMalagasy(v) + '</span> ' + usBadge + ' ' + practiceBadge + '</div>' +
          '<div class="vi-details vi-example">' + v.example + '</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:0.4rem;">' +
           '<button class="speak-btn" data-word="' + v.word.replace(/"/g, '&quot;') + '" aria-label="Listen to ' + v.word.replace(/"/g, '&quot;') + '" title="Listen">🔊</button>' +
           '<button class="vocab-save-btn ' + (saved ? 'is-saved' : '') + '" data-id="' + v.id + '" type="button" aria-pressed="' + (saved ? 'true' : 'false') + '" title="Save word">' + (saved ? '🔖 Saved' : '☆ Save') + '</button>' +
           '<button class="vocab-correct-btn" data-id="' + v.id + '" type="button">✏️ Edit Malagasy</button>' +
           '<button class="vocab-mark-btn ' + (learned ? 'is-learned' : '') + '" data-id="' + v.id + '" aria-pressed="' + (learned ? 'true' : 'false') + '">' + (learned ? '✅ Learned' : 'Mark learned') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');

    grid.querySelectorAll('.vocab-mark-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.dataset.id;
      var word = catalog.find(function (w) { return w.id === id; });
        if (word) {
          if (state.progress.learned[id]) {
            delete state.progress.learned[id];
            saveProgress();
            showToast('"' + word.word + '" moved back to New words.');
          } else {
            var changed = markLearned(id);
            showToast(changed ? '"' + word.word + '" learned! +2 ⭐' : '"' + word.word + '" is already learned.', changed ? 'success' : '');
          }
          renderVocabulary();
        }
      });
    });

    grid.querySelectorAll('.vocab-correct-btn').forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.stopPropagation();
        var word = catalog.find(function (item) { return item.id === button.dataset.id; });
        if (word) openVocabCorrection(word);
      });
    });

    grid.querySelectorAll('.vocab-save-btn').forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.stopPropagation();
        var saved = toggleSaved(button.dataset.id);
        renderVocabulary();
        showToast(saved ? 'Word saved for quick review. 🔖' : 'Word removed from saved words.');
      });
    });

    // TTS buttons
    grid.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        tts.speak(btn.dataset.word);
      });
    });

    $('vocabReviewAll').onclick = function () {
      var reviewPool = levelFiltered(catalog, vocabularyLevel).filter(function (word) { return state.progress.needsPractice[word.id] || !state.progress.learned[word.id]; });
      if (reviewPool.length < 4) return showToast('You have no review set yet. Try a topic quiz first.', 'error');
      startQuiz(reviewPool, 'Review words');
    };
    $('vocabSavedBtn').onclick = function () {
      state.vocabStatus = 'saved';
      state.vocabFilter = null;
      state.vocabSearch = '';
      renderVocabulary();
    };
    $('vocabQuizBtn').onclick = function () {
      var pool = state.vocabFilter ? levelFiltered(catalog, vocabularyLevel).filter(function (v) { return v.category === state.vocabFilter; }) : levelFiltered(catalog, vocabularyLevel);
      if (pool.length < 4) return showToast('Need at least 4 words for a quiz.', 'error');
      startQuiz(pool, state.vocabFilter || 'All Vocabulary');
    };
  }

  // ─── CLASSROOM ENGLISH ───────────────────────────────────────────────
  function getClassroomCatalog() {
    var base = (typeof CLASSROOM_PHRASES === 'undefined' ? [] : CLASSROOM_PHRASES).map(function (phrase) {
      return Object.assign({ level: 'beginner' }, phrase);
    });
    return base.concat(typeof CLASSROOM_COURSE_PHRASES === 'undefined' ? [] : CLASSROOM_COURSE_PHRASES);
  }

  function classroomLevel(phrase) { return phrase.level || 'beginner'; }

  function getClassroomLevelPhrases() {
    return levelFiltered(getClassroomCatalog(), classroomLevel);
  }

  function getClassroomGroups(phrases) {
    var seen = {};
    return phrases.reduce(function (groups, phrase) {
      if (seen[phrase.group]) return groups;
      seen[phrase.group] = true;
      groups.push({
        name: phrase.group,
        nameMg: phrase.groupMg || '',
        count: phrases.filter(function (item) { return item.group === phrase.group; }).length,
      });
      return groups;
    }, []);
  }

  function getClassroomFiltered() {
    var group = state.classroomGroup;
    var search = state.classroomSearch.trim().toLowerCase();
    return getClassroomLevelPhrases().filter(function (p) {
      var matchesGroup = !group || p.group === group;
      var haystack = [p.en, getTextMalagasy('classroom:' + p.id, p.mg), p.group, p.note || ''].join(' ').toLowerCase();
      var matchesSearch = !search || haystack.indexOf(search) >= 0;
      return matchesGroup && matchesSearch;
    });
  }

  function renderClassroom() {
    var grid = $('classroomGrid');
    var filters = $('classroomFilters');
    if (!grid) return;

    var classroomTitle = $('classroomTitle');
    var classroomDescription = $('classroomViewDesc');
    if (classroomTitle) classroomTitle.innerHTML = selectedLevel().rank >= 5 ? 'Academic and seminar English' : selectedLevel().rank >= 4 ? 'Study and discussion English' : 'Classroom English <span class="mg-label">· Teny baiko</span>';
    if (classroomDescription) classroomDescription.textContent = selectedLevel().rank >= 5
      ? 'Practise the language of academic debate, critical analysis, professional seminars, and formal presentations.'
      : selectedLevel().rank >= 4
        ? 'Practise clarification, evidence, presentations, and respectful discussion for study and work.'
        : 'Listen, repeat, and use practical classroom language for lessons, pair work, and study.';

    var availablePhrases = getClassroomLevelPhrases();
    var group = state.classroomGroup;
    if (group && !availablePhrases.some(function (phrase) { return phrase.group === group; })) {
      group = null;
      state.classroomGroup = null;
    }
    var searchInput = $('classroomSearch');
    if (searchInput) {
      searchInput.value = state.classroomSearch;
      searchInput.oninput = function () {
        state.classroomSearch = searchInput.value;
        renderClassroom();
        searchInput.focus();
      };
    }

    renderChoicePicker(filters, 'Choose a classroom set', [{ value: '', label: 'All classroom phrases · ' + availablePhrases.length }].concat(getClassroomGroups(availablePhrases).map(function (g) {
      return { value: g.name, label: g.name + (levelIsEnglishOnly() ? '' : ' · ' + g.nameMg) + ' · ' + g.count };
    })), group || '', function (value) {
      state.classroomGroup = value || null;
      renderClassroom();
    });

    var phrases = getClassroomFiltered();

    if (phrases.length === 0) {
      grid.innerHTML = '<div class="empty-state"><strong>No phrases found.</strong><span>Try another search or choose a different group.</span>' +
        '<button class="btn btn-outline btn-sm" id="clearClassroomFilters">Clear filters</button></div>';
      $('clearClassroomFilters').addEventListener('click', function () {
        state.classroomSearch = '';
        state.classroomGroup = null;
        renderClassroom();
      });
      return;
    }

    grid.innerHTML = phrases.map(function (p) {
      var learned = !!state.progress.classroom[p.id];
      return '<article class="vocab-item classroom-item' + (learned ? ' learned' : '') + '" data-id="' + p.id + '">' +
        '<span class="vi-emoji">' + p.emoji + '</span>' +
        '<div>' +
          '<div class="vi-word">' + p.en + '</div>' +
           '<div class="vi-details"><span class="vi-mg">' + correctableMalagasy('classroom:' + p.id, p.mg, 'Classroom phrase', p.en) + '</span></div>' +
          (p.note ? '<div class="vi-details vi-example">' + p.note + '</div>' : '') +
        '</div>' +
        '<div class="classroom-actions">' +
          '<button class="speak-btn" data-word="' + p.en.replace(/"/g, '&quot;') + '" aria-label="Listen to ' + p.en.replace(/"/g, '&quot;') + '" title="Listen">🔊</button>' +
          '<button class="vocab-mark-btn ' + (learned ? 'is-learned' : '') + '" data-id="' + p.id + '" aria-pressed="' + (learned ? 'true' : 'false') + '">' + (learned ? '✅ Known' : 'Mark known') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');

    grid.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        tts.speak(btn.dataset.word);
      });
    });

    grid.querySelectorAll('.vocab-mark-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.dataset.id;
         var phrase = getClassroomCatalog().find(function (p) { return p.id === id; });
        if (!phrase) return;
        if (state.progress.classroom[id]) {
          delete state.progress.classroom[id];
          saveProgress();
          showToast('"' + phrase.en + '" moved back to new phrases.');
        } else {
          var changed = markClassroomLearned(id);
          showToast(changed ? '"' + phrase.en + '" learned! +2 ⭐' : 'Already marked as known.', changed ? 'success' : '');
        }
        renderClassroom();
      });
    });

    var listenAll = $('classroomListenAll');
    if (listenAll) {
      listenAll.onclick = function () {
        var text = phrases.map(function (p) { return p.en; }).join('. ');
        tts.speak(text, 0.8);
      };
    }

    var quizBtn = $('classroomQuizBtn');
    if (quizBtn) {
      quizBtn.onclick = function () {
        if (phrases.length < 4) return showToast('Choose a group with at least four phrases.', 'error');
        var quizWords = phrases.map(function (p) {
          return { id: p.id, word: p.en, malagasy: p.mg, emoji: p.emoji, example: '' };
        });
        startQuiz(quizWords, state.classroomGroup || 'Classroom English', null, {
          questionLabel: 'What is the correct English phrase for…',
          onCorrect: markClassroomLearned,
          onWrong: function (id) { delete state.progress.classroom[id]; saveProgress(); },
        });
      };
    }
  }

  // ─── QUIZ MODAL ──────────────────────────────────────────────────────
  var quizData = null;

  function startQuiz(words, title, onComplete, options) {
    var shuffled = shuffleArray([...words]);
    options = options || {};
    quizData = {
      words: shuffled.slice(0, Math.min(12, shuffled.length)),
      pool: words,
      index: 0, score: 0,
      total: Math.min(12, shuffled.length),
      answered: false, title: title, onComplete: onComplete || null,
      questionLabel: options.questionLabel || 'What is the English word for…',
      onCorrect: options.onCorrect || markLearned,
      onWrong: options.onWrong || markNeedsPractice,
    };
    showQuizQuestion();
  }

  function showQuizQuestion() {
    var q = quizData;
    if (q.index >= q.total) return showQuizResult();

    var current = q.words[q.index];
    var others = q.pool.filter(function (w) { return w.id !== current.id && w.word !== current.word; });
    var pool = shuffleArray(others).slice(0, 3);
    var choices = shuffleArray([current].concat(pool));

    q.answered = false;
    var overlay = document.createElement('div');
    overlay.className = 'quiz-overlay';
    overlay.id = 'quizOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', q.title + ' quiz');
    overlay.innerHTML =
      '<div class="quiz-modal">' +
        '<div class="qm-progress">Question ' + (q.index + 1) + ' of ' + q.total + ' · ' + q.title + '</div>' +
        '<div class="qm-question">' + (q.questionLabel || 'What is the English word for…') + '</div>' +
        '<div style="text-align:center;font-size:2.5rem;margin:0.5rem 0;">' + current.emoji + '</div>' +
         '<div class="quiz-mg" style="text-align:center;font-size:1.4rem;font-weight:600;color:var(--indigo);margin-bottom:0.5rem;">' + getVocabMalagasy(current) + '</div>' +
        (current.usNote && current.usNote !== 'Same spelling'
           ? '<div style="text-align:center;font-size:0.8rem;color:var(--amber);margin-bottom:0.5rem;">🇺🇸 American English: ' + current.usNote + '</div>'
          : '') +
        '<div class="qm-choices" id="quizChoices">' +
          choices.map(function (c) { return '<button class="qm-choice" data-id="' + c.id + '">' + c.word + '</button>'; }).join('') +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;margin-top:0.6rem;">' +
          '<button class="btn btn-ghost btn-sm" id="quizCancelBtn">Stop ✋</button>' +
          '<span style="font-size:0.8rem;color:var(--text-secondary);align-self:center;">Score: ' + q.score + '</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    var firstChoice = overlay.querySelector('.qm-choice');
    if (firstChoice) firstChoice.focus();

    overlay.querySelectorAll('.qm-choice').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (q.answered) return;
        q.answered = true;
        var isCorrect = btn.dataset.id === current.id;
        overlay.querySelectorAll('.qm-choice').forEach(function (b) {
          if (b.dataset.id === current.id) b.classList.add('correct');
        });
        if (isCorrect) {
          btn.classList.add('correct');
          q.score++;
          q.onCorrect(current.id);
          saveProgress();
          showToast('✅ Correct!', 'success');
        } else {
          btn.classList.add('wrong');
          q.onWrong(current.id);
          showToast('❌ The answer is "' + current.word + '"', 'error');
        }
        var choicesDiv = $('quizChoices');
        var nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = q.index < q.total - 1 ? 'Next →' : 'See results 🏆';
        nextBtn.style.marginTop = '0.8rem';
        nextBtn.style.width = '100%';
        nextBtn.addEventListener('click', function () {
          q.index++;
          closeQuizOverlay();
          showQuizQuestion();
        });
        choicesDiv.appendChild(nextBtn);
      });
    });

    $('quizCancelBtn').addEventListener('click', closeQuizOverlay);
  }

  function showQuizResult() {
    var q = quizData;
    var pct = Math.round((q.score / q.total) * 100);
    var emoji, msg;
    if (pct === 100) { emoji = '🏆'; msg = 'Perfect score! Excellent!'; }
    else if (pct >= 70) { emoji = '🌟'; msg = 'Great work! Keep practising!'; }
    else if (pct >= 40) { emoji = '👍'; msg = 'Good effort! Try again to improve.'; }
    else { emoji = '💪'; msg = 'Keep going! Practice makes perfect.'; }

    var overlay = document.createElement('div');
    overlay.className = 'quiz-overlay';
    overlay.id = 'quizOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Quiz results');
    overlay.innerHTML =
      '<div class="quiz-modal">' +
        '<div class="qm-result">' +
          '<div style="font-size:3rem;">' + emoji + '</div>' +
          '<div class="big">' + q.score + ' / ' + q.total + '</div>' +
          '<div class="msg">' + msg + '</div>' +
          '<div style="display:flex;gap:0.6rem;justify-content:center;">' +
            '<button class="btn btn-primary" id="quizRetryBtn">Try again 🔄</button>' +
            '<button class="btn btn-ghost" id="quizCloseBtn">Close</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    markActivity('quiz');
    if (q.onComplete) q.onComplete(q.score, q.total);
    var closeButton = $('quizCloseBtn');
    if (closeButton) closeButton.focus();
    $('quizRetryBtn').addEventListener('click', function () {
      closeQuizOverlay();
      startQuiz(q.pool, q.title, q.onComplete, {
        questionLabel: q.questionLabel,
        onCorrect: q.onCorrect,
        onWrong: q.onWrong,
      });
    });
    $('quizCloseBtn').addEventListener('click', closeQuizOverlay);
  }

  function closeQuizOverlay() {
    var el = $('quizOverlay');
    if (el) el.remove();
  }

  // ─── LEARNING PATH ────────────────────────────────────────────────────
  function renderSyllabus() {
    var selector = $('syllabusSelector');
    var content = $('syllabusContent');
    if (!selector || !content || typeof ENGLISH_SYLLABUS === 'undefined') return;
    var selected = ENGLISH_SYLLABUS.find(function (level) { return level.id === selectedLevel().id; }) || ENGLISH_SYLLABUS[0];
    var courseInfo = typeof COURSE_LEVELS !== 'undefined' ? COURSE_LEVELS.find(function (level) { return level.id === selectedLevel().id; }) : null;
    renderChoicePicker(selector, 'Choose a level', ENGLISH_SYLLABUS.map(function (level) {
      return { value: level.id, label: level.label + (level.mg ? ' · ' + level.mg : '') };
    }), selected.id, function (value) {
      setLearningLevel(value);
      renderSyllabus();
    });
    var curriculum = getCurrentCurriculumLessons();
    var units = curriculum.length ? curriculum : selected.units;
    var courseProgress = getCourseProgress(units);
    var currentUnit = courseProgress.current;
    var currentIndex = courseProgress.currentIndex;
    content.innerHTML = '<div class="syllabus-hero">' +
      '<div><span class="eyebrow">Your route · ' + (courseInfo ? escapeHtml(courseInfo.stage) : 'Course level') + '</span><h3>' + selected.label + '</h3><p>' + (courseInfo ? escapeHtml(courseInfo.description) : selected.goal) + '</p>' +
        (courseInfo ? '<p class="syllabus-source-focus"><strong>Curriculum focus:</strong> ' + escapeHtml(courseInfo.sourceFocus) + '</p>' : '') + '</div>' +
      '<span class="syllabus-level-badge">Level ' + selectedLevel().rank + ' / ' + STUDY_LEVELS.length + '</span>' +
      '</div>' +
      (courseInfo ? '<div class="syllabus-strands"><strong>Skills in this level</strong><div>' + courseInfo.strands.map(function (strand) { return '<span>' + escapeHtml(strand) + '</span>'; }).join('') + '</div></div>' : '') +
      (typeof COURSE_SOURCES !== 'undefined' ? '<details class="course-sources"><summary>Curriculum documents and course references</summary><ul>' + COURSE_SOURCES.map(function (source) { return '<li><strong>' + escapeHtml(source.short) + '</strong><span>' + escapeHtml(source.title) + '</span></li>'; }).join('') + (typeof COURSE_REFERENCES !== 'undefined' ? COURSE_REFERENCES.map(function (source) { return '<li><strong>' + escapeHtml(source.short) + '</strong><span>' + escapeHtml(source.title) + ' · <a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">official source</a></span></li>'; }).join('') : '') + '</ul></details>' : '') +
      '<section class="curriculum-progress-card"><div class="curriculum-progress-copy"><span class="eyebrow">Current stage</span><h3>' + (currentUnit ? 'Unit ' + (currentIndex + 1) + ': ' + escapeHtml(currentUnit.label || currentUnit.title) : 'Level complete') + '</h3><p>' + (currentUnit ? escapeHtml(currentUnit.goal || currentUnit.focus || '') : 'You have completed every unit in this level. Review any unit or choose the next level.') + '</p><div class="curriculum-progress-track"><span style="width:' + courseProgress.percent + '%"></span></div><small>' + courseProgress.completed + ' of ' + courseProgress.total + ' units complete · ' + courseProgress.wordsLearned + '/' + courseProgress.wordTotal + ' current-unit words learned</small></div>' + (currentUnit ? '<button class="btn btn-primary" id="curriculumContinueBtn" type="button">Continue current unit →</button>' : '') + '</section>' +
      '<div class="syllabus-units">' + units.map(function (unit, index) {
        var complete = !!state.progress.lessons[unit.id];
        var isCurrent = !complete && index === currentIndex;
        var unitWords = unit.words || [];
        var learnedWords = unitWords.filter(function (word) { return !!state.progress.learned[word.id]; }).length;
        var unitStatus = complete ? 'Completed' : isCurrent ? 'Current stage' : 'Not started';
        var unitAction = complete ? 'Review unit' : isCurrent ? 'Continue unit' : 'Open unit';
        return '<article class="syllabus-unit">' +
          '<div class="syllabus-unit-number">' + String(index + 1).padStart(2, '0') + '</div>' +
          '<div class="syllabus-unit-copy"><div class="syllabus-unit-status">' + (complete ? '✓ ' : isCurrent ? '● ' : '') + unitStatus + '</div><span class="eyebrow">Unit ' + (index + 1) + '</span><h4>' + (unit.label || unit.title) + '</h4><p>' + (unit.goal || unit.focus) + '</p>' + (unit.grammar ? '<small>Grammar focus: ' + escapeHtml(unit.grammar) + ' · ' + unit.words.length + ' key words · Read · Write · Speak · Listen</small>' : '') + (unitWords.length ? '<div class="unit-word-progress"><span style="width:' + Math.round((learnedWords / unitWords.length) * 100) + '%"></span></div><small class="unit-word-count">' + learnedWords + '/' + unitWords.length + ' key words learned</small>' : '') + '</div>' +
          '<button class="btn btn-outline btn-sm" data-syllabus-lesson="' + (unit.id || '') + '" data-syllabus-view="' + (unit.view || 'today') + '" type="button">' + unitAction + ' →</button>' +
        '</article>';
      }).join('') + '</div>';
    var continueButton = $('curriculumContinueBtn');
    if (continueButton && currentUnit) continueButton.addEventListener('click', function () {
      state.lessonCategory = currentUnit.id;
      state.lessonFocus = true;
      switchTab('today', { lessonFocus: true });
    });
    content.querySelectorAll('[data-syllabus-view]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.dataset.syllabusLesson) {
          state.lessonCategory = button.dataset.syllabusLesson;
          state.lessonFocus = true;
          // Course-map units are complete course lessons. Keep them out of
          // the daily dashboard and open the selected lesson directly.
          switchTab('today', { lessonFocus: true });
          return;
        }
        state.lessonFocus = false;
        switchTab(button.dataset.syllabusView);
      });
    });
  }

  // ─── IRREGULAR VERBS ──────────────────────────────────────────────────
  function renderIrregularVerbs() {
    var host = $('irregularVerbTable');
    var searchInput = $('irregularVerbSearch');
    if (!host || typeof IRREGULAR_VERBS === 'undefined') return;
    var search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var rows = IRREGULAR_VERBS.filter(function (verb) {
      return !search || [verb.base, verb.past, verb.participle, verb.ing, verb.mg].join(' ').toLowerCase().indexOf(search) >= 0;
    });
    host.innerHTML = '<div class="irregular-table-scroll"><table class="irregular-table"><thead><tr>' +
      '<th>Base / infinitive</th><th>Past simple</th><th>Past participle</th><th>-ing form</th><th>Meaning</th><th></th>' +
      '</tr></thead><tbody>' + rows.map(function (verb) {
        var forms = [verb.base, verb.past, verb.participle].join('|');
        return '<tr>' +
          '<th scope="row"><strong>to ' + verb.base + '</strong></th>' +
          '<td>' + verb.past + '</td><td>' + verb.participle + '</td><td>' + verb.ing + '</td>' +
          '<td class="irregular-mg">' + verb.mg + '</td>' +
          '<td><button class="speak-btn irregular-speak" data-forms="' + escapeHtml(forms) + '" type="button" aria-label="Hear the forms of ' + escapeHtml(verb.base) + '">🔊</button></td>' +
        '</tr>';
      }).join('') + '</tbody></table></div>' +
      (rows.length ? '' : '<div class="empty-state"><strong>No irregular verbs found.</strong><span>Try another spelling.</span></div>');
    host.querySelectorAll('.irregular-speak').forEach(function (button) {
      button.addEventListener('click', function () { tts.speakSequence(button.dataset.forms.split('|'), 0.75, 350); });
    });
    if (searchInput) searchInput.oninput = renderIrregularVerbs;
  }

  // ─── GRAMMAR ─────────────────────────────────────────────────────────
  function grammarLevel(lesson) {
    var beginner = ['tense-present-simple', 'pos-nouns', 'pos-verbs', 'pos-adjectives', 'pos-pronouns', 'pos-articles', 'be-and-have'];
    var elementary = ['tense-present-continuous', 'tense-past-simple', 'tense-future', 'pos-prepositions', 'pos-adverbs', 'wh-questions', 'struct-questions', 'struct-negatives', 'struct-imperatives'];
    var intermediate = ['passive-voice', 'reported-speech', 'intermediate-relative-clauses', 'intermediate-question-tags', 'intermediate-gerunds-infinitives', 'intermediate-discourse-markers'];
    var advanced = ['advanced-register', 'advanced-mixed-conditionals', 'advanced-inversion', 'advanced-modal-deduction', 'advanced-cohesion'];
    if (beginner.indexOf(lesson.id) >= 0) return 'beginner';
    if (elementary.indexOf(lesson.id) >= 0) return 'elementary';
    if (intermediate.indexOf(lesson.id) >= 0) return 'intermediate';
    if (advanced.indexOf(lesson.id) >= 0) return 'advanced';
    if (lesson.tag === 'Conditional' || lesson.tag === 'Modals' || lesson.tag === 'Linking' || lesson.tag === 'Comparison') return 'pre-intermediate';
    return 'pre-intermediate';
  }

  function grammarEnglishOnly(html) {
    var markers = /^(Mampiasa|Ny |Raha |Ampiasao|Misy |Tsy |Aza |Tsarovy|Samihafa|Karazana|Mba |Tsy ara-dalàna|Manana)/;
    return String(html || '').split('<br>').filter(function (part) {
      var plain = part.replace(/<[^>]*>/g, '').trim();
      return !markers.test(plain);
    }).join('<br>');
  }

  function renderGrammar() {
    var content = $('grammarContent');
    var filters = $('grammarFilters');
    if (!content) return;

    var availableLessons = levelFiltered(GRAMMAR_LESSONS, grammarLevel);
    var selected = availableLessons.find(function (lesson) { return lesson.id === state.grammarId; }) || availableLessons[0];
    state.grammarId = selected ? selected.id : null;
    var tagClass = { tense: 'tag-tense', pos: 'tag-pos', structure: 'tag-structure', Conditional: 'tag-tense', Modals: 'tag-pos', Voice: 'tag-structure', Reported: 'tag-structure', Linking: 'tag-structure', Comparison: 'tag-structure' };
    renderChoicePicker(filters, 'Choose a grammar lesson', availableLessons.map(function (lesson) {
      return { value: lesson.id, label: lesson.title + ' · ' + (lesson.tag || lesson.type) + ' · ' + levelInfo(grammarLevel(lesson)).label };
    }), selected ? selected.id : '', function (value) {
      state.grammarId = value;
      renderGrammar();
    });

    if (!selected) {
      content.innerHTML = '<div class="empty-state"><strong>No grammar lessons found.</strong></div>';
      return;
    }
    var explanation = levelIsEnglishOnly() ? grammarEnglishOnly(selected.explanation) : selected.explanation;
    var notes = levelIsEnglishOnly() ? grammarEnglishOnly(selected.notes) : selected.notes;
    content.innerHTML = '<div class="grammar-lesson selected-lesson">' +
      '<div class="lesson-header lesson-header-static">' +
        '<h3><span class="lesson-tag ' + (tagClass[selected.tag] || tagClass[selected.type] || '') + '">' + (selected.tag || selected.type) + '</span> ' + selected.title + '</h3>' +
        '<span class="lesson-selected-mark">Selected lesson</span>' +
      '</div>' +
      '<div class="lesson-body open">' +
         '<p class="explanation">' + explanation + '</p>' +
        '<h4>Structure</h4>' +
        '<div class="formula">' + selected.formula + '</div>' +
        '<h4>Examples</h4>' +
         '<ul class="example-list">' + selected.examples.map(function (e, i) {
           return '<li><span class="ex-en">' + e.en + '</span><br><span class="ex-mg">' + correctableMalagasy('grammar:' + selected.id + ':example:' + i, e.mg, 'Grammar example', e.en) + '</span></li>';
        }).join('') + '</ul>' +
         (notes ? '<div class="note-box">📌 ' + notes + '</div>' : '') +
      '</div>' +
    '</div>';
  }

  // ─── READING ─────────────────────────────────────────────────────────
  function renderReading() {
    var selector = $('readingSelector');
    var content = $('readingContent');
    if (!selector) return;
    var availablePassages = levelFiltered(READING_PASSAGES, function (passage) { return passage.level; });
    var selected = availablePassages.find(function (passage) { return passage.id === state.readingId; }) || availablePassages[0];
    state.readingId = selected ? selected.id : null;
    renderChoicePicker(selector, 'Choose a reading', availablePassages.map(function (p) {
      return { value: p.id, label: p.title + ' · ' + p.level + ' · ' + p.comprehension.length + ' questions' };
    }), state.readingId || '', function (value) {
      state.readingId = value;
      showReadingPassage(value);
    });
    if (state.readingId) showReadingPassage(state.readingId);
  }

  function showReadingPassage(id) {
    var p = READING_PASSAGES.find(function (r) { return r.id === id; });
    if (!p) return;
    var content = $('readingContent');

    content.innerHTML =
      '<div class="reading-passage">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<h3>' + p.title + '</h3>' +
          '<button class="btn btn-ghost btn-sm" id="readSpeakBtn">🔊 Read aloud</button>' +
        '</div>' +
        '<div class="passage-text">' + p.text + '</div>' +
        (p.vocabulary && p.vocabulary.length > 0
          ? '<div style="margin-bottom:1rem;"><h4 style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.4rem;">📖 Vocabulary from this text</h4>' +
            '<div style="display:flex;flex-wrap:wrap;gap:0.3rem;">' +
              p.vocabulary.map(function (v) { return '<span style="font-size:0.8rem;background:var(--slate-100);padding:0.15rem 0.5rem;border-radius:4px;"><strong>' + v.word + '</strong> = ' + correctableMalagasy('reading:' + p.id + ':vocab:' + v.word, v.mg, 'Reading vocabulary', v.word) + '</span>'; }).join('') +
            '</div></div>'
          : '') +
        '<div class="comprehension">' +
          '<h4>Comprehension Questions</h4>' +
          p.comprehension.map(function (c, i) {
            return '<div class="comp-question">' +
              '<div class="q">' + (i + 1) + '. ' + c.question + '</div>' +
              '<div class="comp-answer-form">' +
                '<input class="comp-response" data-id="' + p.id + '" data-idx="' + i + '" aria-label="Your answer to question ' + (i + 1) + '" placeholder="Write a short answer…" />' +
                '<button class="btn btn-outline btn-sm check-answer-btn" data-id="' + p.id + '" data-idx="' + i + '">Check</button>' +
              '</div>' +
              '<div class="comp-feedback" id="feedback-' + p.id + '-' + i + '" role="status" aria-live="polite"></div>' +
              '<div class="a" id="ans-' + p.id + '-' + i + '"><strong>Suggested answer:</strong> ' + c.answer + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';

    content.querySelectorAll('.check-answer-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ans = document.getElementById('ans-' + btn.dataset.id + '-' + btn.dataset.idx);
        var response = content.querySelector('.comp-response[data-id="' + btn.dataset.id + '"][data-idx="' + btn.dataset.idx + '"]');
        var feedback = document.getElementById('feedback-' + btn.dataset.id + '-' + btn.dataset.idx);
        var question = p.comprehension[Number(btn.dataset.idx)];
        var normalised = response.value.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
        var keywords = question.answer.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(function (word) {
          return word.length > 3 && ['that', 'they', 'there', 'with', 'from', 'were', 'have', 'does'].indexOf(word) < 0;
        });
        var uniqueKeywords = [...new Set(keywords)];
        var matches = uniqueKeywords.filter(function (word) { return normalised.indexOf(word) >= 0; }).length;
        var needed = Math.min(2, uniqueKeywords.length);
        if (!response.value.trim()) {
          feedback.className = 'comp-feedback warning';
          feedback.textContent = 'Write an answer first. You can check the suggested answer afterwards.';
          return;
        }
        feedback.className = 'comp-feedback ' + (matches >= needed ? 'correct' : 'try-again');
        feedback.textContent = matches >= needed ? '✅ Good answer!' : '💡 Good try — compare your answer with the suggested answer.';
        ans.classList.add('show');
        btn.disabled = true;
        response.disabled = true;
        if (content.querySelectorAll('.comp-feedback:not(:empty)').length === p.comprehension.length) {
          markActivity('reading:' + p.id);
          showToast('Reading complete! 📖', 'success');
        }
      });
    });

    var speakBtn = document.getElementById('readSpeakBtn');
    if (speakBtn) {
      speakBtn.addEventListener('click', function () {
        var text = p.text.replace(/<[^>]*>/g, ''); // strip HTML
        tts.speak(text, 0.8);
      });
    }
  }

  // ─── CONVERSATIONS ──────────────────────────────────────────────────
  function renderConversations() {
    var filters = $('convFilters');
    var list = $('convList');
    var detail = $('convDetail');
    if (!filters) return;

    var filter = state.convFilter;
    var availableConversations = levelFiltered(CONVERSATIONS, function (conversation) { return conversation.level; });
    var levels = ['All'];
    availableConversations.forEach(function (c) {
      if (levels.indexOf(c.level) < 0) levels.push(c.level);
    });
    if (filter && levels.indexOf(filter) < 0) {
      filter = null;
      state.convFilter = null;
    }

    renderChoicePicker(filters, 'Choose a level', levels.map(function (level) {
      return { value: level === 'All' ? '' : level, label: level };
    }), filter || '', function (value) {
      state.convFilter = value || null;
      renderConversations();
    });

    var convs = filter ? availableConversations.filter(function (c) { return c.level === filter; }) : availableConversations;

    var selected = convs.find(function (conversation) { return conversation.id === state.convId; }) || convs[0];
    state.convId = selected ? selected.id : null;
    renderChoicePicker(list, 'Choose a conversation', convs.map(function (c) {
      return { value: c.id, label: c.title + ' · ' + c.level + ' · ' + c.topic };
    }), state.convId || '', function (value) {
      state.convId = value;
      showConversation(value);
    });
    if (state.convId) showConversation(state.convId);
  }

  function showConversation(id) {
    var conv = CONVERSATIONS.find(function (c) { return c.id === id; });
    if (!conv) return;
    var detail = $('convDetail');

    detail.innerHTML =
      '<h3>' + conv.title + ' <span style="font-size:0.85rem;color:var(--text-secondary);font-weight:400;">(' + conv.level + ')</span></h3>' +
      '<div style="margin-bottom:0.8rem;">' +
        '<button class="btn btn-ghost btn-sm" id="convSpeakAll">🔊 Play all</button>' +
        '<span style="font-size:0.8rem;color:var(--text-secondary);margin-left:0.6rem;">Topic: ' + conv.topic + '</span>' +
      '</div>' +
       conv.lines.map(function (l, i) {
        var badgeClass = l.speaker === 'A' ? 'a' : 'b';
        return '<div class="conv-line">' +
          '<span class="speaker-badge ' + badgeClass + '">' + l.speaker + '</span>' +
          '<div>' +
            '<div class="conv-en">' + l.en + '</div>' +
             '<div class="conv-mg">' + correctableMalagasy('conversation:' + conv.id + ':' + i, l.mg, 'Conversation line', l.en) + '</div>' +
          '</div>' +
          '<button class="speak-btn" data-text="' + l.en.replace(/"/g, '&quot;') + '" aria-label="Listen to: ' + l.en.replace(/"/g, '&quot;') + '" title="Listen">🔊</button>' +
        '</div>';
      }).join('') +
      (conv.notes && conv.notes.length > 0
        ? '<div class="conv-notes"><h5>💡 Language Notes</h5><ul>' + conv.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>'
        : '');

    detail.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        tts.speak(btn.dataset.text);
      });
    });

    var allBtn = document.getElementById('convSpeakAll');
    if (allBtn) {
      allBtn.addEventListener('click', function () {
        var fullText = conv.lines.map(function (l) { return l.en; }).join('. ');
        tts.speak(fullText, 0.8);
      });
    }
  }

  // ─── WRITING ─────────────────────────────────────────────────────────
  function renderWriting() {
    var selector = $('writingSelector');
    var content = $('writingContent');
    if (!selector) return;
    var availableExercises = levelFiltered(WRITING_EXERCISES, function (exercise) { return exercise.level; });
    var selected = availableExercises.find(function (exercise) { return exercise.id === state.writingId; }) || availableExercises[0];
    state.writingId = selected ? selected.id : null;
    renderChoicePicker(selector, 'Choose a writing exercise', availableExercises.map(function (w) {
      return { value: w.id, label: w.title + ' · ' + w.level };
    }), state.writingId || '', function (value) {
      state.writingId = value;
      showWritingExercise(value);
    });
    if (state.writingId) showWritingExercise(state.writingId);
  }

  function showWritingExercise(id) {
    var w = WRITING_EXERCISES.find(function (ex) { return ex.id === id; });
    if (!w) return;
    var content = $('writingContent');

    content.innerHTML =
      '<div class="writing-exercise">' +
        '<h3>' + w.title + ' <span style="font-size:0.8rem;color:var(--text-secondary);font-weight:400;">(' + w.level + ')</span></h3>' +
        '<div class="instr">' + w.instructions + '</div>' +
        '<h4 style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:0.3rem;">✍️ Model</h4>' +
        '<div class="model-box">' + w.model + '</div>' +
        '<h4 style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:0.3rem;">📝 Your turn</h4>' +
        '<div class="writing-prompt">' + w.prompt + '</div>' +
        '<label class="writing-label" for="writingResponse">Write your answer here</label>' +
        '<textarea id="writingResponse" class="writing-response" rows="8" placeholder="Start writing in English…"></textarea>' +
        '<div class="writing-actions">' +
          '<button class="btn btn-primary btn-sm" id="saveWritingBtn">Save my writing</button>' +
          '<button class="btn btn-outline btn-sm" id="checkWritingBtn">Check my writing</button>' +
          '<button class="btn btn-ghost btn-sm" id="clearWritingBtn">Clear</button>' +
        '</div>' +
        '<div class="writing-feedback" id="writingFeedback" role="status" aria-live="polite"></div>' +
        (w.tips ? '<div class="tips-box">' + w.tips + '</div>' : '') +
      '</div>';

    var response = $('writingResponse');
    response.value = state.progress.writingDrafts[w.id] || '';
    response.addEventListener('input', function () {
      state.progress.writingDrafts[w.id] = response.value;
      saveProgress();
    });
    $('saveWritingBtn').addEventListener('click', function () {
      state.progress.writingDrafts[w.id] = response.value;
      saveProgress();
      showToast('Your writing has been saved on this device. 💾', 'success');
    });
    $('clearWritingBtn').addEventListener('click', function () {
      response.value = '';
      state.progress.writingDrafts[w.id] = '';
      saveProgress();
      $('writingFeedback').textContent = '';
    });
    $('checkWritingBtn').addEventListener('click', function () {
      var text = response.value.trim();
      var words = text ? text.split(/\s+/).length : 0;
      var sentences = text ? (text.match(/[.!?]+(?=\s|$)/g) || []).length : 0;
      var minimumSentences = w.level === 'Beginner' ? 4 : 5;
      var feedback = $('writingFeedback');
      if (!text) {
        feedback.className = 'writing-feedback warning';
        feedback.textContent = 'Write a few sentences first. You can use the model and tips for help.';
        return;
      }
      if (words < 15 || sentences < minimumSentences) {
        feedback.className = 'writing-feedback warning';
        feedback.textContent = 'Good start! Try to write at least ' + minimumSentences + ' sentences and add a little more detail.';
        return;
      }
      state.progress.writingDrafts[w.id] = response.value;
      saveProgress();
      markActivity('writing:' + w.id);
      feedback.className = 'writing-feedback success';
      feedback.textContent = 'Well done! You wrote ' + words + ' words in ' + sentences + ' sentences. Read it aloud once.';
    });
  }

  // ─── DRILLS ─────────────────────────────────────────────────────────
  function renderDrills() {
    var filters = $('drillFilters');
    var area = $('drillArea');
    if (!filters) return;

    var types = [
      { key: 'fillGap', label: 'Fill the Gap' },
      { key: 'correction', label: 'Find the Mistake' },
      { key: 'reorder', label: 'Reorder Words' },
    ];

    filters.innerHTML = types.map(function (t) {
      return '<button class="filter-chip' + (state.drillType === t.key ? ' active' : '') + '" data-type="' + t.key + '">' + t.label + '</button>';
    }).join('');

    filters.querySelectorAll('.filter-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.drillType = btn.dataset.type;
        state.drillQueue = [];
        state.drillScore = 0;
        state.drillCorrect = 0;
        state.drillIndex = 0;
        state.drillAnswered = false;
        renderDrills();
      });
    });

    if (state.drillRenderedType !== state.drillType || state.drillQueue.length === 0) startDrillSession();
    showDrill();
  }

  function startDrillSession() {
    var source = levelFiltered(DRILLS[state.drillType] || [], function (drill) { return drill.level; });
    state.drillQueue = shuffleArray([].concat(source)).slice(0, Math.min(5, source.length));
    state.drillScore = 0;
    state.drillCorrect = 0;
    state.drillIndex = 0;
    state.drillAnswered = false;
    state.drillRenderedType = state.drillType;
  }

  function showDrill() {
    var area = $('drillArea');
    var drills = state.drillQueue;
    if (!drills || drills.length === 0) {
      area.innerHTML = '<p style="color:var(--text-secondary);">No drills available.</p>';
      return;
    }

    if (state.drillIndex >= drills.length) {
      // Show completion
      area.innerHTML =
        '<div class="drill-card">' +
          '<div style="font-size:3rem;margin-bottom:0.5rem;">🎉</div>' +
          '<h3>Practice complete!</h3>' +
          '<p class="drill-session-score">' + state.drillCorrect + ' / ' + drills.length + ' correct</p>' +
          '<p style="color:var(--text-secondary);margin:0.5rem 0 1rem;">You answered a short ' + getDrillTypeLabel() + ' session.</p>' +
          '<button class="btn btn-primary" id="drillRestartBtn">Start again 🔄</button>' +
        '</div>';
      document.getElementById('drillRestartBtn').addEventListener('click', function () {
        startDrillSession();
        showDrill();
      });
      return;
    }

    var drill = drills[state.drillIndex];
    if (state.drillType === 'fillGap') showFillGapDrill(drill, area);
    else if (state.drillType === 'correction') showCorrectionDrill(drill, area);
    else if (state.drillType === 'reorder') showReorderDrill(drill, area);
  }

  function getDrillTypeLabel() {
    var labels = { fillGap: 'fill-the-gap', correction: 'error correction', reorder: 'reorder' };
    return labels[state.drillType] || 'drill';
  }

  function showFillGapDrill(d, area) {
    var sentenceHtml = d.sentence.replace(/___/g, '<span class="gap">?</span>');
    state.drillAnswered = false;

    area.innerHTML =
      '<div class="drill-card">' +
        '<span class="drill-level">' + d.level + ' · ' + d.topic + '</span>' +
        '<div class="drill-prompt">' + sentenceHtml + '</div>' +
        '<div class="drill-options" id="drillOpts">' +
          d.options.map(function (o) {
            return '<button class="drill-option" data-opt="' + o + '">' + o + '</button>';
          }).join('') +
        '</div>' +
        '<div class="drill-hint">💡 ' + d.hint + '</div>' +
        '<div class="drill-result" id="drillResult"></div>' +
        '<div style="margin-top:0.6rem;font-size:0.8rem;color:var(--text-secondary);">' +
          'Question ' + (state.drillIndex + 1) + ' of ' + state.drillQueue.length +
        '</div>' +
      '</div>';

    area.querySelectorAll('.drill-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (state.drillAnswered) return;
        state.drillAnswered = true;
        var isCorrect = btn.dataset.opt === d.answer;
        area.querySelectorAll('.drill-option').forEach(function (b) {
          if (b.dataset.opt === d.answer) b.classList.add('correct');
        });
        if (isCorrect) {
          state.drillCorrect++;
          btn.classList.remove('correct');
          btn.classList.add('correct');
          showToast('✅ Correct!', 'success');
          document.getElementById('drillResult').textContent = '✅ Correct! The answer is "' + d.answer + '".';
          document.getElementById('drillResult').className = 'drill-result correct';
        } else {
          btn.classList.add('wrong');
          document.getElementById('drillResult').textContent = '❌ The correct answer is "' + d.answer + '".';
          document.getElementById('drillResult').className = 'drill-result wrong';
        }
        state.drillScore++;
        markActivity('drill:' + d.id);
        if (isCorrect) markActivity('drill-correct:' + d.id);
        addDrillNextBtn();
      });
    });
  }

  function showCorrectionDrill(d, area) {
    state.drillAnswered = false;

    area.innerHTML =
      '<div class="drill-card">' +
        '<span class="drill-level">' + d.level + ' · ' + d.topic + '</span>' +
        '<div style="margin:0.8rem 0;font-size:0.9rem;color:var(--text-secondary);">Find the mistake in this sentence:</div>' +
        '<div class="drill-prompt" style="color:var(--red);">❌ ' + d.wrong + '</div>' +
        '<label class="drill-input-label" for="correctionResponse">Type the corrected sentence</label>' +
        '<input id="correctionResponse" class="drill-response-input" type="text" placeholder="Write the corrected sentence…" autocomplete="off" />' +
        '<button class="btn btn-primary btn-sm" id="checkCorrectionBtn">Check correction</button>' +
        '<div class="drill-result" id="drillResult"></div>' +
        '<div style="margin-top:0.6rem;font-size:0.8rem;color:var(--text-secondary);">' +
          'Question ' + (state.drillIndex + 1) + ' of ' + state.drillQueue.length +
        '</div>' +
      '</div>';

    document.getElementById('checkCorrectionBtn').addEventListener('click', function () {
      if (state.drillAnswered) return;
      var response = document.getElementById('correctionResponse');
      var normalised = response.value.replace(/[?.!]/g, '').trim().toLowerCase();
      var expected = d.right.replace(/[?.!]/g, '').trim().toLowerCase();
      if (!normalised) {
        document.getElementById('drillResult').textContent = 'Write a corrected sentence first.';
        document.getElementById('drillResult').className = 'drill-result wrong';
        return;
      }
      state.drillAnswered = true;
      var isCorrect = normalised === expected;
      if (isCorrect) {
        state.drillCorrect++;
        document.getElementById('drillResult').innerHTML = '✅ Correct!<br><span style="font-size:0.85rem;">' + d.explanation + '</span>';
        document.getElementById('drillResult').className = 'drill-result correct';
        showToast('✅ Correct!', 'success');
      } else {
        document.getElementById('drillResult').innerHTML = '❌ Correct sentence: <strong>' + d.right + '</strong><br><span style="font-size:0.85rem;">' + d.explanation + '</span>';
        document.getElementById('drillResult').className = 'drill-result wrong';
      }
      state.drillScore++;
      markActivity('drill:' + d.id);
      if (isCorrect) markActivity('drill-correct:' + d.id);
      response.disabled = true;
      document.getElementById('checkCorrectionBtn').disabled = true;
      addDrillNextBtn();
    });
  }

  function showReorderDrill(d, area) {
    var shuffledWords = shuffleArray([].concat(d.words));
    state.drillAnswered = false;
    var selected = [];

    area.innerHTML =
      '<div class="drill-card">' +
        '<span class="drill-level">' + d.level + ' · ' + d.topic + '</span>' +
        '<div style="margin:0.8rem 0;font-size:0.9rem;color:var(--text-secondary);">Tap the words in the correct order:</div>' +
        '<div class="drill-answer-area" id="drillAnswerArea"></div>' +
        '<div class="drill-words" id="drillWords">' +
          shuffledWords.map(function (w) { return '<button class="drill-word" type="button" data-word="' + w + '">' + w + '</button>'; }).join('') +
        '</div>' +
        '<div style="display:flex;gap:0.4rem;justify-content:center;flex-wrap:wrap;">' +
          '<button class="btn btn-outline btn-sm" id="drillClearBtn">Clear ✋</button>' +
          '<button class="btn btn-primary btn-sm" id="drillCheckBtn">Check ✔️</button>' +
        '</div>' +
        '<div class="drill-result" id="drillResult"></div>' +
        '<div style="margin-top:0.6rem;font-size:0.8rem;color:var(--text-secondary);">' +
          'Question ' + (state.drillIndex + 1) + ' of ' + state.drillQueue.length +
        '</div>' +
      '</div>';

    function updateAnswerArea() {
      var area = document.getElementById('drillAnswerArea');
      area.innerHTML = selected.map(function (w) { return '<span style="display:inline-block;padding:0.2rem 0.5rem;background:var(--blue);color:#fff;border-radius:4px;margin:0.15rem;">' + w + '</span>'; }).join('') || '<span style="color:var(--text-muted);">Tap words above to build your sentence…</span>';
    }

    area.querySelectorAll('.drill-word').forEach(function (span) {
      span.addEventListener('click', function () {
        if (state.drillAnswered) return;
        var word = span.dataset.word;
        var idx = selected.indexOf(word);
        if (idx >= 0) {
          selected.splice(idx, 1);
          span.classList.remove('selected');
        } else {
          selected.push(word);
          span.classList.add('selected');
        }
        updateAnswerArea();
      });
    });

    document.getElementById('drillClearBtn').addEventListener('click', function () {
      if (state.drillAnswered) return;
      selected = [];
      area.querySelectorAll('.drill-word').forEach(function (s) { s.classList.remove('selected'); });
      updateAnswerArea();
    });

    document.getElementById('drillCheckBtn').addEventListener('click', function () {
      if (state.drillAnswered) return;
      state.drillAnswered = true;
      var userAnswer = selected.join(' ') + (selected.length > 0 && !selected[selected.length-1].endsWith('?') && !selected[selected.length-1].endsWith('.') ? '.' : '');
      // Normalise for comparison
      var isCorrect = userAnswer.replace(/[?.!]/g, '').trim().toLowerCase() === d.correct.replace(/[?.!]/g, '').trim().toLowerCase();
      var res = document.getElementById('drillResult');
      if (isCorrect) {
        state.drillCorrect++;
        res.innerHTML = '✅ Perfect! "' + d.correct + '"';
        res.className = 'drill-result correct';
        showToast('✅ Correct!', 'success');
      } else {
        res.innerHTML = '❌ The correct order is: <strong>"' + d.correct + '"</strong>';
        res.className = 'drill-result wrong';
      }
      markActivity('drill:' + d.id);
      if (isCorrect) markActivity('drill-correct:' + d.id);
      addDrillNextBtn();
    });
  }

  function addDrillNextBtn() {
    var area = $('drillArea');
    var nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'Next →';
    nextBtn.style.margin = '1rem auto 0';
    nextBtn.style.display = 'block';
    nextBtn.addEventListener('click', function () {
      state.drillIndex++;
      showDrill();
    });
    area.querySelector('.drill-card').appendChild(nextBtn);
  }

  // ─── LISTENING ───────────────────────────────────────────────────────
  function listeningLevel(section) {
    if (section.id === 'listen-minimal-pairs' || section.id === 'listen-tips') return 'beginner';
    if (section.id === 'listen-th-sounds' || section.id === 'listen-vowel-length') return 'elementary';
    if (section.id === 'listen-connected-speech' || section.id === 'listen-intonation') return 'intermediate';
    if (section.id === 'listen-advanced-discourse' || section.id === 'listen-formal-intonation' || section.id === 'listen-lecture-notes') return 'advanced';
    if (section.id === 'listen-sentence-stress' || section.id === 'listen-phonological-endings') return 'pre-intermediate';
    return 'pre-intermediate';
  }

  function renderListening() {
    var selector = $('listeningSelector');
    var content = $('listeningContent');
    if (!content) return;

    var availableSections = levelFiltered(LISTENING_DATA.sections, listeningLevel);
    var selected = availableSections.find(function (section) { return section.id === state.listeningId; }) || availableSections[0];
    state.listeningId = selected ? selected.id : null;
    if (selector) renderChoicePicker(selector, 'Choose a listening lesson', availableSections.map(function (section) {
      return { value: section.id, label: section.title + ' · ' + levelInfo(listeningLevel(section)).label };
    }), state.listeningId || '', function (value) {
      state.listeningId = value;
      renderListening();
    });
    if (!selected) {
      content.innerHTML = '<div class="empty-state"><strong>No listening lessons found.</strong></div>';
      return;
    }
    var s = selected;
    content.innerHTML = '<div class="listen-section"><h3>' + s.title + '</h3><p>' + s.description + '</p>' +
      (s.descriptionMg ? '<p class="listen-description-mg">' + correctableMalagasy('listening:' + s.id + ':description', s.descriptionMg, 'Listening lesson description', s.description.replace(/<[^>]*>/g, ' ')) + '</p>' : '') +
      (s.pairs && s.pairs.length > 0 ? '<div style="margin-top:0.8rem;">' + s.pairs.map(function (p) {
        return '<div class="minimal-pair">' +
          '<span class="sound-a">' + p.a + '</span><span class="sound-divider">|</span><span class="sound-b">' + p.b + '</span>' +
          '<span class="sound-ipa">' + p.ipa + '</span>' +
          '<button class="speak-btn" data-first="' + p.a + '" data-second="' + p.b + '" aria-label="Listen to ' + p.a + ' and ' + p.b + ' separately" title="Listen to both words separately">🔊</button>' +
        '</div>' + (p.note ? '<div style="font-size:0.78rem;color:var(--text-secondary);margin:-0.2rem 0 0.4rem 0.8rem;">💬 ' + p.note + '</div>' : '');
      }).join('') + '</div>' : '') + '</div>';

    content.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Use two utterances with a real pause so pairs such as "live | leave"
        // cannot be blended together by the speech engine.
        tts.speakPair(btn.dataset.first, btn.dataset.second, 0.7);
      });
    });
  }

  // ─── SPEAKING ─────────────────────────────────────────────────────────
  function speakingLevel(prompt, index) {
    if (prompt.level) return prompt.level;
    if (index < 6) return 'beginner';
    if (index < 12) return 'elementary';
    return 'pre-intermediate';
  }

  function getSpeechRecognition() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function normaliseSpeech(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/\bi'm\b/g, 'i am')
      .replace(/\byou're\b/g, 'you are')
      .replace(/\bhe's\b/g, 'he is')
      .replace(/\bshe's\b/g, 'she is')
      .replace(/\bit's\b/g, 'it is')
      .replace(/\bthat's\b/g, 'that is')
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getSpeechMatchScore(expected, heard) {
    var expectedText = normaliseSpeech(expected);
    var heardText = normaliseSpeech(heard);
    if (!expectedText || !heardText) return 0;
    if (expectedText === heardText) return 100;
    var expectedWords = expectedText.split(' ');
    var heardWords = heardText.split(' ');
    var matches = expectedWords.filter(function (word) { return heardWords.indexOf(word) >= 0; }).length;
    return Math.round((matches / expectedWords.length) * 100);
  }

  function renderSpeaking() {
    var picker = $('speakingPicker');
    var content = $('speakingContent');
    if (!picker || !content) return;

    var availablePrompts = levelFiltered(SPEAKING_PROMPTS, function (prompt) { return speakingLevel(prompt, SPEAKING_PROMPTS.indexOf(prompt)); });
    if (!availablePrompts.length) {
      content.innerHTML = '<div class="empty-state"><strong>No speaking prompts are available for this level yet.</strong><span>Return to the course map and choose another unit.</span></div>';
      return;
    }
    var selected = availablePrompts.find(function (prompt) { return prompt.id === state.speakingId; }) || availablePrompts[0];
    state.speakingId = selected.id;
    var supported = !!getSpeechRecognition();
    var completed = !!state.progress.activities['speaking:' + selected.id];
    var currentIndex = availablePrompts.findIndex(function (prompt) { return prompt.id === selected.id; });
    var nextPrompt = availablePrompts[(currentIndex + 1) % availablePrompts.length];

    renderChoicePicker(picker, 'Choose a sentence', availablePrompts.map(function (prompt) {
      var done = !!state.progress.activities['speaking:' + prompt.id];
      return { value: prompt.id, label: (done ? '✅ ' : '') + prompt.category + ' · ' + prompt.target };
    }), selected.id, function (value) {
      stopSpeakingRecognition();
      state.speakingId = value;
      renderSpeaking();
    });

    content.innerHTML =
      '<article class="speaking-card">' +
         '<div class="speaking-card-heading"><div><span class="eyebrow">' + (completed ? 'Practised successfully' : 'Say this sentence') + '</span>' +
          '<h3>' + selected.category + '</h3></div><span class="speaking-step">' + (currentIndex + 1) + ' / ' + availablePrompts.length + '</span></div>' +
        '<div class="speaking-target">' + selected.target + '</div>' +
         '<div class="speaking-translation"><strong>Malagasy:</strong> ' + correctableMalagasy('speaking:' + selected.id, selected.mg, 'Speaking sentence', selected.target) + '</div>' +
        '<div class="speaking-tip">💡 ' + selected.tip + '</div>' +
        (supported ? '' : '<div class="speaking-browser-note" role="alert">Your browser does not provide speech recognition here. Try Chrome or Edge on <strong>localhost</strong> or an HTTPS website, or use the speaker button to practise aloud.</div>') +
        '<div class="speaking-actions">' +
          '<button class="btn btn-outline" id="speakListenBtn">🔊 Listen first</button>' +
          '<button class="btn btn-primary" id="startSpeakingBtn"' + (supported ? '' : ' disabled') + '>🎙️ Start speaking</button>' +
          '<button class="btn btn-danger" id="stopSpeakingBtn" disabled>⏹ Stop</button>' +
        '</div>' +
        '<div class="speaking-status" id="speakingStatus" role="status" aria-live="polite">' + (supported ? 'When you are ready, press Start speaking. Your browser may ask for microphone permission.' : 'Speech recognition is not available in this browser.') + '</div>' +
        '<div class="speaking-transcript" id="speakingTranscript"><span class="transcript-label">What the browser heard</span><span class="transcript-text">Nothing yet.</span></div>' +
        '<div class="speaking-result" id="speakingResult" aria-live="polite"></div>' +
        '<button class="btn btn-ghost btn-sm speaking-next-btn" id="nextSpeakingBtn">Next sentence →</button>' +
      '</article>';

    $('speakListenBtn').addEventListener('click', function () { tts.speak(selected.target, 0.75); });
    $('startSpeakingBtn').addEventListener('click', function () { startSpeakingRecognition(selected); });
    $('stopSpeakingBtn').addEventListener('click', stopSpeakingRecognition);
    $('nextSpeakingBtn').addEventListener('click', function () {
      stopSpeakingRecognition();
      state.speakingId = nextPrompt.id;
      renderSpeaking();
    });
  }

  function stopSpeakingRecognition() {
    if (speakingRecognition) {
      speakingRecognition.stop();
      speakingRecognition = null;
    }
    var startButton = $('startSpeakingBtn');
    var stopButton = $('stopSpeakingBtn');
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
  }

  function startSpeakingRecognition(prompt) {
    var Recognition = getSpeechRecognition();
    if (!Recognition) {
      showToast('Speech recognition is not available in this browser.', 'error');
      return;
    }
    stopSpeakingRecognition();

    var recognition = new Recognition();
    var finalTranscript = '';
    var hadRecognitionError = false;
    speakingRecognition = recognition;
    recognition.lang = tts.preferredLocale();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var startButton = $('startSpeakingBtn');
    var stopButton = $('stopSpeakingBtn');
    var status = $('speakingStatus');
    var transcriptText = $('speakingTranscript').querySelector('.transcript-text');
    startButton.disabled = true;
    stopButton.disabled = false;
    status.textContent = 'Listening… say the sentence now.';
    $('speakingResult').innerHTML = '';

    recognition.onresult = function (event) {
      var interimTranscript = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += text + ' ';
        else interimTranscript += text;
      }
      transcriptText.textContent = (finalTranscript + interimTranscript).trim() || 'Listening…';
    };

    recognition.onerror = function (event) {
      hadRecognitionError = true;
      var message = 'Something went wrong. Please try again.';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') message = 'Microphone access was blocked. Allow microphone access and try again.';
      else if (event.error === 'no-speech') message = 'I did not hear anything. Try speaking a little louder.';
      else if (event.error === 'audio-capture') message = 'No microphone was found. Check your microphone and try again.';
      status.textContent = message;
      showToast(message, 'error');
    };

    recognition.onend = function () {
      if (speakingRecognition === recognition) speakingRecognition = null;
      startButton.disabled = false;
      stopButton.disabled = true;
      var heard = finalTranscript.trim();
      if (heard) showSpeakingResult(prompt, heard);
      else if (!hadRecognitionError) status.textContent = 'No words were captured. Press Start speaking and try again.';
    };

    try {
      recognition.start();
    } catch (_) {
      status.textContent = 'The microphone is busy. Wait a moment and try again.';
      startButton.disabled = false;
      stopButton.disabled = true;
      speakingRecognition = null;
    }
  }

  function showSpeakingResult(prompt, heard) {
    var score = getSpeechMatchScore(prompt.target, heard);
    var result = $('speakingResult');
    var message;
    if (score === 100) message = 'Excellent! That matches the sentence exactly. 🌟';
    else if (score >= 70) message = 'Great work! Most of the sentence was clear. Practise it once more for a perfect match.';
    else if (score >= 40) message = 'Good try. Listen again, then repeat the sentence slowly.';
    else message = 'Keep practising. Use the speaker button and try one short part at a time.';
    result.className = 'speaking-result ' + (score >= 70 ? 'success' : 'needs-practice');
    result.innerHTML = '<div class="speaking-score">' + score + '% <span>match</span></div><div><strong>' + message + '</strong><br><span>Target: ' + prompt.target + '</span></div>';
    $('speakingStatus').textContent = 'Practice finished. You can try again or choose the next sentence.';
    if (score >= 70) {
      markActivity('speaking:' + prompt.id);
      renderSpeakingPickerOnly();
    }
  }

  function renderSpeakingPickerOnly() {
    var picker = $('speakingPicker');
    if (!picker) return;
    picker.querySelectorAll('.content-picker-option').forEach(function (option) {
      var prompt = SPEAKING_PROMPTS.find(function (item) { return item.id === option.dataset.value; });
      if (!prompt) return;
      var done = !!state.progress.activities['speaking:' + prompt.id];
      option.textContent = (done ? '✅ ' : '') + prompt.category + ' · ' + prompt.target;
    });
  }

  // ─── DAILY DEVOTIONAL ────────────────────────────────────────────────
  // A one-year (365 day) Bible topic devotional. Every day has a topic, a
  // verse (World English Bible, public domain), a "big idea" and three new
  // English words to learn. Its progress lives inside
  // state.progress.devotional so it never disturbs the main VOCABULARY
  // percentages.
  var DEV_TOTAL = 365;

  function devEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function devTodayDay() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var day = Math.floor((now - start) / 86400000);
    if (!day || day < 1) day = 1;
    if (day > DEV_TOTAL) day = DEV_TOTAL; // leap years stay inside the year
    return day;
  }

  function devEntry(day) {
    return (typeof DEVOTIONAL !== 'undefined' && DEVOTIONAL[day - 1]) || null;
  }

  function devState() {
    if (!state.progress.devotional) state.progress.devotional = { days: {}, words: {} };
    if (!state.progress.devotional.days) state.progress.devotional.days = {};
    if (!state.progress.devotional.words) state.progress.devotional.words = {};
    return state.progress.devotional;
  }

  function devWordId(day, index) { return 'dev-' + day + '-' + index; }

  function devWordObjects(day) {
    var entry = devEntry(day);
    if (!entry) return [];
    return entry.words.map(function (w, i) {
      return {
        id: devWordId(day, i),
        word: w.word,
        malagasy: w.malagasy,
        example: w.example,
        emoji: entry.month.emoji,
        usNote: null,
      };
    });
  }

  function markDevWord(day, index) {
    var ds = devState();
    var id = devWordId(day, index);
    if (ds.words[id]) return false;
    ds.words[id] = true;
    state.progress.stars = (state.progress.stars || 0) + 2;
    updateStreak();
    recordDay();
    saveProgress();
    updateStatsUI();
    if (settings.autoSpeak) {
      var entry = devEntry(day);
      if (entry) tts.speak(entry.words[index].word);
    }
    return true;
  }

  function unmarkDevWord(day, index) {
    var ds = devState();
    var id = devWordId(day, index);
    if (!ds.words[id]) return false;
    delete ds.words[id];
    saveProgress();
    return true;
  }

  function devDayComplete(day) { return !!devState().days[String(day)]; }

  function devDayWordsLearned(day) {
    var ds = devState();
    var entry = devEntry(day);
    if (!entry) return 0;
    var n = 0;
    entry.words.forEach(function (w, i) { if (ds.words[devWordId(day, i)]) n++; });
    return n;
  }

  function markDevDay(day) {
    var ds = devState();
    var key = String(day);
    if (ds.days[key]) return false;
    ds.days[key] = true;
    state.progress.stars = (state.progress.stars || 0) + 3;
    updateStreak();
    recordDay();
    saveProgress();
    updateStatsUI();
    return true;
  }

  function getDevDaysRead() { return Object.keys(devState().days).length; }
  function getDevWordsLearned() { return Object.keys(devState().words).length; }

  function devWordFromId(id) {
    var m = /^dev-(\d+)-(\d+)$/.exec(id || '');
    if (!m) return null;
    return { day: parseInt(m[1], 10), index: parseInt(m[2], 10) };
  }

  function devQuizPool(day) {
    var pool = [];
    var start = Math.max(1, day - 6);
    for (var d = start; d <= day; d++) pool = pool.concat(devWordObjects(d));
    return pool;
  }

  var DEV_MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function devMonthMeta(n) {
    return DEVOTIONAL_MONTHS.filter(function (m) { return m.n === n; })[0] || DEVOTIONAL_MONTHS[0];
  }

  function devFirstDayOfMonth(n) {
    var acc = 1;
    for (var i = 0; i < DEVOTIONAL_MONTHS.length; i++) {
      if (DEVOTIONAL_MONTHS[i].n === n) return acc;
      acc += DEVOTIONAL_MONTHS[i].days;
    }
    return 1;
  }

  function renderDevotional() {
    var host = $('devotionalBody');
    if (!host) return;
    if (typeof DEVOTIONAL === 'undefined' || !DEVOTIONAL.length) {
      host.innerHTML = '<p class="empty-note">The devotional content could not be loaded.</p>';
      return;
    }

    var today = devTodayDay();
    var day = state.devDay || today;
    if (day < 1) day = 1;
    if (day > DEV_TOTAL) day = DEV_TOTAL;
    state.devDay = day;

    var entry = devEntry(day);
    var month = entry.month;
    state.devMonth = state.devMonth || month.n;
    var isToday = day === today;
    var complete = devDayComplete(day);
    var wordsLearned = devDayWordsLearned(day);
    var verseText = entry.verse ||
      (typeof DEVOTIONAL_VERSES !== 'undefined' && DEVOTIONAL_VERSES[entry.ref]) ||
      'Verse text is loading…';

    var monthChips = DEVOTIONAL_MONTHS.map(function (m) {
      return '<button class="dev-month-chip' + (m.n === state.devMonth ? ' active' : '') + '" data-dev-month="' + m.n + '" title="' + devEsc(m.name) + ' · ' + devEsc(m.nameMg) + '">' +
        '<span class="dmc-emoji">' + m.emoji + '</span><span class="dmc-label">' + DEV_MONTH_SHORT[m.n - 1] + '</span></button>';
    }).join('');

    var firstDay = devFirstDayOfMonth(state.devMonth);
    var mDays = devMonthMeta(state.devMonth).days;
    var dayChips = '';
    for (var i = 0; i < mDays; i++) {
      var d = firstDay + i;
      var cls = 'dev-day-chip';
      if (d === day) cls += ' current';
      if (devDayComplete(d)) cls += ' read';
      if (d === today) cls += ' today';
      dayChips += '<button class="' + cls + '" data-dev-day="' + d + '">' + d + '</button>';
    }

    var wordCards = entry.words.map(function (w, idx) {
      var learned = !!devState().words[devWordId(day, idx)];
      return '<article class="dev-word-card' + (learned ? ' learned' : '') + '">' +
        '<div class="dwc-top">' +
          '<span class="dwc-emoji" aria-hidden="true">' + month.emoji + '</span>' +
          '<div class="dwc-text">' +
            '<div class="dwc-word">' + devEsc(w.word) + '</div>' +
            '<div class="dwc-mg">' + correctableMalagasy('devotional:' + day + ':word:' + idx, w.malagasy, 'Devotional word', w.word) + '</div>' +
          '</div>' +
          '<button class="icon-btn dev-speak" data-dev-speak-word="' + devEsc(w.word) + '" type="button" aria-label="Hear ' + devEsc(w.word) + '">🔊</button>' +
        '</div>' +
        '<p class="dwc-example">' + devEsc(w.example) + '</p>' +
        '<button class="dwc-toggle" data-dev-word="' + idx + '" type="button" aria-pressed="' + (learned ? 'true' : 'false') + '">' +
          (learned ? '✅ Learned' : '✓ Mark as learned') +
        '</button>' +
      '</article>';
    }).join('');

    host.innerHTML =
      '<div class="dev-progress-strip">' +
        '<div class="dev-stat"><span class="dev-stat-ico">📖</span><div><strong>' + getDevDaysRead() + '</strong><span>/ 365 days read</span></div></div>' +
        '<div class="dev-stat"><span class="dev-stat-ico">🔤</span><div><strong>' + getDevWordsLearned() + '</strong><span>words learned</span></div></div>' +
        '<div class="dev-stat dev-stat-today"><span class="dev-stat-ico">📅</span><div><strong>Day ' + today + '</strong><span>is today</span></div></div>' +
      '</div>' +

      '<div class="dev-hero">' +
        '<div class="dev-hero-bar">' +
          '<span class="dev-month-badge">' + month.emoji + ' ' + devEsc(month.name) + ' <em>· ' + devEsc(month.nameMg) + '</em></span>' +
          '<span class="dev-daynum">Day ' + day + ' <span class="dev-of">of 365</span>' + (isToday ? ' <span class="dev-today-tag">Today</span>' : '') + '</span>' +
        '</div>' +
        '<h3 class="dev-topic">' + devEsc(entry.topic) + '</h3>' +
         '<p class="dev-topic-mg">' + correctableMalagasy('devotional:' + day + ':topic', entry.topicMg, 'Devotional topic', entry.topic) + '</p>' +
        '<blockquote class="dev-verse">' +
          '<p class="dev-verse-text">' + devEsc(verseText) + '</p>' +
          '<div class="dev-verse-foot">' +
            '<cite class="dev-verse-ref">— ' + devEsc(entry.ref) + '</cite>' +
            '<button class="btn btn-ghost btn-sm dev-speak" data-dev-speak-verse="1" type="button">🔊 Listen</button>' +
          '</div>' +
        '</blockquote>' +
        '<div class="dev-idea">' +
          '<p class="dev-idea-en">💡 ' + devEsc(entry.idea) + '</p>' +
           '<p class="dev-idea-mg">' + correctableMalagasy('devotional:' + day + ':idea', entry.ideaMg, 'Devotional idea', entry.idea) + '</p>' +
        '</div>' +
        '<div class="dev-hero-nav">' +
          '<button class="btn btn-outline btn-sm" data-dev-nav="-1" type="button"' + (day <= 1 ? ' disabled' : '') + '>‹ Previous</button>' +
          '<button class="btn btn-ghost btn-sm" data-dev-today type="button"' + (isToday ? ' disabled' : '') + '>Today</button>' +
          '<button class="btn btn-outline btn-sm" data-dev-nav="1" type="button"' + (day >= DEV_TOTAL ? ' disabled' : '') + '>Next ›</button>' +
        '</div>' +
      '</div>' +

      '<div class="dev-words">' +
        '<h3 class="dev-section-title">Words to learn today <span class="dev-count">' + wordsLearned + ' / ' + entry.words.length + '</span></h3>' +
        '<div class="dev-word-grid">' + wordCards + '</div>' +
      '</div>' +

      '<div class="dev-actions">' +
        '<button class="btn btn-primary" id="devQuizBtn" type="button">Quiz this week\'s words 🎯</button>' +
        '<button class="btn btn-outline" id="devMarkDayBtn" type="button"' + (complete ? ' disabled' : '') + '>' + (complete ? '✅ Day completed' : 'Mark day as read ✓') + '</button>' +
      '</div>' +

      '<div class="dev-browse">' +
        '<h3 class="dev-section-title">Browse the year</h3>' +
        '<div class="dev-month-strip">' + monthChips + '</div>' +
        '<div class="dev-day-strip">' + dayChips + '</div>' +
      '</div>';

    devBind(host, day);
  }

  function devBind(host, day) {
    host.querySelectorAll('[data-dev-nav]').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = (state.devDay || day) + parseInt(b.dataset.devNav, 10);
        if (next < 1) next = 1;
        if (next > DEV_TOTAL) next = DEV_TOTAL;
        state.devDay = next;
        state.devMonth = devEntry(next).month.n;
        renderDevotional();
      });
    });
    var todayBtn = host.querySelector('[data-dev-today]');
    if (todayBtn) todayBtn.addEventListener('click', function () {
      state.devDay = devTodayDay();
      state.devMonth = devEntry(state.devDay).month.n;
      renderDevotional();
    });

    host.querySelectorAll('[data-dev-word]').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(b.dataset.devWord, 10);
        var wasLearned = !!devState().words[devWordId(day, idx)];
        if (wasLearned) {
          unmarkDevWord(day, idx);
          showToast('Word moved back to "to learn".', '');
        } else {
          markDevWord(day, idx);
          showToast('"' + devEntry(day).words[idx].word + '" learned! +2 ⭐', 'success');
        }
        renderDevotional();
      });
    });

    host.querySelectorAll('[data-dev-speak-word]').forEach(function (b) {
      b.addEventListener('click', function () { tts.speak(b.dataset.devSpeakWord); });
    });
    var verseBtn = host.querySelector('[data-dev-speak-verse]');
    if (verseBtn) verseBtn.addEventListener('click', function () {
      var entry = devEntry(day);
      tts.speak(entry.topic + '. ' + (entry.verse || entry.idea), 0.82);
    });

    host.querySelectorAll('[data-dev-month]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.devMonth = parseInt(b.dataset.devMonth, 10);
        renderDevotional();
      });
    });
    host.querySelectorAll('[data-dev-day]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.devDay = parseInt(b.dataset.devDay, 10);
        state.devMonth = devEntry(state.devDay).month.n;
        renderDevotional();
      });
    });

    var quizBtn = $('devQuizBtn');
    if (quizBtn) quizBtn.addEventListener('click', function () {
      var pool = devQuizPool(day);
      if (pool.length < 4) return showToast('Need at least four words for a quiz.', 'error');
      startQuiz(pool, 'Devotional · Day ' + day, function () { renderDevotional(); }, {
        questionLabel: 'Which English word matches this Malagasy word?',
        onCorrect: function (id) { var p = devWordFromId(id); if (p) markDevWord(p.day, p.index); },
        onWrong: function () {},
      });
    });

    var markDayBtn = $('devMarkDayBtn');
    if (markDayBtn) markDayBtn.addEventListener('click', function () {
      if (markDevDay(day)) showToast('Day ' + day + ' completed! +3 ⭐', 'success');
      renderDevotional();
    });
  }

  // ─── ALPHABET & ESSENTIALS ───────────────────────────────────────────
  var DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // A compact "word + IPA + Malagasy" card, reused for numbers, days and months.
  function alphaWordCard(v, leading) {
    var spoken = v.word.replace(/"/g, '&quot;');
    return '<article class="alpha-word">' +
      '<div class="aw-main">' +
        (leading || '') +
        '<div class="aw-text">' +
          '<div class="aw-word">' + v.word + ' <span class="aw-ipa">/' + v.phonetic + '/</span></div>' +
           '<div class="aw-mg">' + getVocabMalagasy(v) + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="speak-btn" data-word="' + spoken + '" aria-label="Listen to ' + spoken + '" title="Listen">🔊</button>' +
    '</article>';
  }

  // A phrase row for the "telling the time" and "distance" lists.
  function alphaPhrase(en, mg, emoji) {
    var spoken = en.replace(/"/g, '&quot;');
    return '<div class="alpha-phrase">' +
      '<span class="ap-emoji" aria-hidden="true">' + emoji + '</span>' +
      '<div class="ap-text">' +
        '<span class="ap-en">' + en + '</span>' +
        '<span class="ap-mg">' + correctableMalagasy('essentials:' + en, mg, 'Essentials phrase', en) + '</span>' +
      '</div>' +
      '<button class="speak-btn" data-word="' + spoken + '" aria-label="Listen to ' + spoken + '" title="Listen">🔊</button>' +
    '</div>';
  }

  function alphaSection(emoji, title, count, desc, inner) {
    return '<div class="alpha-section">' +
      '<div class="alpha-head">' +
        '<h3>' + emoji + ' ' + title +
          (count ? ' <span class="alpha-count">' + count + '</span>' : '') + '</h3>' +
        (desc ? '<p class="alpha-desc">' + desc + '</p>' : '') +
      '</div>' +
      inner +
    '</div>';
  }

  function renderAlphabet() {
    var host = $('alphabetBody');
    if (!host) return;

    var letters = ALPHABET.map(function (a) {
      return '<article class="alpha-letter">' +
        '<span class="al-letter">' + a.letter + '</span>' +
        '<span class="al-ipa">' + a.ipa + '</span>' +
        '<span class="al-key">' + a.emoji + ' ' + a.keyword + '</span>' +
        '<span class="al-mg">' + a.keywordMg + '</span>' +
        '<button class="speak-btn" data-word="' + a.letter + ' for ' + a.keyword + '" aria-label="Listen to the letter ' + a.letter + '" title="Listen">🔊</button>' +
      '</article>';
    }).join('');

    var numbers = VOCABULARY.filter(function (v) { return v.category === 'Numbers'; });
    var numberCards = numbers.map(function (v, i) {
      return alphaWordCard(v, '<span class="aw-num">' + (i + 1) + '</span>');
    }).join('');

    var days = VOCABULARY.filter(function (v) { return DAY_NAMES.indexOf(v.word) >= 0; });
    var dayCards = days.map(function (v, i) {
      return alphaWordCard(v, '<span class="aw-num">' + (i + 1) + '</span>');
    }).join('');

    var months = VOCABULARY.filter(function (v) { return v.category === 'Months'; });
    var monthCards = months.map(function (v, i) {
      return alphaWordCard(v, '<span class="aw-num">' + (i + 1) + '</span>');
    }).join('');

    var timePhrases = TIME_PHRASES.map(function (p) { return alphaPhrase(p.en, p.mg, p.emoji); }).join('');
    var measurePhrases = MEASURE_PHRASES.map(function (p) { return alphaPhrase(p.en, p.mg, p.emoji); }).join('');

    var learnedLetters = ALPHABET.length;

    var sections = {
      alphabet: alphaSection('🔤', 'The alphabet', learnedLetters + ' letters',
        'Every letter with the sound it makes (IPA), an example word and the Malagasy meaning. Tap 🔊 to hear “A for apple”.',
        '<div class="alpha-grid">' + letters + '</div>'),
      numbers: alphaSection('🔢', 'Numbers', '1 – 20',
        'Count from one to twenty in English.',
        '<div class="alpha-word-grid">' + numberCards + '</div>'),
      days: alphaSection('📅', 'Days of the week', '7 days',
        'Monday to Sunday, with the Malagasy names.',
        '<div class="alpha-word-grid">' + dayCards + '</div>'),
      months: alphaSection('🗓️', 'Months of the year', '12 months',
        'January to December, the twelve months of the year.',
        '<div class="alpha-word-grid">' + monthCards + '</div>'),
      time: alphaSection('⏰', 'Asking and telling the time', '',
        'Useful sentences for the time of day.',
        '<div class="alpha-phrase-list">' + timePhrases + '</div>'),
      measure: alphaSection('📏', 'Distance &amp; measuring', '',
        'Useful sentences for distance, length, height and weight.',
        '<div class="alpha-phrase-list">' + measurePhrases + '</div>'),
    };
    var sectionOptions = [
      { value: 'alphabet', label: 'The alphabet · Abidia' },
      { value: 'numbers', label: 'Numbers · Isa' },
      { value: 'days', label: 'Days of the week · Andro' },
      { value: 'months', label: 'Months of the year · Volana' },
      { value: 'time', label: 'Telling the time · Ora' },
      { value: 'measure', label: 'Distance & measuring · Fandrefesana' },
    ];
    state.alphabetSection = sections[state.alphabetSection] ? state.alphabetSection : 'alphabet';
    renderChoicePicker($('alphabetSelector'), 'Choose an essentials lesson', sectionOptions, state.alphabetSection, function (value) {
      state.alphabetSection = value;
      renderAlphabet();
    });
    host.innerHTML = sections[state.alphabetSection];

    host.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        tts.speak(btn.dataset.word);
      });
    });
  }

  // ─── PROGRESS ────────────────────────────────────────────────────────
  function renderProgress() {
    var dashboard = $('progressDashboard');
    if (!dashboard) return;

    var totalWords = VOCABULARY.length;
    var learnedCount = getLearnedCount();
    var pct = totalWords ? Math.round((learnedCount / totalWords) * 100) : 0;
    var completedLessons = Object.keys(state.progress.lessons || {}).length;
    var completedWriting = Object.keys(state.progress.activities || {}).filter(function (key) { return key.indexOf('writing:') === 0; }).length;
    var completedReading = Object.keys(state.progress.activities || {}).filter(function (key) { return key.indexOf('reading:') === 0; }).length;
    var completedDrills = Object.keys(state.progress.activities || {}).filter(function (key) { return key.indexOf('drill:') === 0; }).length;
    var correctDrills = Object.keys(state.progress.activities || {}).filter(function (key) { return key.indexOf('drill-correct:') === 0; }).length;
    var completedSpeaking = Object.keys(state.progress.activities || {}).filter(function (key) { return key.indexOf('speaking:') === 0; }).length;
    var classroomLearned = Object.keys(state.progress.classroom || {}).length;
    var devDaysRead = getDevDaysRead();
    var devWords = getDevWordsLearned();
    var devPct = Math.round((devDaysRead / DEV_TOTAL) * 100);
    var colours = ['#2563eb', '#7c3aed', '#d97706', '#16a34a', '#dc2626', '#e84393', '#0891b2', '#65a30d', '#ca8a04'];

    dashboard.innerHTML =
      '<div class="progress-hero">' +
        '<div class="ph-ring">' + ringPct(pct, 'Vocabulary', learnedCount + '/' + totalWords + ' words') + '</div>' +
        '<div class="ph-stats">' +
          '<div class="ph-stat"><strong>' + state.progress.stars + '</strong><span>⭐ Stars</span></div>' +
          '<div class="ph-stat"><strong>' + state.progress.streak + '</strong><span>🔥 Streak</span></div>' +
           '<div class="ph-stat"><strong>' + completedLessons + '/' + getCurrentCurriculumLessons().length + '</strong><span>' + selectedLevel().label + ' lessons</span></div>' +
          '<div class="ph-stat"><strong>' + devDaysRead + '/' + DEV_TOTAL + '</strong><span>Devotional</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="activity-summary">' +
        '<h3>Practice completed</h3>' +
        '<div class="activity-grid">' +
          '<div><strong>' + completedWriting + '/' + WRITING_EXERCISES.length + '</strong><span>writing tasks</span></div>' +
          '<div><strong>' + completedReading + '/' + READING_PASSAGES.length + '</strong><span>reading texts</span></div>' +
          '<div><strong>' + completedSpeaking + '/' + SPEAKING_PROMPTS.length + '</strong><span>speaking prompts</span></div>' +
          '<div><strong>' + correctDrills + '/' + completedDrills + '</strong><span>drills correct</span></div>' +
          '<div><strong>' + classroomLearned + '/' + CLASSROOM_PHRASES.length + '</strong><span>classroom phrases</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="activity-summary devotional-summary">' +
        '<h3>🕊️ Daily devotional</h3>' +
        '<div class="activity-grid">' +
          '<div><strong>' + devDaysRead + '/' + DEV_TOTAL + '</strong><span>days read</span></div>' +
          '<div><strong>' + devWords + '</strong><span>words learned</span></div>' +
          '<div><strong>' + devPct + '%</strong><span>of the year</span></div>' +
        '</div>' +
        '<div class="dev-progress-mini"><div class="dev-progress-mini-track"><div class="fill" style="width:' + devPct + '%;"></div></div></div>' +
      '</div>' +
      '<div class="progress-bar-group">' +
        '<h3>Progress by category</h3>' +
        CATEGORIES.map(function (cat, i) {
          var total = getTotalForCategory(cat.name);
          var learned = getLearnedForCategory(cat.name);
          var catPct = total ? Math.round((learned / total) * 100) : 0;
          var colour = colours[i % colours.length];
          return '<div class="progress-bar-item">' +
            '<div class="pbi-header"><span>' + cat.name + '</span><span class="pct">' + learned + '/' + total + ' (' + catPct + '%)</span></div>' +
            '<div class="progress-bar-track"><div class="fill" style="width:' + catPct + '%;background:' + colour + ';"></div></div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="streak-calendar">' +
        '<div class="sc-head"><span class="sc-title">Last 30 days</span><span class="sc-legend"><i class="sc-day sc-empty"></i> none <i class="sc-day sc-some"></i> some <i class="sc-day sc-full"></i> done</span></div>' +
        '<div class="sc-grid">' + streakCalendar() + '</div>' +
      '</div>' +
      '<div style="margin-top:1.5rem;text-align:center;">' +
        '<button class="btn btn-danger btn-sm" id="resetProgressBtn">Reset all progress</button>' +
      '</div>';

    document.getElementById('resetProgressBtn').addEventListener('click', function () {
      if (confirm('Reset all your progress? This cannot be undone.')) {
        state.progress = { learned: {}, stars: 0, streak: 0, lastDate: null, activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {}, saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {}, devotional: { days: {}, words: {} }, days: {} };
        saveProgress();
        updateStatsUI();
        showToast('Progress reset.', 'error');
        renderProgress();
        renderVocabulary();
        renderClassroom();
      }
    });
  }

  // ─── UTILITY ──────────────────────────────────────────────────────────
  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // ─── INIT ─────────────────────────────────────────────────────────────
  function init() {
    applyTheme();
    applyTextSize();
    applyPreferences();
    syncSettingsUI();
    updateStatsUI();
    renderGlobalCourseBar();

    // Navigation — sidebar, bottom tab bar and the More sheet share .nav-tab.
    document.querySelectorAll('.nav-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { switchTab(tab.dataset.view); });
    });

    document.querySelectorAll('[data-quick-view]').forEach(function (button) {
      button.addEventListener('click', function () { switchTab(button.dataset.quickView); });
    });

    document.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('.mg-edit-btn') : null;
      if (!button) return;
      event.stopPropagation();
      openTextCorrection(button.dataset.correctionId, button.dataset.original, button.dataset.correctionLabel, button.dataset.english);
    });

    // Bottom "More" button and the settings entry points.
    var moreBtn = document.getElementById('moreBtn');
    if (moreBtn) moreBtn.addEventListener('click', function () { showSheet('moreSheet'); });
    ['settingsBtn', 'sidebarSettingsBtn', 'moreSettingsBtn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function () { showSheet('settingsSheet'); });
    });

    // Quick day / night switch in the header.
    var themeToggle = document.getElementById('themeToggleBtn');
    if (themeToggle) themeToggle.addEventListener('click', function () {
      settings.theme = resolveDark() ? 'light' : 'dark';
      saveSettings();
      applyTheme();
      syncSettingsUI();
    });

    // Sheet dismissal.
    document.querySelectorAll('[data-close-sheet]').forEach(function (button) {
      button.addEventListener('click', hideSheet);
    });
    var scrim = document.getElementById('scrim');
    if (scrim) scrim.addEventListener('click', hideSheet);

    // Settings controls.
    var themeSeg = document.getElementById('themeSeg');
    if (themeSeg) themeSeg.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () {
        settings.theme = button.dataset.themeChoice;
        saveSettings();
        applyTheme();
        syncSettingsUI();
      });
    });
    var sizeSeg = document.getElementById('sizeSeg');
    if (sizeSeg) sizeSeg.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () {
        settings.textSize = button.dataset.sizeChoice;
        saveSettings();
        applyTextSize();
        syncSettingsUI();
      });
    });
    var learningLevel = document.getElementById('learningLevel');
    if (learningLevel) learningLevel.addEventListener('change', function () {
      setLearningLevel(learningLevel.value);
    });
    var rateRange = document.getElementById('rateRange');
    if (rateRange) rateRange.addEventListener('input', function () {
      settings.speechRate = parseFloat(rateRange.value) || 0.85;
      saveSettings();
      var rateValue = document.getElementById('rateValue');
      if (rateValue) rateValue.textContent = describeRate(settings.speechRate);
      tts.speak('Hello, how are you?');
    });
    var voiceAccent = document.getElementById('voiceAccent');
    if (voiceAccent) voiceAccent.addEventListener('change', function () {
      settings.voiceAccent = voiceAccent.value === 'american' ? 'american' : 'british';
      saveSettings();
      tts.syncVoicePreference();
      syncSettingsUI();
      tts.speak('Hello, how are you?');
    });
    var voiceGender = document.getElementById('voiceGender');
    if (voiceGender) voiceGender.addEventListener('change', function () {
      settings.voiceGender = ['any', 'female', 'male'].indexOf(voiceGender.value) >= 0 ? voiceGender.value : 'any';
      saveSettings();
      tts.syncVoicePreference();
      syncSettingsUI();
      tts.speak('Hello, how are you?');
    });
    var voiceTest = document.getElementById('voiceTest');
    if (voiceTest) voiceTest.addEventListener('click', function () {
      tts.speak('Hello! This is your English voice.', 0.9);
    });
    var setMg = document.getElementById('setMg');
    if (setMg) setMg.addEventListener('change', function () {
      settings.malagasyHints = setMg.checked;
      saveSettings();
      applyPreferences();
    });
    var setAutoSpeak = document.getElementById('setAutoSpeak');
    if (setAutoSpeak) setAutoSpeak.addEventListener('change', function () {
      settings.autoSpeak = setAutoSpeak.checked;
      saveSettings();
    });
    var setMotion = document.getElementById('setMotion');
    if (setMotion) setMotion.addEventListener('change', function () {
      settings.reduceMotion = setMotion.checked;
      saveSettings();
      applyPreferences();
    });
    var setReset = document.getElementById('setReset');
    if (setReset) setReset.addEventListener('click', function () {
      if (confirm('Reset all your progress? This cannot be undone.')) {
        state.progress = { learned: {}, stars: 0, streak: 0, lastDate: null, activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {}, saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {}, devotional: { days: {}, words: {} }, days: {} };
        saveProgress();
        updateStatsUI();
        showToast('Progress reset.', 'error');
        hideSheet();
        if (state.activeTab === 'progress') renderProgress();
        else if (state.activeTab === 'vocabulary') renderVocabulary();
        else if (state.activeTab === 'classroom') renderClassroom();
      }
    });

    // Follow the operating system's day / night setting when on "System".
    if (window.matchMedia) {
      var schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var onSchemeChange = function () { if (settings.theme === 'system') applyTheme(); };
      if (schemeQuery.addEventListener) schemeQuery.addEventListener('change', onSchemeChange);
      else if (schemeQuery.addListener) schemeQuery.addListener(onSchemeChange);
    }

    // Deep link support: open straight to the screen in the URL hash,
    // otherwise start on Today.
    switchTab(tabFromHash() || 'today');

    // Browser back / forward buttons move between screens.
    window.addEventListener('popstate', function () {
      var id = tabFromHash();
      if (id && id !== state.activeTab) {
        state.applyingHash = true;
        switchTab(id);
        state.applyingHash = false;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeQuizOverlay(); closeVocabCorrection(); closeTextCorrection(); hideSheet(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
