import { IJenkinsBuild, JenkinsBuildAction, JenkinsBuildCause, JenkinsBuildParameter } from "../Interfaces/IBuildInterface";

function featureButtonKeywordFinder(jenkinsRun: IJenkinsBuild): string[] {
	const keywordsToFind = ["artifacts", "parameters"];
	const result: string[] = [];

	jenkinsRun.actions.forEach((action: JenkinsBuildAction) => {
		if (action._class === "hudson.model.ParametersAction" && action.parameters) {
			action.parameters.forEach((parameter: JenkinsBuildParameter) => {
				if (keywordsToFind.includes(parameter.name) && parameter.value) {
					result.push(parameter.value);
				}
			});
		} else if (
			action._class === "hudson.model.CauseAction"
            && action.causes
            && action.causes.length > 0
		) {
			action.causes.forEach((cause: JenkinsBuildCause) => {
				if (
					cause._class === "hudson.model.Cause$UserIdCause"
                    && cause.shortDescription
                    && cause.userId
				) {
					result.push(`${cause.shortDescription}: ${cause.userId}`);
				}
			});
		}
	});

	return result;
}

export default featureButtonKeywordFinder;
