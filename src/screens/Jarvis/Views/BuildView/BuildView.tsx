// React Imports
import React, { useEffect, useState } from "react";
import BoolenParameterDefinition from "./ParameterComponents/BoolenParameterDefinition";
import StringParameterDefinition from "./ParameterComponents/StringParameterDefinition";
import TextParameterDefinition from "./ParameterComponents/TextParameterDefinition";

import OtherParameterDefinition from "./ParameterComponents/OtherParameterDefinition";
import ChoiceParameterDefinition from "./ParameterComponents/ChoiceParameterDefinition";
import Logger from "../../../../helpers/Logger";
import { useNotification } from "../../../../components/NotificationManager/NotificationContext";

import StorageManager from "../../../../helpers/StorageManager";
import { IJenkinsProjectParameterDefinition } from "../../../../Interfaces/IProjectInterface";
import { IJenkinsBuild } from "../../../../Interfaces/IBuildInterface";
import { fetchUtils } from "../../Utils/fetchUtils";
import { motion } from "framer-motion";
import { IcoArrowTriangleRight } from "@/Icons/pack_1";

interface Props {
	parameterDefinition: IJenkinsProjectParameterDefinition[] | undefined;
	buildData: IJenkinsBuild;
}

const BuildView: React.FC<Props> = ({ parameterDefinition, buildData }) => {
	const [parameterValues, setParameterValues] = useState<{ [key: string]: string | boolean | number | null }>({});
	const [SParameterDefinitions, setSParameterDefinitions] = useState<IJenkinsProjectParameterDefinition[]>([]);
	const [buildButtonDisabled, setBuildButtonDisabled] = useState<boolean>(false);
	const projectName = StorageManager.get("projectName");

	const notification = useNotification();

	useEffect(() => {
		try {
			if (parameterDefinition && buildData) {
				setSParameterDefinitions(parameterDefinition);
				setSParameterDefinitions(mergeParameters(parameterDefinition, buildData));
			}
		} catch (error) {
			Logger.error("BuildView/BuildView.tsx", error);
		}
	}, [parameterDefinition, buildData]);

	const mergeParameters = (parameterDefinition: IJenkinsProjectParameterDefinition[], buildData: IJenkinsBuild) => {
		if (!parameterDefinition || !buildData) return [];
		const buildData_params = buildData.actions?.find((action) => action._class === "hudson.model.ParametersAction")?.parameters;
		const definitons = parameterDefinition;

		definitons.forEach((definition) => {
			const correspondingBuildData = buildData_params?.find((param) => param.name === definition.name);

			if (correspondingBuildData) {
				definition.defaultParameterValue.value = (correspondingBuildData.value).toString();
			}
		});

		return definitons;
	};

	const buildButtonClick = async () => {
		try {
			let response: string;
			if (SParameterDefinitions) {
				Logger.info("Jarvis/Utils/JarvisUtils.tsx", "Made request to start build with parameters: ", parameterValues);
				response = await fetchUtils.startBuild(projectName, parameterValues);
			} else {
				Logger.info("Jarvis/Utils/JarvisUtils.tsx", "Made request to start build without parameters");
				response = await fetchUtils.startBuild(projectName, parameterValues);
			}

			if (response.includes("Error")) {
				throw new Error("Most likely a Build is already in Queue! Please wait a few seconds and try again.");
			}

			notification.showNotification("Build started!", "The build was successfully started!\nIt might take up to 30 seconds for it to appear.", "build", {
				soundOn: true,
				soundType: "success",
			});

			// Disable the button for 5 seconds
			setBuildButtonDisabled(true);
			setTimeout(() => setBuildButtonDisabled(false), 2000);

		} catch (error) {
			Logger.error("Jarvis/Utils/JarvisUtils.tsx", error);
			notification.showNotification("Jenkins responded with an Error!", String(error), "error", {
				soundOn: true,
				soundType: "error",
			});
		}
	};

	const getComponentForParameter = (parameter: IJenkinsProjectParameterDefinition): React.JSX.Element => {
		switch (parameter._class) {
			case "hudson.model.BooleanParameterDefinition":
				return (
					<BoolenParameterDefinition
						parameters={parameter}
						value={String(parameterValues[parameter.name]) || "false"}
						onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
					/>
				);

			case "hudson.model.StringParameterDefinition":
			case "org.jvnet.jenkins.plugins.nodelabelparameter.NodeParameterDefinition":
				return (
					<StringParameterDefinition
						parameters={parameter}
						value={parameterValues[parameter.name] || ""}
						onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
					/>
				);

			case "hudson.model.TextParameterDefinition":
				return (
					<TextParameterDefinition
						parameters={parameter}
						value={parameterValues[parameter.name] || ""}
						onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
					/>
				);

			case "hudson.model.ChoiceParameterDefinition":
			case "jp.ikedam.jenkins.plugins.extensible_choice_parameter.ExtensibleChoiceParameterDefinition":
				return (
					<ChoiceParameterDefinition
						parameters={parameter}
						onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
					/>
				);

			default:
				return <OtherParameterDefinition parameter={parameter} />;
		}
	};

	return (
		<div className="mx-10 my-10 select-none">
			<span className="flex flex-row items-center space-x-4 mb-[40px]">
				<span className="flex items-center justify-center rounded-md bg-[#2D483A] h-10 w-10">
				<IcoArrowTriangleRight color="#84FFB3" size={28} className="ml-0" />
				</span>
			<h1 className="text-3xl font-bold">Start a new Build</h1>
			</span>
			{SParameterDefinitions?.map((parameter, index) => (
				<div key={index} className="mb-10">{getComponentForParameter(parameter)}</div>
			))}

			<div className="relative flex items-center  h-[50px]">
				<motion.button
					initial={{ opacity: 1, y: 0 }}
					animate={{ opacity: buildButtonDisabled ? 0 : 1, y: buildButtonDisabled ? -10 : 0 }}
					onClick={buildButtonClick}
					className="absolute h-[37px] text-[15px] text-white bg-[#3a5e4b] font-medium rounded-md text-comment-color px-3 active:bg-background-card-selected hover:brightness-[1.3]"
				>
					Start Build
				</motion.button>
				<motion.span
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: buildButtonDisabled ? 1 : 0, y: buildButtonDisabled ? 0 : 10 }}
					className="absolute pointer-events-none"
				>
					<span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-2 ring-inset ring-green-600/20">BUILD STARTED</span>
				</motion.span>
			</div>

		</div>
	);
};

export default BuildView;
