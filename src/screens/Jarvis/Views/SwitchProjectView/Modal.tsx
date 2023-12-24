import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BiInfoCircle } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IJenkinsProject } from "../../../../Interfaces/IProjectInterface";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    modalData: IJenkinsProject | undefined;
}

const Modal: React.FC<Props> = ({ isOpen, closeModal, modalData }) => (isOpen ? (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.1 }}
		exit={{ opacity: 0 }}
		className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-black/70 transition flex justify-center items-center"
		onClick={() => closeModal()}
	>
		<div
			className="bg-background-sidebar p-14 w-[850px] h-[600px] rounded-md relative overflow-y-scroll overflow-x-hidden custom-scroll scrollbar-hidden"
			onClick={(e) => e.stopPropagation()}
		>
			<div
				onClick={() => closeModal()}
				className="absolute top-4 right-4 cursor-pointer"
			>
				<IoClose
					size={32}
					className="transition hover:brightness-75 hover:scale-105 active:brightness-105 active:scale-95"
				/>
			</div>
			<div className="flex flex-row mb-4">
				<div className="flex-shrink-0 mr-3 ">
					<span className="relative flex h-[37px] w-[37px]">
						{modalData?.color.includes("_anime") ? (
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75" />
						) : null}
						<span className={`relative inline-flex rounded-full h-full w-full bg-jenkins-job-${modalData?.color == "notbuilt" ? "gray" : modalData?.color}`} />
					</span>
				</div>
				<div className="flex flex-col justify-center">
					{/* Two rows for Title and Comment */}
					<div className="text-3xl text-text-color font-bold overflow-hidden">
						<p className="break-all line-clamp-2">{modalData?.displayName}</p>
					</div>
				</div>
			</div>
			<hr className="border-border border-2 w-1/3" />
			{/* Information */}
			<div className="grid grid-cols-[100px,auto] mt-8 ">
				<div className="w-16 flex justify-self-center">
					<BiInfoCircle size={50} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1">Information</h1>
					<div className="ml-4">
						<p>
							<b>Last Build: </b>
							{" "}
							{modalData?.lastBuild ? (
								<a href={modalData?.lastBuild.url}>
    #
									{modalData?.lastBuild.number}
								</a>
							) : "None"}
						</p>
						<p>
							<b>Last Successful Build: </b>
							{" "}
							{modalData?.lastSuccessfulBuild ? (
								<a href={modalData?.lastSuccessfulBuild.url}>
    #
									{modalData?.lastSuccessfulBuild.number}
								</a>
							) : "None"}
						</p>
						<p>
							<b>Last Failed Build: </b>
							{" "}
							{modalData?.lastFailedBuild ? (
								<a href={modalData?.lastFailedBuild.url}>
    #
									{modalData?.lastFailedBuild.number}
								</a>
							) : "None"}
						</p>

					</div>
				</div>
			</div>
			{/* Health Report */}
			{modalData?.healthReport.length !== 0 ? (
				<div className="grid grid-cols-[100px,auto] mt-8 ">
					<div className="w-16 flex justify-self-center">
						<IoMdHeartEmpty size={50} />
					</div>

					<div className="flex flex-col pt-2">
						<h1 className="text-2xl font-bold mb-1">Health Report</h1>
						<div className="ml-4">
							<p>
								<b>Build stability: </b>
								{modalData?.healthReport[0].description.split(": ")[1]}
							</p>
							<p>
								<b>Score: </b>
								{modalData?.healthReport[0].score}
  %
							</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	</motion.div>
) : null);

export default Modal;
