import React, { useEffect, useState } from 'react';
import { BiText } from 'react-icons/bi';

import { JenkinsParameters } from '../BuildView';

interface Props {
  parameters: JenkinsParameters;
  value: string | boolean | number | null | any;
  onChange: (value: string) => void;
}

const TextParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): JSX.Element => {
  useEffect(() => {
    onChange(parameters.defaultParameterValue.value as string);
  }, [parameters.defaultParameterValue.value]);

  return (
    <div className="grid items-center">
      <div className="flex items-center mr-2">
        <BiText size={30} />
        <div className="ml-5">
          <h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
          <p className="text-md text-comment-color">{parameters.description}</p>
        </div>
      </div>
      <div className="ml-[50px]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[100px] w-full bg-property-background font-medium rounded-md text-comment-color py-[6px] px-3 mt-2 active:bg-property-background-selected hover:brightness-[1.3]`}
        />
      </div>
    </div>
  );
};

export default TextParameterDefinition;
