import Logger from "../../../helpers/Logger";
import { fetchUtils } from "../../Jarvis/Utils/fetchUtils";

export const checkJenkinsConnection = async (): Promise<boolean> => {
	try {
		const response = await fetchUtils.fetchJenkinsData();
		if (response) return true;
	} catch (error) {
		Logger.error("Error while trying to get Jenkins Data", error);
	}
	return false;
};