import fse from "fs-extra";
import path from "path";
export async function getFilesPath(folderPath, fileTypes = [], result = []) {
    // 判断路径是否存在
    if (!fse.existsSync(folderPath)) {
        throw new Error(`${folderPath} does not exist`);
    }

    if (!Array.isArray(fileTypes)) {
        throw new Error(`${fileTypes} is not an array`);
    }

    if (!Array.isArray(result)) {
        throw new Error(`${result} is not an array`);
    }

    //
    const files = await fse.readdir(folderPath);
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(folderPath, files[i]);
        const stat = await fse.stat(filePath);

        if (stat.isFile()) {
            const extname = path
                .extname(files[i])
                .replace(/\./g, "")
                .toLowerCase();
            if (
                (fileTypes.length > 0 && fileTypes.includes(extname)) ||
                fileTypes.length === 0
            ) {
                result.push(filePath);
            }
        } else if (stat.isDirectory()) {
            await getFilesPath(filePath, fileTypes, result);
        }
    }

    return result;
}

export default {
    getFilesPath,
};
