document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    // デバイス判定
    const isMobile = window.innerWidth <= 768;

    // 動画ファイル定義（PC用）
    const splash1 = "images/splash_1.mp4";
    const splash2 = "images/splash_2.mp4";
    const splash3 = "images/splash_3.mp4";

    let loadingComplete = false;

    // video初期設定
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("webkit-playsinline", "");
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
    function playVideo() {
        return new Promise((resolve, reject) => {
            video.pause();
            video.load();

            video.oncanplaythrough = () => {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.then(resolve).catch(err => {
                        console.error("再生エラー:", err);
                        reject(err);
                    });
                }
            };
        });
    }

    // PC用再生フロー
    function playSplash3() {
        video.loop = false;
        video.src = splash3;
        video.load();

        playVideo()
            .then(() => {
                video.addEventListener("ended", fadeOutSplash, { once: true });
            })
            .catch(fadeOutSplash);
    }

    function playSplash2LoopUntilLoaded() {
        video.loop = true;
        video.src = splash2;
        video.load();

        playVideo()
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

    function playSplash1ThenLoopSplash2() {
        video.loop = false;
        video.src = splash1;
        video.load();

        playVideo()
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

    // 疑似ローディング
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

    // スマホの場合はsourceタグを動画内に追加
    if (isMobile) {
        // video内のソースをクリアしてから追加
        video.innerHTML = '';
        const source = document.createElement("source");
        source.src = "images/splash_TT.mp4";
        source.type = "video/mp4";
        source.media = "(max-width: 768px)";
        video.appendChild(source);

        video.loop = false;
        video.load();

        playVideo()
            .then(() => {
                video.addEventListener("ended", fadeOutSplash, { once: true });
            })
            .catch(fadeOutSplash);
    } else {
        playSplash1ThenLoopSplash2();
        simulateLoading();
    }
});
