
import React from 'react';
import { JenkinsParameters } from '../ParametersView';
import { BiTestTube } from "react-icons/bi";

interface Props {
    parameter: JenkinsParameters;
}

const RunParameterValue: React.FC<Props> = ({ parameter }): JSX.Element => {

    const openTest = () => {
        let baseurl = localStorage.getItem("baseurl");

        let url = `${baseurl}job/${parameter.jobName}/${parameter.number}`;

        window.open(url, "_blank")
    }

    return (
        <div className="grid items-center">
            <div className="flex items-center mr-2">
                <BiTestTube size={30} />
                <div className='ml-5'>
                    <h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
                    <p className='text-md text-comment-color'>{parameter.description}</p>
                </div>
            </div>
            <div className='ml-[50px]'>
                <button
                    onClick={openTest}
                    className={`w-[100px] h-[37px] text-[15px] text-white bg-property-background font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-property-background-selected hover:brightness-[1.3]`}>
                    {parameter.jobName} #{parameter.number}
                </button>
            </div>
        </div>
    );
};

export default RunParameterValue;
