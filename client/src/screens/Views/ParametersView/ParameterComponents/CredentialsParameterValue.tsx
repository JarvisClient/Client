
import React from 'react';
import { JenkinsParameters } from '../ParametersView';
import { BsFillKeyFill } from "react-icons/bs";

interface Props {
    parameter: JenkinsParameters;
}

const CredentialsParameterValue: React.FC<Props> = ({ parameter }): JSX.Element => {
    return (
        <div className="grid items-center">
            <div className="flex items-center mr-2">
                <BsFillKeyFill size={30} />
                <div className='ml-5'>
                    <h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
                    <p className='text-md text-comment-color'>{parameter.description}</p>
                </div>
            </div>
            <div className='ml-[50px]'>
                {parameter.value && (
                    <input
                        type='input'
                        disabled
                        readOnly
                        value={String(parameter.value)}
                        className={` h-[35px] w-full bg-background-card font-medium rounded-md text-comment-color px-3 mt-2 active:bg-background-card-selected hover:brightness-[1.3]`}
                    />
                )}
            </div>
        </div>
    );
};

export default CredentialsParameterValue;
