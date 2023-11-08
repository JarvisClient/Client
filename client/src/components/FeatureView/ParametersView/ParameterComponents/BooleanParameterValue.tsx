import React from 'react';
import { JenkinsParameters } from '../ParametersView';
import { RxSwitch } from "react-icons/rx";

interface Props {
    parameter: JenkinsParameters;
}

const BooleanParameterValue: React.FC<Props> = ({ parameter }): JSX.Element => {
    return (
        <div className="grid items-center">
            <div className="flex items-center mr-2">
                <RxSwitch size={30} />
                <div className='ml-5'>
                    <h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
                    <p className='text-md text-comment-color'>{parameter.description}</p>
                </div>
            </div>
            <div className='ml-[50px]'>
                <input
                    type='text'
                    disabled
                    readOnly
                    value={parameter.value ? '✔' : ''}
                    className={`w-[30px] h-[30px] bg-background-card font-medium rounded-md text-comment-color px-2 mt-2 active:bg-background-card-selected hover:brightness-[1.3]`}
                />

            </div>
        </div>
    );
};

export default BooleanParameterValue;
