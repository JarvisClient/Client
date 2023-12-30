import { IStylingDict } from "../../../../Interfaces/StylingDict";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";

const handleApplyStyledDataWebWorker = (data: string, stylingDict: IStylingDict): Promise<string> => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" });

        worker.onmessage = (e) => {
            resolve(e.data);
            worker.terminate();
        };

        worker.onerror = (e) => {
            reject(e);
            worker.terminate();
        };

        worker.postMessage({ data, stylingDict });
    });
};

export const formatConsoleData = async (lines: String[]) => {
    // Process each line to replace URLs with clickable links
    const formattedLines = lines.map((line) => line.replace(
        /https?:\/\/[^\s]+/g,
        (match) => `<a href="${match}" target="_blank">${match}</a>`,
    ));

    // Join the formatted lines back together with newline characters
    const formattedData = formattedLines.join("\n");

    const stylingDict: IStylingDict = await getConsoleViewStyleDict();

    // Apply styles based on the dictionary and get the styled data
    const styledData = await handleApplyStyledDataWebWorker(formattedData, stylingDict);

    return styledData;
}
