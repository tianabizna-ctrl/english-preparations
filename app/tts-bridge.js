/* ═══════════════════════════════════════════════════════════════════════
   Android WebView text-to-speech bridge.

   Android WebView does not implement the Web Speech API, so when the native
   Android app exposes a `window.AndroidTTS` object (backed by the device's
   TextToSpeech engine) this shim supplies a compatible `window.speechSynthesis`
   and `SpeechSynthesisUtterance`. On browsers and on the desktop app the
   native object is absent, so this file does nothing and the real Web Speech
   API is used.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (!window.AndroidTTS || !window.AndroidTTS.speak) return;

  function Utterance(text) {
    this.text = String(text == null ? '' : text);
    this.lang = 'en-GB';
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.voice = null;
    this.onend = null;
    this.onerror = null;
  }

  var synth = {
    __native: true,
    pending: false,
    paused: false,
    onvoiceschanged: null,
    speak: function (utterance) {
      var text = utterance && utterance.text ? utterance.text : '';
      var rate = utterance && utterance.rate ? utterance.rate : 1;
      try {
        window.AndroidTTS.speak(text, Number(rate) || 1);
      } catch (e) { /* ignore */ }
    },
    speakSequence: function (first, second, rate, gap) {
      try {
        if (window.AndroidTTS.speakSequence) {
          window.AndroidTTS.speakSequence(String(first || ''), String(second || ''), Number(rate) || 1, Number(gap) || 400);
        } else {
          window.AndroidTTS.speak(String(first || '') + '. ' + String(second || ''), Number(rate) || 1);
        }
      } catch (e) { /* ignore */ }
    },
    speakSequenceMany: function (items, rate, gap) {
      try {
        if (window.AndroidTTS.speakSequenceMany) {
          window.AndroidTTS.speakSequenceMany(JSON.stringify(items || []), Number(rate) || 1, Number(gap) || 400);
        }
      } catch (e) { /* ignore */ }
    },
    setVoicePreference: function (accent, gender) {
      try {
        if (window.AndroidTTS.setVoicePreference) window.AndroidTTS.setVoicePreference(String(accent || 'british'), String(gender || 'any'));
      } catch (e) { /* ignore */ }
    },
    cancel: function () {
      try { window.AndroidTTS.stop(); } catch (e) { /* ignore */ }
    },
    pause: function () { try { window.AndroidTTS.stop(); } catch (e) { /* ignore */ } },
    resume: function () { /* not supported by the bridge */ },
    getVoices: function () { return []; },
  };

  try {
    Object.defineProperty(window, 'speechSynthesis', {
      value: synth, configurable: true, writable: true,
    });
  } catch (e) {
    window.speechSynthesis = synth;
  }

  window.SpeechSynthesisUtterance = Utterance;
})();
