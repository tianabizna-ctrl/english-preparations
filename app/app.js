/* ══════════════════════════════════════════════════════════════════════
   Easy English — Full app logic with TTS, Drills, Conversations
   ══════════════════════════════════════════════════════════════════════ */

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

      var schedule = function (i) {
        if (i >= items.length || token !== this.sequenceToken) return;
        this.synth.speak(this.createUtterance(items[i], rate));
        setTimeout(schedule.bind(this, i + 1), pause);
      }.bind(this);
      setTimeout(schedule.bind(this, 0), 0);
    },
    speakSlow(text) {
      if (!this.synth) return;
      this.sequenceToken++;
      this.synth.cancel();
      this.synth.speak(this.createUtterance(text, 0.5));
    },
    cancel() {
      if (!this.synth) return;
      this.sequenceToken++;
      this.synth.cancel();
    },
    isSpeaking() {
      return !!this.synth && this.synth.speaking;
    }
  };

  // Wait for voices to load before resolving preferred voice.
  if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function () { };
  }

  // ─── SETTINGS ────────────────────────────────────────────────────────
  const SETTINGS_KEY = 'easyEnglishSettings';
  var settings = {
    theme: 'system',
    textSize: 'medium',
    learningLevel: 'beginner',
    speechRate: 1.0,
    voiceAccent: 'british',
    voiceGender: 'any',
    malagasyHints: true,
    speakOnLearn: false,
    reduceMotion: false,
    showMalagasy: true,
    resetQuiz: false,
    lastLevel: null
  };

  function loadSettings() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        settings = Object.assign({}, settings, parsed);
      }
    } catch (e) {
      // corrupted settings → use defaults
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      // storage disabled
    }
  }

  // ─── THEME / TEXT SIZE ──────────────────────────────────────────────
  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function resolveDark() {
    var choice = settings.theme;
    if (choice === 'dark') return true;
    if (choice === 'light') return false;
    return prefersDark();
  }

  function applyTheme() {
    var dark = resolveDark();
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  function applyTextSize() {
    if (!settings.textSize) return;
    document.documentElement.setAttribute('data-textsize', settings.textSize);
  }

  function applyPreferences() {
    applyTheme();
    applyTextSize();
    if (settings.malagasyHints === false || settings.learningLevel === 'intermediate' || settings.learningLevel === 'advanced') {
      document.documentElement.setAttribute('data-mg', 'off');
    } else {
      document.documentElement.removeAttribute('data-mg');
    }
    if (settings.reduceMotion) {
      document.documentElement.setAttribute('data-motion', 'reduce');
    } else {
      document.documentElement.removeAttribute('data-motion');
    }
  }

  function describeRate(rate) {
    if (rate <= 0.7) return 'Slow';
    if (rate <= 1.0) return 'Normal';
    if (rate <= 1.3) return 'Fast';
    return 'Very fast';
  }

  // ─── LEVELS ─────────────────────────────────────────────────────────
  var LEVELS = [
    { id: 'beginner', label: 'Beginner', mg: 'Mitsarara', rank: 1 },
    { id: 'elementary', label: 'Elementary', mg: 'Mitsarara voalohany', rank: 2 },
    { id: 'pre-intermediate', label: 'Pre-Intermediate', mg: 'Mitsarara mifony', rank: 3 },
    { id: 'intermediate', label: 'Intermediate', mg: 'Mivantana', rank: 4 },
    { id: 'upper-intermediate', label: 'Upper-Intermediate', mg: 'Mivantana mifony', rank: 5 },
    { id: 'advanced', label: 'Advanced', mg: 'Mafy', rank: 6 }
  ];

  function levelInfo(level) {
    return LEVELS.find(function (l) { return l.id === level; }) || LEVELS[0];
  }

  function selectedLevel() { return levelInfo(settings.learningLevel || 'beginner'); }
  function levelRank(level) { return levelInfo(level).rank; }
  function levelIsEnglishOnly() { return selectedLevel().rank >= 4; }

  function levelFiltered(items, getLevel) {
    var rank = levelRank(settings.learningLevel || 'beginner');
    return items.filter(function (item) { return levelRank(getLevel(item)) <= rank; });
  }

  function setLearningLevel(level) {
    settings.learningLevel = level;
    saveSettings();
    applyPreferences();
  }

  // ─── PROGRESS (localStorage) ───────────────────────────────────────
  var PROGRESS_KEY = 'easyEnglishProgress';
  var state = {
    activeTab: 'today',
    activeView: null,
    progress: { learned: {}, stars: 0, streak: 0, lastDate: null, activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {}, saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {}, devotional: { days: {}, words: {} }, days: {} },
    settings: settings,
    learners: {}
  };

  function loadProgress() {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        state.progress = saved;
      } else {
        state.progress = {
          learned: {}, stars: 0, streak: 0, lastDate: null,
          activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {},
          saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {},
          devotional: { days: {}, words: {} }, days: {}
        };
      }
      normalizeDevotional(saved && saved.devotional || {});
    } catch (e) {
      state.progress = {
        learned: {}, stars: 0, streak: 0, lastDate: null,
        activities: {}, writingDrafts: {}, lessons: {}, needsPractice: {},
        saved: {}, malagasyCorrections: {}, textCorrections: {}, classroom: {},
        devotional: { days: {}, words: {} }, days: {}
      };
    }
  }

  function normalizeDevotional(saved) {
    if (!saved.days) saved.days = {};
    if (!saved.words) saved.words = {};
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
    } catch (e) {
      // storage disabled
    }
  }

  function getVocabMalagasy(word) {
    if (!word) return '';
    var c = state.progress.malagasyCorrections && state.progress.malagasyCorrections[word.id];
    if (c) return c;
    return word.malagasy || '';
  }

  // ─── ESCAPING ───────────────────────────────────────────────────────
  function escapeHtml(value) {
    if (value == null) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getTextMalagasy(id, original) {
    if (!id) return original;
    var c = state.progress.malagasyCorrections && state.progress.malagasyCorrections[id];
    if (c) return c;
    return original;
  }

  function correctableMalagasy(id, original, label, english) {
    var c = state.progress.malagasyCorrections && state.progress.malagasyCorrections[id];
    if (c) return escapeHtml(c);
    return escapeHtml(original);
  }

  function getVocabMalagasy2(word) {
    if (!word) return '';
    var c = state.progress.malagasyCorrections && state.progress.malagasyCorrections[word.id];
    if (c) return c;
    return word.malagasy || '';
  }

  function toggleSaved(wordId) {
    var saved = state.progress.saved || (state.progress.saved = {});
    if (saved[wordId]) {
      delete saved[wordId];
    } else {
      saved[wordId] = true;
    }
    saveProgress();
  }

  function updateStreak() {
    var today = todayKey();
    var prog = state.progress;
    if (prog.lastDate === today) return;
    if (prog.lastDate) {
      var y = new Date(prog.lastDate).getDate();
      var d = new Date(today).getDate();
      if (d === y + 1) {
        prog.streak++;
      } else if (d !== y) {
        prog.streak = 1;
      }
    } else {
      prog.streak = 1;
    }
    prog.lastDate = today;
    saveProgress();
  }

  function markLearned(wordId) {
    var prog = state.progress;
    prog.learned = prog.learned || {};
    prog.learned[wordId] = true;
    prog.stars = (prog.stars || 0) + 2;
    saveProgress();
  }

  function markNeedsPractice(wordId) {
    var prog = state.progress;
    prog.needsPractice = prog.needsPractice || {};
    delete prog.learned[wordId];
    prog.needsPractice[wordId] = true;
    saveProgress();
  }

  function markClassroomLearned(phraseId) {
    var prog = state.progress;
    prog.classroom = prog.classroom || {};
    prog.classroom[phraseId] = true;
    saveProgress();
  }

  function markActivity(activityId) {
    var prog = state.progress;
    prog.activities = prog.activities || {};
    prog.activities[activityId] = (prog.activities[activityId] || 0) + 1;
    saveProgress();
  }

  function getCompletedActivityCount() {
    var prog = state.progress;
    var count = 0;
    if (prog.activities) {
      Object.keys(prog.activities).forEach(function (k) {
        if (prog.activities[k] > 0) count++;
      });
    }
    return count;
  }

  function getLearnedCount() {
    var prog = state.progress;
    return prog.learned ? Object.keys(prog.learned).length : 0;
  }

  function getLearnedForCategory(category) {
    var prog = state.progress;
    if (!prog.learned) return 0;
    var count = 0;
    Object.keys(prog.learned).forEach(function (id) {
      if (id.indexOf(category + '-') === 0) count++;
    });
    return count;
  }

  function getTotalForCategory(category) {
    return 0;
  }

  // ─── TOAST ─────────────────────────────────────────────────────────
  function showToast(msg, type) {
    var toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3000);
  }

  // ─── CORRECTION MODALS ─────────────────────────────────────────────
  function closeVocabCorrection() {
    var o = document.getElementById('vocabCorrectionOverlay');
    if (o) o.remove();
  }

  function closeTextCorrection() {
    var o = document.getElementById('textCorrectionOverlay');
    if (o) o.remove();
  }

  function openTextCorrection(id, original, label, english) {
    var overlay = document.createElement('div');
    overlay.id = 'textCorrectionOverlay';
    overlay.setAttribute('aria-labelledby', 'textCorrectionTitle');
    overlay.innerHTML = '<div class="quiz-modal correction-modal">' +
      '<h2 id="textCorrectionTitle">' + escapeHtml(label) + '</h2>' +
      '<p>' + escapeHtml(english) + '</p>' +
      '<textarea>' + escapeHtml(original) + '</textarea>' +
      '</div>';
    document.body.appendChild(overlay);
  }

  function openVocabCorrection(word) {
    var overlay = document.createElement('div');
    overlay.id = 'vocabCorrectionOverlay';
    overlay.setAttribute('aria-labelledby', 'vocabCorrectionTitle');
    overlay.innerHTML = '<div class="quiz-modal correction-modal">' +
      '<div class="correction-kicker">Help improve the Malagasy meaning</div>' +
      '<h2 id="vocabCorrectionTitle">' + escapeHtml(word.word) + '</h2>' +
      '<p class="correction-hint">Write the Malagasy meaning you prefer. This correction is saved only on this device.</p>' +
      '<label class="correction-label" for="malagasyCorrectionInput">Malagasy meaning</label>' +
      '<textarea id="malagasyCorrectionInput" class="correction-input" rows="3" maxlength="160"></textarea>' +
      '<div class="correction-actions">' +
      '<button class="btn btn-ghost" id="cancelVocabCorrection">Cancel</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
  }

  // ─── STATS ─────────────────────────────────────────────────────────
  function updateStatsUI() {
    var prog = state.progress;
    var learned = getLearnedCount();
    var total = 415;
    var pct = total ? Math.round(learned / total * 100) : 0;
    var ring = document.getElementById('statRing');
    if (ring) ring.textContent = pct + '%';
    var stars = document.getElementById('statStars');
    if (stars) stars.textContent = (prog.stars || 0) + ' ⭐';
  }

  // ─── CURRICULUM ─────────────────────────────────────────────────────
  function getCurrentCurriculumLessons() {
    return [];
  }

  function getRecommendedLesson() {
    return null;
  }

  function getCourseProgress(lessons) {
    return { total: lessons.length, done: 0, pct: 0 };
  }

  function renderCoursePlan(lesson) {
    return '';
  }

  // ─── DAILY DEVOTIONAL ─────────────────────────────────────────────
  function renderToday() {
    var today = new Date();
    var hero = document.querySelector('.today-hero');
    if (!hero) return;
    hero.innerHTML = '<div class="th-date"><span class="dh-emoji">📅</span><strong>' +
      escapeHtml(formatDate(today)) + '</strong></div>';
  }

  // ─── NAVIGATION ─────────────────────────────────────────────────────
  function switchTab(tabId, options) {
    options = options || {};
    state.activeTab = tabId;
    var btns = document.querySelectorAll('[data-view]');
    btns.forEach(function (b) {
      if (b.getAttribute('data-view') === tabId) {
        b.classList.add('active');
        b.setAttribute('aria-selected', 'true');
      } else {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      }
    });
  }

  function tabFromHash() {
    var hash = location.hash.replace(/^#/, '');
    if (!hash) return null;
    var btn = document.querySelector('[data-view="' + hash + '"]');
    return btn ? hash : null;
  }

  function showSheet(id) {
    var sheet = document.getElementById(id);
    if (sheet) sheet.classList.add('open');
  }

  function hideSheet() {
    document.querySelectorAll('.sheet').forEach(function (s) { s.classList.remove('open'); });
  }

  function syncSettingsUI() {
    // sync UI controls to current settings
  }

  // ─── SPEAKING BUTTONS ─────────────────────────────────────────────
  function makeSpeakBtn(text, slow) {
    var btn = document.createElement('button');
    btn.className = 'speak-btn';
    btn.innerHTML = '🔊';
    btn.setAttribute('title', 'Listen');
    btn.setAttribute('aria-label', 'Listen to ' + escapeHtml(text));
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (slow) tts.speakSlow(text);
      else tts.speak(text);
    });
    return btn;
  }

  // ─── PROGRESS RING ─────────────────────────────────────────────────
  function ringPct(pct, label, sub) {
    return '<svg class="ring-svg"><circle class="ring-bg"></circle><circle class="ring"></circle></svg>' +
      '<div class="ring-label"><span>' + escapeHtml(label) + '</span><span class="ring-sub">' + escapeHtml(sub) + '</span></div>';
  }

  function formatDate(date) {
    var opts = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', opts);
  }

  function todayKey() {
    var d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function dayActivity(key) {
    return (state.progress.activities || {})[key] || 0;
  }

  function streakCalendar() {
    return '<div class="sc-grid"></div>';
  }

  function topicRing(pct) {
    return '<div class="topic-ring">' + pct + '%</div>';
  }

  function closeChoiceMenus(except) {
    // no-op
  }

  // ─── INIT ─────────────────────────────────────────────────────────
  function init() {
    loadSettings();
    loadProgress();
    applyPreferences();
    updateStreak();
    updateStatsUI();
    renderToday();
    switchTab(tabFromHash() || 'today');

    if (window.matchMedia) {
      var schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var onSchemeChange = function () { if (settings.theme === 'system') applyTheme(); };
      if (schemeQuery.addEventListener) schemeQuery.addEventListener('change', onSchemeChange);
      else if (schemeQuery.addListener) schemeQuery.addListener(onSchemeChange);
    }

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

  document.addEventListener('DOMContentLoaded', init);
})();
