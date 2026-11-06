# Keep the JavaScript bridge methods reachable from WebView.
-keepclassmembers class com.easyenglish.mianatra.MainActivity$TtsBridge {
    public *;
}
