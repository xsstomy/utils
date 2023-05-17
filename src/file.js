import fs from "fs-extra";
import path from "path";

/**
 *  获取文件夹下所有文件的路径
 * @param {*} folderPath
 * @param {*} fileTypes
 * @param {*} result
 * @returns
 */
export async function getFilesPath(
    folderPath,
    fileTypes = [] || "",
    result = []
) {
    if (!fs.existsSync(folderPath)) {
        throw new Error(`${folderPath} does not exist`);
    }

    if (!Array.isArray(fileTypes) && typeof fileTypes !== "string") {
        throw new Error(`${fileTypes} is not an array or string`);
    }

    if (!Array.isArray(result)) {
        throw new Error(`${result} is not an array`);
    }

    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isFile()) {
            const extname = path.extname(file).slice(1).toLowerCase();
            if (
                Array.isArray(fileTypes)
                    ? fileTypes.includes(extname) || fileTypes.length === 0
                    : fileTypes === file
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
