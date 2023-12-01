import { Command } from '@tauri-apps/api/shell';
import { platform } from '@tauri-apps/api/os';
import { appDataDir } from "@tauri-apps/api/path";
import { CONSOLE_VIEW_STYLE_FILE, LOGS_FILE } from "../../../config/constants";

import { getConsoleViewStyleDict } from "../ConsoleView/ConsoleViewStyleDict"
import Logger from '../../../helpers/Logger';

export const editConsoleStyling = async () => {
    try {
        await getConsoleViewStyleDict()
        const filePath = await appDataDir() + CONSOLE_VIEW_STYLE_FILE;
        const os: string = await platform();

        if (os === "win32") {
            await new Command("notepad", [filePath]).execute();
        } else if (os === "darwin") {
            await new Command("open", [filePath]).execute();
        } else if (os === "linux") {
            await new Command("xdg-open", [filePath]).execute();
        } else {
            alert("Error opening file! Please open the file manually: " + filePath);
        }

    } catch (error) {
        alert("Error opening file! \n" + error);
        Logger.error('Error opening the file:', error);
    }
};


export const openLogs = async () => {
    try {
        const filePath = await appDataDir() + LOGS_FILE;
        const os: string = await platform();

        if (os === "win32") {
            await new Command("notepad", [filePath]).execute();
        } else if (os === "darwin") {
            await new Command("open", [filePath]).execute();
        } else if (os === "linux") {
            await new Command("xdg-open", [filePath]).execute();
        } else {
            alert("Error opening file! Please open the file manually: " + filePath);
        }

    } catch (error) {
        alert("Error opening file! \n" + error);
        Logger.error('Error opening the file:', error);
    }
}