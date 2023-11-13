// React Imports
import React, { useEffect, useState } from "react";

// Component Imports
import BooleanParameterValue from "./ParameterComponents/BooleanParameterValue";
import StringParameterValue from "./ParameterComponents/StringParameterValue";
import CredentialsParameterValue from "./ParameterComponents/CredentialsParameterValue";
import FileParameterValue from "./ParameterComponents/FileParameterValue";
import TextParameterValue from "./ParameterComponents/TextParameterValue";
import PasswordParameterValue from "./ParameterComponents/PasswordParameterValue";
import RunParameterValue from "./ParameterComponents/RunParameterValue";
import OtherParameterValue from "./ParameterComponents/OtherParameter";

export interface JenkinsParameters {
    _class: string | null;
    name: string | null;
    value: string | boolean | number | any[] | null;
    number: number | null;
    jobName: string | null;
    description: string | null;
}

interface StatusViewProps {
    buildData: any;
    parameterDefinition: any[];
}

const ParametersView: React.FC<StatusViewProps> = ({ buildData, parameterDefinition }) => {
    const [parametersWithDescription, setParametersWithDescription] = useState<JenkinsParameters[]>([]);

    const getParameters = (): JenkinsParameters[] => {
        try {
            let buildDataActions = buildData?.actions || [];
            let parameters: JenkinsParameters[] = buildDataActions.find((action: any) => action._class === "hudson.model.ParametersAction")["parameters"];

            return parameters;
        } catch (error) {
            return [];
        }
    }

    const parameters: JenkinsParameters[] = getParameters();
    
    
    const buildNumber: number = buildData?.number || 0;

    const findDefinitionByClass = (parameter: JenkinsParameters): any => {
        return parameterDefinition.find((def: any) => def.name === parameter.name);
    }

    useEffect(() => {
        if (!parameterDefinition) return;

        const parametersWithDescription = parameters.map((parameter) => {
            const definition = findDefinitionByClass(parameter);
            
            if (definition) {
                parameter.description = definition.description;
            } else {
                parameter.description = "This Parameter has no description. It may be a default parameter or has been removed from the job.";
            }
            return parameter;
        });
        setParametersWithDescription(parametersWithDescription);
    }, [parameters, parameterDefinition]);

    // decide which component to load for which parameter by class
    const getComponentForParameter = (parameter: JenkinsParameters): JSX.Element => {
        switch (parameter._class) {
            case "hudson.model.BooleanParameterValue":
                return <BooleanParameterValue parameter={parameter} />;

            case "hudson.model.StringParameterValue":
            case "org.jvnet.jenkins.plugins.nodelabelparameter.NodeParameterValue":
            case "com.cwctravel.hudson.plugins.extended_choice_parameter.ExtendedChoiceParameterValue":
                return <StringParameterValue parameter={parameter} />;

            case "com.cloudbees.plugins.credentials.CredentialsParameterValue":
                return <CredentialsParameterValue parameter={parameter} />;

            case "hudson.model.FileParameterValue":
                return <FileParameterValue buildNumber={buildNumber} parameter={parameter} />;

            case "hudson.model.TextParameterValue":
                return <TextParameterValue parameter={parameter} />;

            case "hudson.model.PasswordParameterValue":
                return <PasswordParameterValue parameter={parameter} />;

            case "hudson.model.RunParameterValue":
                return <RunParameterValue parameter={parameter} />;

            default:
                return <OtherParameterValue parameter={parameter} />;
        }
    }

    return (
        <div className="mx-10 my-10 select-none">
            {buildData ? (
                <div>
                    {parameters.map((parameter, index) => (
                        <div key={index} className="mb-10">{getComponentForParameter(parameter)}</div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default ParametersView;