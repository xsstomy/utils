import file from "../src/file.js";
import path from "path";
(async () => {
    const files = await file.getFilesPath(
        "F:\\0109\\4册（主题一二）打不开的玩游戏\\wyx（保护海洋）",
        ["mp3"]
    );
    files.forEach((f) => {
        console.log(f);
    });
})();
