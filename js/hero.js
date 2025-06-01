
document.addEventListener("DOMContentLoaded", () => {
    const upTargets = ['.human_3', '.human_4', '.human_6', '.human_7'];
    const leftTargets = ['.human_', '.human_2', '.human_5'];
    const rightTargets = ['.human_8', '.human_9', '.human_10'];
    const humans = document.querySelectorAll('.hero-area .human');


    let humansAnimated = false;

    function animateHumans() {
        humans.forEach(el => {
            const delay = Math.random() * 1000;
            setTimeout(() => {
                el.classList.add('action');
            }, delay);
        });
        humansAnimated = true;
    }

    function resetHumans() {
        humans.forEach(el => {
            el.classList.remove('action');
            el.classList.add('reset-pop');
        });
        humansAnimated = false;
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = 400;

        // ─── オパシティ制御 ───
        const opacity = Math.max(0, 1 - scrollY / maxScroll);
        const targets = document.querySelectorAll(
            '.tittle, .text-oc2025__pc__en, .text-oc2025__sp__en, .text-oc2025__pc, .text-oc2025__sp, .text-date'
        );
        targets.forEach(el => {
            el.style.opacity = opacity;
        });

        // ─── humanアニメーション切り替え ───
        if (scrollY > 100 && !humansAnimated) {
            animateHumans();
        } else if (scrollY <= 100 && humansAnimated) {
            resetHumans();
        }
    });

    // 初期チェック
    if (window.scrollY > 100) {
        animateHumans();
    }
});