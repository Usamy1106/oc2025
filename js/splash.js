document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    // デバイス判定
    const isMobile = window.innerWidth <= 768;

    // 動画ファイル（パスは適宜調整）
    const splash1 = "images/splash_1.mp4";
    const splash2 = "images/splash_2.mp4";
    const splash3 = "images/splash_3.mp4";
    const splashMobile = "images/splash_TT.mp4";

    // 読み込み完了フラグ
    let loadingComplete = false;

    // フェードアウト処理
    function fadeOutSplash() {
        main.style.display = "block";
        main.style.overflow = "auto";
        main.classList.add("show");
        splash.classList.add("fade-out");

        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    }

    // 動画再生関数（Promiseで安全に再生）
    function playVideo(src, loop = false, onEnd = null) {
        return new Promise((resolve, reject) => {
            video.pause();
            video.src = src;
            video.loop = loop;

            // 必要な属性
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            video.muted = true;
            video.playsInline = true;

            if (onEnd) {
                video.addEventListener("ended", onEnd, { once: true });
            }

            video.load();

            video.oncanplaythrough = () => {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.then(resolve).catch(err => {
                        console.warn("動画再生失敗:", err);
                        reject(err);
                    });
                }
            };
        });
    }

    // 疑似ローディング（5秒後に完了）
    function simulateLoading() {
        setTimeout(() => {
            loadingComplete = true;
        }, 5000);
    }

    // スマホ専用処理
    if (isMobile) {
        playVideo(splashMobile, false, fadeOutSplash)
            .catch(fadeOutSplash);
        return; // スマホはここで終了
    }

    // PC用：step1 → step2（ループ） → step3
    function playSplashSequence() {
        // 1. splash_1
        playVideo(splash1, false)
            .then(() => {
                // 2. splash_2 をループ
                return new Promise((resolve, reject) => {
                    playVideo(splash2, true).catch(reject);

                    const check = setInterval(() => {
                        if (loadingComplete) {
                            clearInterval(check);
                            resolve();
                        }
                    }, 500);
                });
            })
            .then(() => {
                // 3. splash_3 再生 → 終了でフェード
                return playVideo(splash3, false, fadeOutSplash);
            })
            .catch(() => {
                console.warn("動画再生中にエラー。フェードアウトへ");
                fadeOutSplash();
            });
    }

    // 実行
    simulateLoading();
    playSplashSequence();

    // bfcache対策
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
});
