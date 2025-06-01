document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    // デバイス判定
    const isMobile = window.innerWidth <= 768;

    // 動画ファイル定義
    const splashTT = "images/splash_TT.mp4"; // スマホ用単一動画
    const splash1 = "images/splash_1.mp4";
    const splash2 = "images/splash_2.mp4";
    const splash3 = "images/splash_3.mp4";

    let loadingComplete = false;

    // video初期設定
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    // スプラッシュ終了処理
    function fadeOutSplash() {
        main.style.display = "block";
        main.style.overflow = "auto";
        main.classList.add("show");
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    }

    // 動画再生関数（Promiseで制御）
    function playVideo(src, loop = false) {
        return new Promise((resolve, reject) => {
            video.pause();
            video.loop = loop;
            video.src = src;
            video.load();

            video.oncanplaythrough = () => {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.then(resolve).catch(err => {
                        console.error(`再生エラー: ${src}`, err);
                        reject(err);
                    });
                }
            };
        });
    }

    // splash3再生 → 終了後フェードアウト（PC用）
    function playSplash3() {
        playVideo(splash3, false)
            .then(() => {
                video.addEventListener("ended", fadeOutSplash, { once: true });
            })
            .catch(fadeOutSplash);
    }

    // splash2をループ再生 → loadingCompleteを待つ（PC用）
    function playSplash2LoopUntilLoaded() {
        playVideo(splash2, true)
            .then(() => {
                const check = setInterval(() => {
                    if (loadingComplete) {
                        clearInterval(check);
                        playSplash3();
                    }
                }, 500);
            })
            .catch(() => {
                console.warn("splash2 再生失敗 → フェードアウト");
                fadeOutSplash();
            });
    }

    // splash1再生後にsplash2（PC用）
    function playSplash1ThenLoopSplash2() {
        playVideo(splash1, false)
            .then(() => {
                video.addEventListener("ended", () => {
                    playSplash2LoopUntilLoaded();
                }, { once: true });
            })
            .catch(() => {
                console.warn("splash1 再生失敗 → splash2へ");
                playSplash2LoopUntilLoaded();
            });
    }

    // スマホ用： splash_TTを1回再生して終了
    function playSplashTT() {
        playVideo(splashTT, false)
            .then(() => {
                video.addEventListener("ended", fadeOutSplash, { once: true });
            })
            .catch(fadeOutSplash);
    }

    // 疑似ローディング（画像やAPIの読み込みを想定）
    function simulateLoading() {
        setTimeout(() => {
            loadingComplete = true;
        }, 5000);
    }

    // bfcache対策
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });

    // 実行開始
    if (isMobile) {
        playSplashTT();
    } else {
        playSplash1ThenLoopSplash2();
        simulateLoading();
    }
});
