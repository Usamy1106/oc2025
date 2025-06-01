function detectDeviceAndOrientation() {
    const ua = navigator.userAgent.toLowerCase();
    const isIPad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isLandscape = window.innerWidth > window.innerHeight;

    const html = document.documentElement;
    html.classList.remove('ipad-landscape', 'ipad-portrait');

    if (isIPad) {
        if (isLandscape) {
            html.classList.add('ipad-landscape');
            console.log("ipadLandscape");
        } else {
            html.classList.add('ipad-portrait');
            console.log("ipadPortrait");
        }
    }
}

window.addEventListener('load', detectDeviceAndOrientation);
window.addEventListener('resize', detectDeviceAndOrientation);
window.addEventListener('orientationchange', detectDeviceAndOrientation);
