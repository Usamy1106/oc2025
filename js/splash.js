document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    // 念のため初期化
    video.muted = true;
    video.currentTime = 0;

    // 動画が準備できたら再生
    video.addEventListener("canplaythrough", () => {
        video.currentTime = 0;
        video.play().catch(err => {
            console.warn("自動再生失敗:", err);
            fadeOutSplash(); // 失敗したらフェードアウトだけでも進める
        });
    });

    // 動画が終わったらメイン表示
    video.addEventListener("ended", () => {
        fadeOutSplash();
    });

    function fadeOutSplash() {
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
            main.classList.add("show");
        }, 1000);
    }

    // 戻る操作や bfcache 復元時の対処
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
});