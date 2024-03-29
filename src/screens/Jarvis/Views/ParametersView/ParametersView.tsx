// React Imports
import React from "react";

// Component Imports
import BooleanParameterValue from "./ParameterComponents/BooleanParameterValue";
import StringParameterValue from "./ParameterComponents/StringParameterValue";
import CredentialsParameterValue from "./ParameterComponents/CredentialsParameterValue";
import FileParameterValue from "./ParameterComponents/FileParameterValue";
import TextParameterValue from "./ParameterComponents/TextParameterValue";
import PasswordParameterValue from "./ParameterComponents/PasswordParameterValue";
import OtherParameterValue from "./ParameterComponents/OtherParameter";
import { IJenkinsBuild, JenkinsBuildAction, JenkinsBuildParameter } from "../../../../Interfaces/IBuildInterface";
import { IJenkinsProjectParameterDefinition } from "@/Interfaces/IProjectInterface";

interface Props {
    buildData: IJenkinsBuild;
	parameterDefinition: IJenkinsProjectParameterDefinition[] | undefined;
}

const ParametersView: React.FC<Props> = ({ buildData, parameterDefinition }) => {
	const getParameters = (): JenkinsBuildParameter[] => {
		try {
			const buildDataActions: JenkinsBuildAction[] = buildData?.actions || [];
			const parameters = buildDataActions.find((action: JenkinsBuildAction) => action._class === "hudson.model.ParametersAction")?.parameters;

			if (parameters === undefined) return [];

			for (let i = 0; i < parameters.length; i++) {
				const parameterDefinitionForParameter = parameterDefinition?.find((parameterDef) => parameterDef.name === parameters[i].name);
				
				if (parameterDefinitionForParameter?.description) {
					parameters[i].description = parameterDefinitionForParameter.description;
				}
			}

			return parameters || [] as JenkinsBuildParameter[];
		} catch (error) {
			return [];
		}
	};

	const parameters: JenkinsBuildParameter[] = getParameters();

	const buildNumber: number = buildData?.number || 0;

	// decide which component to load for which parameter by class
	const getComponentForParameter = (parameter: JenkinsBuildParameter): React.JSX.Element => {
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
		default:
			return <OtherParameterValue parameter={parameter} />;
		}
	};

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
	);
};

export default ParametersView;
