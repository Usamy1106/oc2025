window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const wrapper = document.getElementById('Wrapper');
    const video = document.getElementById('splashVideo');

    // PC/SP判定（ここは適宜判定ロジックを変更してください）
    const isSP = window.innerWidth <= 480;

    // 動画ソース切り替え
    video.src = isSP ? 'images/splash_TT.mp4' : 'images/splash.mp4';

    // video読み込み後自動再生開始
    video.load();
    video.play();

    // 再生終了時の処理
    video.addEventListener('ended', () => {
        // フェードアウト開始
        splash.classList.add('fade-out');

        // Wrapperをblockにしてフェードイン
        wrapper.style.display = 'block';
        setTimeout(() => {
            wrapper.classList.add('show');
        }, 50); // 少し遅延を入れてCSSのトランジションを効かせる

        // フェードアウト完了後にdisplay:noneに
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000); // CSSのopacity 1秒に合わせる
    });
});
