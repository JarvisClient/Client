import { getVersion } from "@tauri-apps/api/app";
import { ReleaseInfo } from "../../../Interfaces/IReleaseInfo";
import Logger from "../../../helpers/Logger";

/**
 *
 * @returns true if there is an update available
 */
export const checkForUpdates = async () => {
	const currentVersion = await getVersion();
	const response = await fetch(
		"https://api.jarvisci.com/latest",
	);
	const data: ReleaseInfo = await response.json();

	if (data.error) {
		Logger.error("updateChecker.tsx", "Error while trying to get Update Data, this occured on the Backend", data.error);
		throw new Error(data.error);
	}

	Logger.info("updateChecker.tsx", `Current version: ${currentVersion}`);
	Logger.info("updateChecker.tsx", `Latest version: ${data.version}`);

	const latestVersion = data.version;
	return currentVersion !== latestVersion;
};

export const getUpdateInfo = async (): Promise<ReleaseInfo> => {
	const response = await fetch(
		"https://api.jarvisci.com/latest",
	);
	const data: ReleaseInfo = await response.json();

	// if data .error is defined, then there was an error
	if (data.error) {
		Logger.error("updateChecker.tsx", "Error while trying to get Update Data, this occured on the Backend", data.error);
		throw new Error(data.error);
	}

	return data;
};
