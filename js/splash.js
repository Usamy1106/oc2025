const video = document.getElementById("splashVideo");

if (video) {
    const promise = video.play();
    if (promise !== undefined) {
        promise
            .then(() => {
                console.log("✅ 動画の再生に成功しました");
            })
            .catch(error => {
                console.warn("⚠️ 動画の再生に失敗しました:", error);
                // 必要ならここでフェードアウトに進める処理を入れる
            });
    }
}
