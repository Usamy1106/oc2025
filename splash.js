document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("splashVideo");
    if (video) {
        console.log("✅ splashVideo 見つかりました");

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("🎥 再生成功");
                })
                .catch(error => {
                    console.warn("⚠️ 再生失敗:", error);
                });
        }
    } else {
        console.warn("❌ splashVideo が見つかりません");
    }
});
