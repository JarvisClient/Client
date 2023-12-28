import { useEffect, useState } from "react";
import SwitchProjectViewLoading from "../../screens/Jarvis/Views/SwitchProjectView/SwitchProjectViewLoading";
import { JenkinsDataJob } from "../../Interfaces/IJenkinsData";
import { useNotification } from "../NotificationManager/NotificationContext";
import { IJenkinsProject, IJenkinsProjectMultibranch } from "../../Interfaces/IProjectInterface";
import { fetchUtils } from "../../screens/Jarvis/Utils/fetchUtils";
import StorageManager from "../../helpers/StorageManager";
import Logger from "../../helpers/Logger";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import Modal from "../../screens/Jarvis/Views/SwitchProjectView/Modal";

import IcoSearch from "../../assets/icons/ico_search.svg";
import { getAllProjects } from "./ProjectSwitchUtils";

const ProjectSwitcher = () => {
    // Define state variables
    const [allJobs, setAllJobs] = useState<JenkinsDataJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [modalData, setModalData] = useState<IJenkinsProject | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const notification = useNotification();

    // Function to fetch all Jenkins projects


    // Function to fetch Jenkins jobs and update state
    const getJobs = async (): Promise<void> => {
        setLoading(true);
        const jobs = await getAllProjects();
        refreshJobs(jobs);
        setLoading(false);
    };

    // Function to update the jobs and handle favorites
    const refreshJobs = (jobs: JenkinsDataJob[]): void => {
        const jobsInStorage: JenkinsDataJob[] = JSON.parse(StorageManager.get("projects") || "[]");

        for (const [index, job] of jobs.entries()) {
            job.favorite = jobsInStorage.some((item: JenkinsDataJob) => item.url === job.url);
        }

        const updatedJobs = [...jobs];

        updatedJobs.sort((a: JenkinsDataJob, b: JenkinsDataJob) => a.name.localeCompare(b.name));
        updatedJobs.sort((a: JenkinsDataJob, b: JenkinsDataJob) => (b.favorite ? 1 : a.favorite ? -1 : 0));

        setAllJobs(updatedJobs);
    };

    // Function to add or remove a project from favorites
    const addToProjects = (project: JenkinsDataJob): void => {
        let projects: JenkinsDataJob[] = JSON.parse(StorageManager.get("projects") || "[]");
        const index = projects.findIndex((item: JenkinsDataJob) => item.url === project.url);
        if (index !== -1) {
            // Remove from favorites
            projects.splice(index, 1);
        } else {
            // Add to favorites
            projects.push(project);
        }

        if (projects.length === 0) {
            notification.showNotification(
                "Error",
                "You need to have at least one project selected.",
                "jenkins",
            );
            return;
        }

        StorageManager.save("projects", JSON.stringify(projects));
        refreshJobs(allJobs);
    };

    // Function to select a job
    const selectJob = async (job: JenkinsDataJob): Promise<void> => {
        let baseUrl = await StorageManager.get("baseurl") || "";
        setSelectedJob(job.name);
        StorageManager.save("projectName", job.url.replace(baseUrl + "job/", ""));
        window.location.reload();
    };

    // Function to open the modal
    const openModal = async (name: string): Promise<void> => {
        try {
            // get project data
            const data = await fetchUtils.fetchProjectData(name);

            setModalData(data);
            setIsModalOpen(true); // Open the modal
        } catch (error) {
            Logger.error(error);
            notification.showNotification("Error", "Something went wrong.", "jenkins");
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // useEffect to fetch jobs and selected job on component mount
    useEffect(() => {
        getJobs();
        setSelectedJob(StorageManager.get("projectName") || "");
    }, []);

    // Filter jobs based on search input
    const filteredJobs = allJobs.filter((job: JenkinsDataJob) => job.name.toLowerCase().includes(searchInput.toLowerCase()));

    return (
        <>
            {loading ? (
                <div>
                    <SwitchProjectViewLoading />
                </div>
            ) : (
                <div>

                    <div className="bg-background-sidebar px-6 py-5 rounded-lg space-y-2">
                        <div className="relative select-none mb-4">
                            <input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text"
                                placeholder="Search ..."
                                className="w-[310px] h-[37px] text-[15px] bg-transparent font-medium w-full border-border rounded-md placeholder-comment-color text-comment-color pr-10 pl-10"
                            />
                            <img
                                src={IcoSearch}
                                alt="Search"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 ml-1"
                            />
                        </div>

                        {filteredJobs.map((job: JenkinsDataJob, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-full items-center space-x-4">
                                {/* Favorite */}
                                <div
                                    className="cursor-pointer hover:text-jenkins-job-red transition hover:bg-background-card-selected active:scale-[0.99] px-4 py-4 rounded-md h-full"
                                    onClick={() => addToProjects(job)}
                                >
                                    {job.favorite ? (
                                        <MdFavorite size={30} className="text-jenkins-job-red" />
                                    ) : (
                                        <MdFavoriteBorder size={30} />
                                    )}
                                </div>

                                {/* Text */}
                                <div
                                    className={`transition hover:bg-background-card-selected active:scale-[0.99] px-4 py-4 rounded-md ${selectedJob === job.name ? "bg-background-card-selected" : ""} w-full`}
                                    onClick={() => selectJob(job)}
                                >
                                    <p className="break-all">{job.name}</p>
                                </div>

                                {/* Info */}
                                <div
                                    className="cursor-pointer hover:text-jenkins-job-blue transition hover:bg-background-card-selected active:scale-[0.99] px-4 py-4 rounded-md h-full"
                                    onClick={() => openModal(job.name)}
                                >
                                    <IoInformationCircleOutline size={30} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Modal isOpen={isModalOpen} closeModal={closeModal} modalData={modalData} />
                    {/* End Help Modal */}
                </div>
            )}
        </>
    )
};

export default ProjectSwitcher;