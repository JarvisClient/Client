import React from "react";

const LoadingScreenComponent: React.FC = () => {

	return (
		<div className="h-full flex flex-col animate-pulse space-y-4">
			<div className="space-y-2">
				<div className="w-2/5 h-4 bg-comment-color rounded-full opacity-40"></div>
				<div className="w-1/5 h-4 bg-comment-color rounded-full opacity-40"></div>
			</div>
			<div className="w-full h-32 bg-comment-color opacity-40 rounded-xl"></div>
			<div className="w-1/2 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/3 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/3 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/3 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/4 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/4 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/3 h-4 bg-comment-color rounded-full opacity-40"></div>
			<div className="w-1/2 h-4 bg-comment-color rounded-full opacity-40"></div>

			<div className="space-y-2">
				<div className="w-3/5 h-4 bg-comment-color rounded-full opacity-40"></div>
				<div className="w-2/5 h-4 bg-comment-color rounded-full opacity-40"></div>
			</div>
			<div className="w-[50%] h-16 bg-comment-color opacity-40 rounded-xl"></div>
		</div>
	);
};

export default LoadingScreenComponent;
