import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { arch, platform } from "@tauri-apps/api/os";
import { ErrorInfo } from "react";
import { LOGS_FILE } from "../config/constants";

/**
 * @classdesc A class to manage logging in the application
 * @note This class is a wrapper around the console.log API. It is used to log messages to the console and to a log file
 */
const Logger = {
	info: <T extends unknown[]>(suffix: string, ...messages: T) => logMessage("INFO - " + suffix, "color: #3b82f6;", ...messages),
	debug: <T extends unknown[]>(suffix: string, ...messages: T) => logMessage("DEBUG - " + suffix, "color: #7c3aed;", ...messages),
	warning: <T extends unknown[]>(suffix: string, ...messages: T) => logMessage("WARNING - " + suffix, "color: #d97706;", ...messages),
	error: <T extends unknown[]>(suffix: string, ...messages: T) => logMessage("ERROR - " + suffix, "color: #ef4444;", ...messages),
	fatal: <T extends unknown[]>(suffix: string, ...messages: T) => logMessage("FATAL - " + suffix, "color: #ef4444; background: black", ...messages),
	clearLogfile
} as const;

/**
 * @return {Promise<number>} The size of the log file in bytes
 */
export async function getLogfileSize(): Promise<number> {
	// read file content
	const file = await readTextFile(LOGS_FILE, { dir: BaseDirectory.AppData });

	// get file size
	return file.length;
}

/**
 * 
 * @param error Error object
 * @param errorInfo ErrorInfo object
 * @returns The path to the emergency log file
 * @note This function is used to write an emergency log file when an error occurs that causes the application to crash
 */
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
		Logger.error("helpers/Logger.ts", "An Error occured while trying to write an Emergency Log: ", error);
	}
	return await appDataDir() + emergency_log_file_name;
}

/**
 * 
 * @returns True if the log file was cleared successfully, false otherwise
 */
export async function clearLogfile(): Promise<boolean> {
	try {
		await writeTextFile(LOGS_FILE, "", { dir: BaseDirectory.AppData });
		return true;
	} catch (error) {
		alert(`An Error occured while trying to clear the Log File: ${JSON.stringify(error)}`);
		Logger.error("helpers/Logger.ts", "An Error occured while trying to clear the Log File: ", error);
	}

	return false;
}

/**
 * @note This function is called when the application starts. It writes a message to the log file
 */
export async function onStartup() {
	await writeToLog("SYSTEM", "==================== JARVIS STARTUP ====================");
}

/**
 * 
 * @param level Log level
 * @param css CSS to apply to the log message
 * @param messages Messages to log
 * @note This function is used to log messages to the console and to a log file
 * @example
 * logMessage("INFO", "color: #3b82f6;", "Hello World");
 */
function logMessage<T extends unknown[]>(level: string, css: string, ...messages: T) {
	try {
		if (level.includes("DEBUG") && window.location.port !== "1420") return; 

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

/**
 * @returns The current date and time in the format: YYYY-MM-DD HH:MM:SS
 * @note This function is duplicated in src/helpers/utils.ts
 */
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

/**
 * 
 * @param level Log level
 * @param messages Messages to log
 * @note This function is used to write messages to the log file
 */
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
