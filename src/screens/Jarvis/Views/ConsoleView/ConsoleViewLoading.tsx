import React from "react";

const ConsoleViewLoading: React.FC = () => {
	return (
		<div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
			<div className="animate-pulse">
				<div className="w-1/2 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-1/3 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
				<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-5/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-3/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-2/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
				<div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
				<div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
			</div>
		</div>
	);
};

export default ConsoleViewLoading;
