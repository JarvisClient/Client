// React Imports
import React, { useEffect, useState } from "react";
import BoolenParameterDefinition from "./ParameterComponents/BoolenParameterDefinition";
import StringParameterDefinition from "./ParameterComponents/StringParameterDefinition";
import TextParameterDefinition from "./ParameterComponents/TextParameterDefinition";

import { CircularProgress } from "@nextui-org/react";
import authDetails from "../../../config/auth";

import { invoke } from "@tauri-apps/api";
import OtherParameterDefinition from "./ParameterComponents/OtherParameterDefinition";
import ChoiceParameterDefinition from "./ParameterComponents/ChoiceParameterDefinition";

interface BuildViewProps {
    parameterDefinition: any[];
}

export interface JenkinsParameters {
    defaultParameterValue: {
        _class: string;
        value: string | boolean | number | null;
    },
    choices: string[];
    description: string;
    name: string;
    type: string;
    _class: string;
}

const BuildView: React.FC<BuildViewProps> = ({ parameterDefinition }) => {
    const [parameterValues, setParameterValues] = useState<{ [key: string]: string | boolean | number | null }>({});
    const [showBanner, setShowBanner] = useState(false);
    let projectName = localStorage.getItem("projectName");

    const buildButtonClick = async () => {
        const config = {
            ...authDetails,
            projectName: projectName,
            params: parameterValues
        };

        
        try {
            if (parameterDefinition) {
                console.log("Made request to start build with parameters: ", parameterValues);
                await invoke("start_build_with_parameters", config);
            } else {
                console.log("Made request to start build without parameters");
                await invoke("start_build", config);
            }

            setShowBanner(true);
            setTimeout(() => {
                setShowBanner(false);
            }, 5000);
        } catch (error) {
            console.error(error);

            alert("An error occured while starting the build!\n" + error);
        }


    }

    const getComponentForParameter = (parameter: JenkinsParameters): JSX.Element => {
        switch (parameter._class) {
            case "hudson.model.BooleanParameterDefinition":
                return <BoolenParameterDefinition
                    parameters={parameter}
                    value={parameterValues[parameter.name] || "false"}
                    onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
                />

            case "hudson.model.StringParameterDefinition":
            case "org.jvnet.jenkins.plugins.nodelabelparameter.NodeParameterDefinition":
                return <StringParameterDefinition
                    parameters={parameter}
                    value={parameterValues[parameter.name] || ""}
                    onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
                />

            case "hudson.model.TextParameterDefinition":
                return <TextParameterDefinition
                    parameters={parameter}
                    value={parameterValues[parameter.name] || ""}
                    onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
                />

            case "hudson.model.ChoiceParameterDefinition":
            case "jp.ikedam.jenkins.plugins.extensible_choice_parameter.ExtensibleChoiceParameterDefinition":
                return <ChoiceParameterDefinition
                    parameters={parameter}
                    value={parameterValues[parameter.name] || ""}
                    onChange={(value) => setParameterValues((prev) => ({ ...prev, [parameter.name]: value }))}
                />

            default:
                return <OtherParameterDefinition parameter={parameter} />
        }
    }


    return (
        <div className="mx-10 my-10 select-none">

            {showBanner && (
                <div className="flex mb-5 items-center w-full p-4 bg-[#2D483A] rounded-lg shadow">
                    <div className="ms-3 text-md font-normal"><b>Build started!</b> It might take some time until it shows up here.</div>
                </div>

            )}

            <h1 className="text-3xl font-bold mb-[40px]">Start a new Build</h1>
            {parameterDefinition?.map((parameter, index) => (
                <div key={index} className="mb-10">{getComponentForParameter(parameter)}</div>
            ))}

            <button
                onClick={buildButtonClick}
                className={`w-[80px] h-[37px] text-[15px] text-white bg-[#3a5e4b] font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-background-card-selected hover:brightness-[1.3]`}>
                Build
            </button>
        </div>
    )
}

export default BuildView