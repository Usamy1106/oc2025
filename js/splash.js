
document.addEventListener('DOMContentLoaded', function () {
    const splash = document.getElementById('splash');
    const splashVideo = document.getElementById('splashVideo');
    const wrapper = document.getElementById('Wrapper');

    splashVideo.addEventListener('ended', function () {
        // splash フェードアウト
        splash.classList.add('fade-out');

        // 同時に wrapper 表示開始（フェードイン）
        wrapper.style.display = 'block';      // 表示状態にする
        wrapper.classList.add('show');        // opacity: 1 に向かう
    });
});

