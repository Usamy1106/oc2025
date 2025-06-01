document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    const isMobile = window.innerWidth <= 768;

    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    if (isMobile) {
        // スマホ向け処理
        video.src = "images/splash_TT.mp4";
        video.load();
        video.play().catch(err => {
            console.warn("スマホ自動再生失敗:", err);
            fadeOutSplash();
        });
        video.addEventListener("ended", fadeOutSplash);

    } else {
        // PC向け処理
        const splash1 = "images/splash_1.mp4";
        const splash2 = "images/splash_2.mp4";
        const splash3 = "images/splash_3.mp4";

        let step = 0; // 0: splash1, 1: splash2 first, 2: splash2 loop, 3: splash3
        let splash2Ready = false;
        let splash2PlayedOnce = false;

        const playVideo = (src, loop = false) => {
            video.loop = loop;
            video.src = src;
            video.load();
            video.play().catch(err => {
                console.warn(`動画再生失敗（${src}）:`, err);
                fadeOutSplash();
            });
        };

        video.addEventListener("ended", () => {
            if (step === 0) {
                // splash_1 終了 → splash_2 再生
                step = 1;
                playVideo(splash2, false);
            } else if (step === 1) {
                // splash_2 の最初の1回が終わった
                splash2PlayedOnce = true;
                if (splash2Ready) {
                    // 読み込み済みなら splash_3 へ
                    step = 3;
                    playVideo(splash3);
                } else {
                    // 読み込みまだなら loop 再生続行
                    step = 2;
                    playVideo(splash2, true);
                }
            } else if (step === 2) {
                // splash_2 をループ中に再生終了した
                if (splash2Ready) {
                    step = 3;
                    playVideo(splash3);
                } else {
                    // 読み込みまだ → 次のループへ（自動）
                }
            } else if (step === 3) {
                // splash_3 終了
                fadeOutSplash();
            }
        });

        // splash_2 の完全読み込みを検知
        video.addEventListener("canplaythrough", () => {
            if (step === 1 || step === 2) {
                splash2Ready = true;
            }
        });

        // 最初の動画から再生開始
        playVideo(splash1);
    }

    function fadeOutSplash() {
        main.style.display = "block";
        main.style.overflow = "auto";
        main.classList.add("show");

        splash.classList.add("fade-out");

        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    }

    // bfcache 対応
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
});
