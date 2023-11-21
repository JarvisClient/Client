interface JenkinsAction {
    _class: string;
    // Additional properties based on your actual data structure
    // Add here according to your needs
}

interface JenkinsRun {
    actions: JenkinsAction[];
    // Additional properties based on your actual data structure
    // Add here according to your needs
}

function featureButtonKeywordFinder(jenkinsRun: JenkinsRun): string[] {
    const keywordsToFind = ['artifacts', 'parameters'];
    const result: string[] = [];

    jenkinsRun.actions.forEach((action: any) => {
        if (action._class === 'hudson.model.ParametersAction' && action.parameters) {
            action.parameters.forEach((parameter: any) => {
                if (keywordsToFind.includes(parameter.name) && parameter.value) {
                    result.push(parameter.value);
                }
            });
        } else if (
            action._class === 'hudson.model.CauseAction' &&
            action.causes &&
            action.causes.length > 0
        ) {
            action.causes.forEach((cause: any) => {
                if (
                    cause._class === 'hudson.model.Cause$UserIdCause' &&
                    cause.shortDescription &&
                    cause.userId
                ) {
                    result.push(`${cause.shortDescription}: ${cause.userId}`);
                }
            });
        }
        // Add more conditions as needed for other classes

        // You can customize this part based on your actual data structure
    });

    return result;
}

export default featureButtonKeywordFinder;