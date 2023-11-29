
import { exists, BaseDirectory, createDir, writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { stylingDict as defaultStylingDict, IStylingDict } from "./styleDict";
import { CONSOLE_VIEW_STYLE_FILE } from '../../../config/constants';

export async function getConsoleViewStyleDict(): Promise<IStylingDict> {
try {
    const appDataDirExists = await exists("", { dir: BaseDirectory.AppData });

    if (!appDataDirExists) {
        await createDir("", { dir: BaseDirectory.AppData });
    }

    if (await exists(CONSOLE_VIEW_STYLE_FILE, { dir: BaseDirectory.AppData })) {
        return await JSON.parse(await readTextFile(CONSOLE_VIEW_STYLE_FILE, { dir: BaseDirectory.AppData }))
    } else {
        await writeTextFile(CONSOLE_VIEW_STYLE_FILE, await JSON.stringify(defaultStylingDict), { dir: BaseDirectory.AppData });
        return defaultStylingDict;
    }
        

} catch (error: any) {
    console.error(error);
    alert("Error getting " + CONSOLE_VIEW_STYLE_FILE + " \n" + error)
    return defaultStylingDict;
}
}