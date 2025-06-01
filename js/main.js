const triggers = document.querySelectorAll('.animation-trigger');

// 関数：要素が画面内に入ったかをチェック
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && rect.bottom > 0
  );
};

// 関数：スクロール時にトリガー要素を確認し、その中のfadeIn/zoomInにactionを付与
const handleScroll = () => {
  triggers.forEach(trigger => {
    if (isElementInViewport(trigger)) {
      //const fadeInElems = trigger.querySelectorAll('.fadeIn');
      const zoomInElems = trigger.querySelectorAll('.zoomIn');

      //fadeInElems.forEach(el => el.classList.add('action'));
      zoomInElems.forEach(el => el.classList.add('action'));
    }
  });
};

// 初回読み込み時とスクロール時に実行
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);





/*
//ハンバーガーメニュー
document.querySelector('.openbtn').addEventListener('click', function() {
  this.classList.toggle('active'); // ボタンに 'active' クラスを付与・除去
  document.getElementById('g-nav').classList.toggle('panelactive'); // ナビゲーションに 'panelactive' クラスを付与・除去
});

// ナビゲーションのリンクがクリックされたときの処理
document.querySelectorAll('#g-nav a').forEach(function(navLink) {
  navLink.addEventListener('click', function() {
    document.querySelector('.openbtn').classList.remove('active'); // ボタンの 'active' クラスを除去
    document.getElementById('g-nav').classList.remove('panelactive'); // ナビゲーションの 'panelactive' クラスを除去
  });
});*/