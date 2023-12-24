import React from "react";

const SwitchProjectViewLoading: React.FC = () => (
	<div className="animate-pulse">
		<h1 className="text-3xl font-bold mb-8">Switch Projects</h1>

		<div className="bg-background-sidebar px-6 py-5 rounded-lg space-y-2">
			<div className="relative select-none" />

			<div className="grid grid-cols-[50px,auto] transition   px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
					<div className="w-[50%] text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
			<div className="grid grid-cols-[50px,auto] transition  px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
					<div className="w-[50%] text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
			<div className="grid grid-cols-[50px,auto] transition   px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
					<div className="w-[20%] text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
			<div className="grid grid-cols-[50px,auto] transition   px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color w-[60%]  overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
			<div className="grid grid-cols-[50px,auto] transition   px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
					<div className="w-[80%] text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
			<div className="grid grid-cols-[50px,auto] transition   px-4 py-4 rounded-md">
				<div className="cursor-pointer transition">
					<div className="bg-comment-color opacity-20 w-[30px] h-[30px] rounded-full" />
				</div>
				<div>
					<div className="text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
					<div className="w-[50%] text-sm text-comment-color overflow-hidden h-2 mt-2 bg-comment-color rounded-full opacity-20" />
				</div>
			</div>
		</div>
	</div>
);

export default SwitchProjectViewLoading;
