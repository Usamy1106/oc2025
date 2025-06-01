function isSmartPhone() {
    return /iPhone|Android.+Mobile|Windows Phone/.test(navigator.userAgent);
}

const splash = document.getElementById('splash');
const video = document.getElementById('splashVideo');
const wrapper = document.getElementById('Wrapper');

const source = document.createElement('source');
source.src = isSmartPhone() ? 'images/splash_TT.mp4' : 'images/splash.mp4';
source.type = 'video/mp4';
video.appendChild(source);
video.load();

// 動画終了時の処理
video.addEventListener('ended', () => {
    // Wrapperを表示（非表示状態からopacityでフェードイン）
    wrapper.style.display = 'block';
    requestAnimationFrame(() => {
        wrapper.classList.add('show');
    });

    // splashをフェードアウト
    splash.classList.add('fade-out');

    // 完全に非表示にする（フェード完了後）
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1000); // CSSのtransitionと同じ秒数
});