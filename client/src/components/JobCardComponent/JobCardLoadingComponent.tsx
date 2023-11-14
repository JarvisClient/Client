import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import circleColor from "../../config/getCircleColor";
import authdetails from "../../config/auth";

const JobCardLoadingComponent: React.FC<any> = () => {

  return (
    <div
      className="flex items-center w-[310px] h-[80px] animate-pulse rounded-lg p-5 border-0 border-border transition select-none overflow-hidden bg-background-card">
      <div className="flex-shrink-0 mr-3">
        {/* Small circle */}
        <span className="relative flex h-5 w-5">
          <span className="relative inline-flex rounded-full h-5 w-5 bg-comment-color opacity-40"></span>
        </span>
      </div>
      <div className="flex flex-col justify-center">
        {/* Two rows for Title and Comment */}
        <div className="text-sm w-1/2 text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-40">
          Descriptionasd
        </div>
        <div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20">
          Descriptionasdsadasdasad
        </div>
      </div>
    </div>
  );
};

export default JobCardLoadingComponent;
