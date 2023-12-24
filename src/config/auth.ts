import { AuthDetails } from "../Interfaces/IAuthDetails";
import Logger from "../helpers/Logger";
import StorageManager from "../helpers/StorageManager";

export const getAuthDetails = (): AuthDetails | null => {
	const authDetails: AuthDetails = {
		baseurl: StorageManager.get("baseurl"),
		username: StorageManager.get("username"),
		apitoken: StorageManager.get("apiToken"),
	};

	if (!authDetails.baseurl || !authDetails.username || !authDetails.apitoken) {
		Logger.error("Missing auth details. Is Onboarding complete?");
		return null;
	}

	return authDetails;
};
