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
        settings.setAllowFileAccess(true);
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

    private void speakSequenceManyNow(String json, float rate, long gap) {
        if (!ttsReady || json == null || json.isEmpty()) return;
        try {
            JSONArray items = new JSONArray(json);
            if (items.length() == 0) return;
            float safeRate = rate <= 0 ? 1f : Math.max(0.3f, Math.min(rate, 2f));
            long safeGap = Math.max(150L, Math.min(gap, 1500L));
            tts.setSpeechRate(safeRate);
            boolean spoken = false;
            for (int i = 0; i < items.length(); i++) {
                String text = items.optString(i, "");
                if (text.isEmpty()) continue;
                tts.speak(text, spoken ? TextToSpeech.QUEUE_ADD : TextToSpeech.QUEUE_FLUSH, null, "easyenglish-sequence-" + i);
                spoken = true;
                if (i < items.length() - 1) {
                    tts.playSilence(safeGap, TextToSpeech.QUEUE_ADD, null);
                }
            }
        } catch (Exception ignored) {
            // Ignore malformed bridge data rather than interrupting the app.
        }
    }

    private void applyVoicePreference() {
        if (tts == null) return;
        Locale preferred = "american".equals(voiceAccent) ? Locale.US : Locale.UK;
        int result = tts.setLanguage(preferred);
        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
            tts.setLanguage(Locale.US);
        }

        Set<Voice> voices = tts.getVoices();
        if (voices == null || voices.isEmpty()) return;
        Voice best = null;
        int bestScore = Integer.MIN_VALUE;
        for (Voice voice : voices) {
            Locale locale = voice.getLocale();
            if (locale == null || !"en".equalsIgnoreCase(locale.getLanguage())) continue;
            int score = 0;
            if (preferred.getCountry().equalsIgnoreCase(locale.getCountry())) score += 100;
            if (voiceNameMatchesGender(voice, voiceGender)) score += 25;
            if ("any".equals(voiceGender) || voiceNameMatchesGender(voice, voiceGender)) score += 5;
            if (voice.isNetworkConnectionRequired()) score -= 1;
            if (score > bestScore) {
                bestScore = score;
                best = voice;
            }
        }
        if (best != null) {
            try {
                tts.setVoice(best);
            } catch (IllegalArgumentException ignored) {
                // Keep the selected locale when a device rejects a voice.
            }
        }
    }

    private boolean voiceNameMatchesGender(Voice voice, String gender) {
        if (gender == null || "any".equals(gender)) return true;
        String name = voice.getName() == null ? "" : voice.getName().toLowerCase(Locale.US);
        if ("female".equals(gender)) {
            return name.contains("female") || name.contains("woman") || name.contains("samantha")
                    || name.contains("karen") || name.contains("victoria") || name.contains("zira")
                    || name.contains("susan") || name.contains("hazel") || name.contains("ava");
        }
        return name.contains("male") || name.contains("man") || name.contains("daniel")
                || name.contains("alex") || name.contains("arthur") || name.contains("george")
                || name.contains("david") || name.contains("james") || name.contains("oliver");
    }

    /** Exposed to JavaScript as window.AndroidTTS. */
    public class TtsBridge {
        @JavascriptInterface
        public void speak(final String text, final float rate) {
            if (!ttsReady) {
                pendingText = text;
                pendingFirst = null;
                pendingSecond = null;
                pendingManySequence = null;
                pendingRate = rate;
                return;
            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    speakNow(text, rate);
                }
            });
        }

        @JavascriptInterface
        public void speakSequence(final String first, final String second, final float rate, final long gap) {
            if (!ttsReady) {
                pendingText = null;
                pendingFirst = first;
                pendingSecond = second;
                pendingManySequence = null;
                pendingSequenceRate = rate;
                pendingSequenceGap = gap;
                return;
            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    speakSequenceNow(first, second, rate, gap);
                }
            });
        }

        @JavascriptInterface
        public void speakSequenceMany(final String json, final float rate, final long gap) {
            if (!ttsReady) {
                pendingText = null;
                pendingFirst = null;
                pendingSecond = null;
                pendingManySequence = json;
                pendingSequenceRate = rate;
                pendingSequenceGap = gap;
                return;
            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    speakSequenceManyNow(json, rate, gap);
                }
            });
        }

        @JavascriptInterface
        public void setVoicePreference(final String accent, final String gender) {
            voiceAccent = "american".equalsIgnoreCase(accent) ? "american" : "british";
            voiceGender = "female".equalsIgnoreCase(gender) || "male".equalsIgnoreCase(gender)
                    ? gender.toLowerCase(Locale.US) : "any";
            if (ttsReady) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        applyVoicePreference();
                    }
                });
            }
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
