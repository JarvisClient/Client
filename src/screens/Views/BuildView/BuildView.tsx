// React Imports
import React, { useEffect, useState } from "react";
import BoolenParameterDefinition from "./ParameterComponents/BoolenParameterDefinition";
import StringParameterDefinition from "./ParameterComponents/StringParameterDefinition";
import TextParameterDefinition from "./ParameterComponents/TextParameterDefinition";

import authDetails from "../../../config/auth";

import { invoke, notification } from "@tauri-apps/api";
import OtherParameterDefinition from "./ParameterComponents/OtherParameterDefinition";
import ChoiceParameterDefinition from "./ParameterComponents/ChoiceParameterDefinition";
import { BUILD_VIEW_BANNER_CLOSE_TIME } from "../../../config/constants";
import Logger from "../../../helpers/Logger";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";

interface BuildViewProps {
    parameterDefinition: any[];
    buildData: any;
}

export interface JenkinsParameters {
    defaultParameterValue: {
        _class: string;
        value: string | boolean;
    },
    choices: string[];
    description: string;
    name: string;
    type: string;
    _class: string;
}

const BuildView: React.FC<BuildViewProps> = ({ parameterDefinition, buildData }) => {
	const [parameterValues, setParameterValues] = useState<{ [key: string]: string | boolean | number | null }>({});
	const [SParameterDefinitions, setSParameterDefinitions] = useState<JenkinsParameters[]>([]);
	const [parameterAvailable, setParameterAvailable] = useState(false);
	const projectName = localStorage.getItem("projectName");

	const notification = useNotification();

	useEffect(() => {
		try {
			setSParameterDefinitions(parameterDefinition);
			if (buildData) setSParameterDefinitions(mergeParameters(parameterDefinition, buildData));
		} catch (error) {
			setParameterAvailable(true);
		}
	}, [parameterDefinition, buildData]);

	const mergeParameters = (parameterDefinition: JenkinsParameters[], buildData: any) => {

		const buildData_params = buildData.actions.find((action: any) => action._class === "hudson.model.ParametersAction")["parameters"];
		const definitons: JenkinsParameters[] = parameterDefinition;

		definitons.forEach((definition) => {
			const correspondingBuildData = buildData_params.find((param: any) => param.name === definition.name);

			if (correspondingBuildData) {
				definition.defaultParameterValue.value = (correspondingBuildData.value).toString();
			}
		});

		return definitons;
	};

	const buildButtonClick = async () => {
		const config = {
			...authDetails,
			projectName: projectName,
			params: parameterValues
		};

		try {
			let response: string;
			if (SParameterDefinitions) {
				Logger.info("Made request to start build with parameters: ", parameterValues);
				response = await invoke("start_build_with_parameters", config);
			} else {
				Logger.info("Made request to start build without parameters");
				response = await invoke("start_build", config);
			}

			if (response.includes("Error")) {
				throw new Error("Most likely a Build is already in Queue! Please wait a few seconds and try again.");
			}

			notification.showNotification("Build started!", "The build was successfully started!\nIt might take up to 30 seconds for it to appear.", "build");
		} catch (error) {
			Logger.error(error);

			alert("An error occured while starting the build!\n" + error);
		}


	};

	const getComponentForParameter = (parameter: JenkinsParameters): JSX.Element => {
		switch (parameter._class) {
		case "hudson.model.BooleanParameterDefinition":
			return <BoolenParameterDefinition
				parameters={parameter}
				value={String(parameterValues[parameter.name]) || "false"}
				onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
			/>;

		case "hudson.model.StringParameterDefinition":
		case "org.jvnet.jenkins.plugins.nodelabelparameter.NodeParameterDefinition":
			return <StringParameterDefinition
				parameters={parameter}
				value={parameterValues[parameter.name] || ""}
				onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
			/>;

		case "hudson.model.TextParameterDefinition":
			return <TextParameterDefinition
				parameters={parameter}
				value={parameterValues[parameter.name] || ""}
				onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
			/>;

		case "hudson.model.ChoiceParameterDefinition":
		case "jp.ikedam.jenkins.plugins.extensible_choice_parameter.ExtensibleChoiceParameterDefinition":
			return <ChoiceParameterDefinition
				parameters={parameter}
				value={parameterValues[parameter.name] || ""}
				onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
			/>;

		default:
			return <OtherParameterDefinition parameter={parameter} />;
		}
	};


	return (
		<div className="mx-10 my-10 select-none">
			{parameterAvailable && (
				<div className="flex mb-5 items-center w-full p-4 bg-[#403D2F] rounded-lg shadow">
					<div className="ms-3 text-md font-normal">
						<strong>No parameters available!</strong> It appears that this job does not offer any parameters.
					</div>
				</div>
			)}

			<h1 className="text-3xl font-bold mb-[40px]">Start a new Build</h1>
			{SParameterDefinitions?.map((parameter, index) => (
				<div key={index} className="mb-10">{getComponentForParameter(parameter)}</div>
			))}

			<button
				onClick={buildButtonClick}
				className={"w-[80px] h-[37px] text-[15px] text-white bg-[#3a5e4b] font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-background-card-selected hover:brightness-[1.3]"}>
				<b>Build</b>
			</button>
		</div>
	);
};

export default BuildView;