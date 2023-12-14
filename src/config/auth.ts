import Logger from "../helpers/Logger";

// Define the AuthDetails interface
interface AuthDetails {
  baseurl: string | null;
  username: string | null;
  apitoken: string | null;
}

export const getAuthDetails = (): AuthDetails | null => {
  let authDetails: AuthDetails = {
    baseurl: localStorage.getItem("baseurl"),
    username: localStorage.getItem("username"),
    apitoken: localStorage.getItem("apiToken"),
  };

  if (!authDetails.baseurl || !authDetails.username || !authDetails.apitoken) {
    Logger.error("Missing auth details. Is Onboarding complete?");
    return null;
  }

  return authDetails;
};
