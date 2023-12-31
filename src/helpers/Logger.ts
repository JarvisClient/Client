import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { arch, platform } from "@tauri-apps/api/os";
import { ErrorInfo } from "react";
import { LOGS_FILE } from "../config/constants";

const Logger = {
	log: <T extends unknown[]>(...messages: T) => logMessage("LOG", "color: #;", ...messages),
	info: <T extends unknown[]>(...messages: T) => logMessage("INFO", "color: #3b82f6;", ...messages),
	debug: <T extends unknown[]>(...messages: T) => logMessage("DEBUG", "color: #7c3aed;", ...messages),
	warning: <T extends unknown[]>(...messages: T) => logMessage("WARNING", "color: #d97706;", ...messages),
	error: <T extends unknown[]>(...messages: T) => logMessage("ERROR", "color: #ef4444;", ...messages),
	fatal: <T extends unknown[]>(...messages: T) => logMessage("FATAL", "color: #ef4444; background: black", ...messages),
	clearLogfile
} as const;

/**
 * @return {Promise<number>} The size of the log file in bytes
 */
export async function getLogfileSize(): Promise<number> {
	// read file content
	const file = await readTextFile(LOGS_FILE, { dir: BaseDirectory.AppData });

	console.log(file);
	

	// get file size
	return file.length;
}

export async function writeEmergencyLog(error: Error, errorInfo: ErrorInfo): Promise<string> {
	const emergency_log_file_name = `emergency_log_${Math.floor(Date.now() / 1000)}.log`;
	try {
		const raw_logs = `
			==================== JARVIS EMERGENCY LOG ====================
			Created at: ${getCurrentDateTime()}
			File Name: ${emergency_log_file_name}
			OS - Arch: ${await platform()}-${await arch()}
			==================== JARVIS EMERGENCY LOG ====================

			==================== ERROR INFO ====================
			${JSON.stringify(errorInfo.componentStack)}

			${JSON.stringify(errorInfo.digest)}
			==================== ERROR INFO ====================

			==================== ERROR ====================
			${JSON.stringify(error.name)}: ${JSON.stringify(error.message)}

			${JSON.stringify(error.stack)}

			==================== ERROR ====================
		`;

		await writeTextFile(emergency_log_file_name, raw_logs, {
			dir: BaseDirectory.AppData,
			append: true,
		});

		writeToLog("EMERGENCY", `An Emergency Log was created. Check the file: ${emergency_log_file_name} for more details.`);
	} catch (error) {
		alert(`An Error occured while trying to write an Emergency Log: ${JSON.stringify(error)}`);
		Logger.error("An Error occured while trying to write an Emergency Log: ", error);
	}
	return await appDataDir() + emergency_log_file_name;
}

/**
 * 
 * @returns true if the log file was cleared successfully
 */
export async function clearLogfile(): Promise<boolean> {
	try {
		await writeTextFile(LOGS_FILE, "", { dir: BaseDirectory.AppData });
		return true;
	} catch (error) {
		alert(`An Error occured while trying to clear the Log File: ${JSON.stringify(error)}`);
		Logger.error("An Error occured while trying to clear the Log File: ", error);
	}

	return false;
}

export async function onStartup() {
	await writeToLog("SYSTEM", "==================== JARVIS STARTUP ====================");
}

function logMessage<T extends unknown[]>(level: string, css: string, ...messages: T) {
	try {
		const { stack } = new Error();
		const stackLines = stack?.split("\n") || [];
		let callerLine = stackLines[3]; // Adjust the index if necessary

		// Cleaning up the string to extract file name, line, etc.
		callerLine = callerLine.replace(/^\s*at\s*/, ""); // Removes the 'at ' from the start

		if (level === "FATAL" || level === "ERROR" || level === "WARNING") {
			console.error(`%c[${level}] ${callerLine}:\n`, css, ...messages);
			writeToLog(level, ...messages);
		} else {
			console.log(`%c[${level}] ${callerLine}:\n`, css, ...messages);
		}
	} catch (error) {
		const error_msg = `An Error occured while trying to use Logger: ${JSON.stringify(error)}`;
		console.error("Logger Error: ", error_msg);
		console.log("Logged Message: ", ...messages);

		writeToLog("ERROR", error_msg);
	}
}

function getCurrentDateTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function writeToLog<T extends unknown[]>(level: string, ...messages: T) {
	try {
		await writeTextFile(LOGS_FILE, `[${getCurrentDateTime()}] [${level}] ${messages.join(" ")}`, {
			dir: BaseDirectory.AppData,
			append: true,
		});
	} catch (error) {
		console.error(error);
	}
}

export default Logger;
