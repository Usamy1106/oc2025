
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    // スマホ判定（メディアクエリ使用）
    function isSmartPhone() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    // 適切な動画ソースを挿入
    const source = document.createElement("source");
    source.src = isSmartPhone() ? "images/splash_TT.mp4" : "images/splash.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.currentTime = 0;

    video.load(); // 明示的にロード

    // 再生を試みる
    video.play().catch(err => {
        console.warn("自動再生失敗:", err);
        fadeOutSplash();
    });

    // 念のため再生可能イベントでも再生
    video.addEventListener("canplaythrough", () => {
        video.play().catch(err => {
            console.warn("自動再生失敗:", err);
            fadeOutSplash();
        });
    });

    // 動画が終了したらフェードアウト
    video.addEventListener("ended", () => {
        fadeOutSplash();
    });

    function fadeOutSplash() {
        main.style.display = "block";
        main.style.overflow = "auto";
        main.classList.add("show");

        splash.classList.add("fade-out");

        setTimeout(() => {
            splash.style.display = "none";
        }, 1000); // CSSのフェード時間と一致させる
    }

    // bfcache 対応
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
});