import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

interface ProjectStatusViewProps {
  buildData: any;
}

const ProjectStatusView: React.FC<ProjectStatusViewProps> = ({ buildData }) => {
  useEffect(() => {
    // Any side effects you want to handle on component mount
  }, []);

  const renderHTML = (html: string) => {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  };

  return (
    <>
      {buildData ? (
        <div className="mx-10 my-10">
          <div
            className={`flex items-center rounded-lg p-5 mb-10 transition select-none overflow-hidden`}
          >
            <div className="flex flex-col justify-center">
              {/* Two rows for Title and Comment */}
              <div className="text-xl text-text-color font-bold overflow-hidden">
                Project {buildData["fullDisplayName"]}
              </div>
              <div
                className="text-md text-comment-color overflow-hidden line-clamp-2"
                dangerouslySetInnerHTML={renderHTML(buildData["description"])}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectStatusView;