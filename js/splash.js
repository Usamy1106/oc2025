document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const video = document.getElementById("splashVideo");
    const main = document.getElementById("Wrapper");

    const isMobile = window.innerWidth <= 768;

    const splash1 = isMobile ? "images/splash_TT1.mp4" : "images/splash_1.mp4";
    const splash2 = isMobile ? "images/splash_TT2.mp4" : "images/splash_2.mp4";
    const splash3 = isMobile ? "images/splash_TT3.mp4" : "images/splash_3.mp4";

    let loadingComplete = false;

    // 安全対策
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    function fadeOutSplash() {
        main.style.display = "block";
        main.style.overflow = "auto";
        main.classList.add("show");
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    }

    function playVideo(src, loop = false) {
        return new Promise((resolve, reject) => {
            video.loop = loop;
            video.src = src;
            video.load();

            video.onloadeddata = () => {
                video.play()
                    .then(resolve)
                    .catch((err) => {
                        console.error(`再生エラー: ${src}`, err);
                        reject(err);
                    });
            };
        });
    }

    function playSplash3() {
        playVideo(splash3, false)
            .then(() => {
                video.addEventListener("ended", fadeOutSplash, { once: true });
            })
            .catch(fadeOutSplash);
    }

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

    function simulateLoading() {
        setTimeout(() => {
            loadingComplete = true;
        }, 5000);
    }

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });

    playSplash1ThenLoopSplash2();
    simulateLoading();
});
