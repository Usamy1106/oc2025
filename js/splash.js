document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.currentTime = 0;

    // 明示的にロード
    video.load();

    // 再生を試みる（canplaythroughを待たず）
    video.play().catch(err => {
        console.warn("自動再生失敗:", err);
        fadeOutSplash();
    });

    // 念のため canplaythrough でも再生
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
        // フェード開始と同時にWrapper表示
        const wrapper = document.getElementById("Wrapper");
        wrapper.style.display = "block";      // フェード開始時に表示
        wrapper.style.overflow = "auto";      // スクロール解放（必要なら）
        wrapper.classList.add("show");        // 任意の表示アニメ用classなど

        splash.classList.add("fade-out");

        // フェードアニメ終了後に splash を完全に非表示に
        setTimeout(() => {
            splash.style.display = "none";
        }, 1000); // フェード時間に合わせて
    }



    // bfcache 対応
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
});
