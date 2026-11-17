package com.easyenglish.mianatra;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Locale;
import java.util.Set;

import org.json.JSONArray;

/**
 * Native Android shell for the Easy English web app.
 *
 * The whole learning app is bundled under assets/www and shown in a WebView.
 * Because Android's WebView does not implement the Web Speech API, this
 * activity exposes the device TextToSpeech engine to JavaScript as
 * window.AndroidTTS; the bundled app/tts-bridge.js turns that into a
 * window.speechSynthesis compatible object so the 🔊 buttons work.
 */
public class MainActivity extends Activity {

    private WebView webView;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private String pendingText = null;
    private float pendingRate = 1f;
    private String pendingFirst = null;
    private String pendingSecond = null;
    private float pendingSequenceRate = 1f;
    private long pendingSequenceGap = 400L;
    private String pendingManySequence = null;
    private String voiceAccent = "british";
    private String voiceGender = "any";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status == TextToSpeech.SUCCESS) {
                    applyVoicePreference();
                    ttsReady = true;
                    if (pendingManySequence != null) {
                        speakSequenceManyNow(pendingManySequence, pendingSequenceRate, pendingSequenceGap);
                        pendingManySequence = null;
                    } else if (pendingFirst != null && pendingSecond != null) {
                        speakSequenceNow(pendingFirst, pendingSecond, pendingSequenceRate, pendingSequenceGap);
                        pendingFirst = null;
                        pendingSecond = null;
                    } else if (pendingText != null) {
                        speakNow(pendingText, pendingRate);
                        pendingText = null;
                    }
                }
            }
        });

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);       // enables localStorage for progress
        settings.setAllowFileAccess(false);       // assets are loaded via file:///android_asset/ which does not need this
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new TtsBridge(), "AndroidTTS");
        setContentView(webView);

        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private void speakNow(String text, float rate) {
        if (!ttsReady || text == null || text.isEmpty()) return;
        float safeRate = rate <= 0 ? 1f : Math.max(0.3f, Math.min(rate, 2f));
        tts.setSpeechRate(safeRate);
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "easyenglish");
    }

    private void speakSequenceNow(String first, String second, float rate, long gap) {
        if (!ttsReady || first == null || second == null) return;
        float safeRate = rate <= 0 ? 1f : Math.max(0.3f, Math.min(rate, 2f));
        long safeGap = Math.max(150L, Math.min(gap, 1500L));
        tts.setSpeechRate(safeRate);
        tts.speak(first, TextToSpeech.QUEUE_FLUSH, null, "easyenglish-first");
        tts.playSilence(safeGap, TextToSpeech.QUEUE_ADD, null);
        tts.speak(second, TextToSpeech.QUEUE_ADD, null, "easyenglish-second");
    }

    private void speakSequenceManyNow(String sequence, float rate, long gap) {
        if (!ttsReady || sequence == null || sequence.isEmpty()) return;
        float safeRate = rate <= 0 ? 1f : Math.max(0.3f, Math.min(rate, 2f));
        long safeGap = Math.max(150L, Math.min(gap, 1500L));
        tts.setSpeechRate(safeRate);
        JSONArray parts = new JSONArray(sequence);
        for (int i = 0; i < parts.length(); i++) {
            try {
                tts.speak(parts.getString(i), i == 0 ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, "easyenglish");
                if (i < parts.length() - 1) tts.playSilence(safeGap, TextToSpeech.QUEUE_ADD, null);
            } catch (Exception e) { /* skip */ }
        }
    }

    private void applyVoicePreference() {
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null) return;
            String lang = "british".equals(voiceAccent) ? "en-GB" : "en-US";
            Voice best = null;
            for (Voice v : voices) {
                if (v.getName().toLowerCase().startsWith(lang)) { best = v; break; }
            }
            if (best != null) tts.setVoice(best);
            else tts.setLanguage(Locale.UK);
        } catch (Exception e) { /* fall back to default */ }
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript("window.dispatchEvent(new Event('back'))", null);
    }

    private class TtsBridge {
        @JavascriptInterface
        public void speak(String text, float rate) {
            if (!ttsReady) { pendingText = text; pendingRate = rate; return; }
            speakNow(text, rate);
        }

        @JavascriptInterface
        public void speakSequence(String first, String second, float rate, long gap) {
            if (!ttsReady) { pendingFirst = first; pendingSecond = second; pendingSequenceRate = rate; pendingSequenceGap = gap; return; }
            speakSequenceNow(first, second, rate, gap);
        }

        @JavascriptInterface
        public void speakSequenceMany(String sequence, float rate, long gap) {
            if (!ttsReady) { pendingManySequence = sequence; pendingSequenceRate = rate; pendingSequenceGap = gap; return; }
            speakSequenceManyNow(sequence, rate, gap);
        }

        @JavascriptInterface
        public void cancel() {
            if (ttsReady) tts.stop();
        }

        @JavascriptInterface
        public void setVoicePreference(String accent, String gender) {
            voiceAccent = accent;
            voiceGender = gender;
            if (ttsReady) applyVoicePreference();
        }

        @JavascriptInterface
        public void isSpeaking() {}

        @JavascriptInterface
        public void speakSlow(String text) {
            speakNow(text, 0.5f);
        }

        @JavascriptInterface
        public void playWord(String text) {
            speakNow(text, 0.7f);
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); }
        super.onDestroy();
    }
}
