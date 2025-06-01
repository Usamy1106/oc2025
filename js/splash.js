
// 新しいスマホ判定（画面幅ベース）
function isSmartPhone() {
    return window.matchMedia('(max-width: 768px)').matches;
}

const splash = document.getElementById('splash');
const video = document.getElementById('splashVideo');
const wrapper = document.getElementById('Wrapper');

const source = document.createElement('source');
source.src = isSmartPhone() ? 'images/splash_TT.mp4' : 'images/splash.mp4';
source.type = 'video/mp4';
video.appendChild(source);
video.load();

video.addEventListener('ended', () => {
    // Wrapperを表示
    wrapper.style.display = 'block';
    requestAnimationFrame(() => {
        wrapper.classList.add('show');
    });

    // splashをフェードアウト
    splash.classList.add('fade-out');

    // 完全非表示
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1000);
});