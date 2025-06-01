document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('splashVideo');
    const splash = document.getElementById('splash');
    const wrapper = document.getElementById('Wrapper');

    const isMobile = /iPhone|iPad|Android|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        video.src = 'images/splash_TT.mp4';
        video.loop = false;
        video.play();

        video.onended = () => {
            fadeOutSplash();
        };
        return;
    }

    const sources = ['images/splash_1.mp4', 'images/splash_2.mp4', 'images/splash_3.mp4'];
    let currentIndex = 0;

    // リソース読み込み完了を模擬
    let resourcesReady = false;
    setTimeout(() => {
        resourcesReady = true;
    }, 3000);

    function playVideo(index) {
        currentIndex = index;
        video.src = sources[currentIndex];
        video.loop = false; // ループは自分で制御するのでfalse固定
        video.load();
        video.play();
    }

    playVideo(0);

    video.onended = () => {
        if (currentIndex === 0) {
            // splash_1が終わったらsplash_2再生開始
            playVideo(1);
        } else if (currentIndex === 1) {
            if (!resourcesReady) {
                // 読み込み完了前はsplash_2を繰り返し再生（ループの代替）
                playVideo(1);
            } else {
                // 読み込み完了後はsplash_3に進む
                playVideo(2);
            }
        } else if (currentIndex === 2) {
            // 最後はフェードアウト
            fadeOutSplash();
        }
    };

    function fadeOutSplash() {
        splash.classList.add('fade-out');
        splash.addEventListener('transitionend', () => {
            splash.style.display = 'none';
            wrapper.style.display = 'block';
            setTimeout(() => {
                wrapper.classList.add('show');
            }, 10);
        }, { once: true });
    }
});
