import React, { useEffect, useState } from "react";
import { getAuthDetails } from "../../../config/auth";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";
import { invoke } from "@tauri-apps/api";
import StorageManager from "../../../helpers/StorageManager";
import IcoSearch from "../../../assets/icons/ico_search.svg";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { JenkinsInfo, JenkinsJob } from "./IJenkinsInterface";
import SwitchProjectViewLoading from "./SwitchProjectViewLoading";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import Logger from "../../../helpers/Logger";
import Modal from "./Modal";

// Define the SwitchProjectView component
const SwitchProjectView: React.FC = () => {
  // Define state variables
  const [allJobs, setAllJobs] = useState<JenkinsJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalData, setModalData] = useState<JenkinsInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const notification = useNotification();

  // Function to fetch all Jenkins projects
  const getAllProjects = async (): Promise<JenkinsJob[]> => {
    const config = { ...getAuthDetails() };
    const response: any = await invoke("get_jenkins_data", config);
    let json = JSON.parse(response);

    if (!response) {
      notification.showNotification("Error", "Something went wrong.", "jenkins");
      return [];
    }

    return json["jobs"];
  };

  // Function to fetch Jenkins jobs and update state
  const getJobs = async (): Promise<void> => {
    setLoading(true);
    const jobs = await getAllProjects();
    refreshJobs(jobs);
    setLoading(false);
  };

  // Function to fetch project data for a given name
  const getProjectData = async (name: string): Promise<JenkinsInfo> => {
    const config = {
      projectName: name,
      ...getAuthDetails(),
    };

    const response: string = await invoke("get_project_data", config);
    const jsonData = JSON.parse(response);
    return jsonData;
  };

  // Function to update the jobs and handle favorites
  const refreshJobs = (jobs: JenkinsJob[]): void => {
    const jobsInStorage = JSON.parse(StorageManager.get("projects") || "[]");

    const updatedJobs = jobs.map((job: JenkinsJob) => ({
      ...job,
      favorite: jobsInStorage.includes(job.name),
    }));

    updatedJobs.sort((a: JenkinsJob, b: JenkinsJob) => a.name.localeCompare(b.name));
    updatedJobs.sort((a: JenkinsJob, b: JenkinsJob) => (b.favorite ? 1 : a.favorite ? -1 : 0));

    setAllJobs(updatedJobs);
  };

  // Function to add or remove a project from favorites
  const addToProjects = (name: string): void => {
    let projects = JSON.parse(StorageManager.get("projects") || "[]");

    if (projects.includes(name)) {
      projects = projects.filter((project: string) => project !== name);
    } else {
      projects.push(name);
    }

    if (projects.length === 0) {
      notification.showNotification(
        "Error",
        "You need to have at least one project selected.",
        "jenkins"
      );
      return;
    }

    StorageManager.save("projects", JSON.stringify(projects));
    refreshJobs(allJobs);
  };

  // Function to select a job
  const selectJob = (name: string): void => {
    setSelectedJob(name);
    StorageManager.save("projectName", name);
    window.location.reload();
  };

  // Function to open the modal
  const openModal = async (name: any): Promise<void> => {
    try {
      // get project data
      let data = await getProjectData(name);      
      
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
  const filteredJobs = allJobs.filter((job: JenkinsJob) =>
    job.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="mx-10 my-10 select-none">
      {loading ? (
        <div>
          <SwitchProjectViewLoading />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8">Select Jenkins Job</h1>

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

            {filteredJobs.map((job: JenkinsJob) => (
              <div className="flex flex-row w-full items-center space-x-4">
                {/* Favorite */}
                <div
                  className={`cursor-pointer hover:text-jenkins-job-red transition hover:bg-background-card-selected active:scale-[0.99] px-4 py-4 rounded-md h-full`}
                  onClick={() => addToProjects(job.name)}
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
                  onClick={() => selectJob(job.name)}
                >
                  <p className="break-all">{job["name"]}</p>
                </div>

                {/* Info */}
                <div
                  className={`cursor-pointer hover:text-jenkins-job-blue transition hover:bg-background-card-selected active:scale-[0.99] px-4 py-4 rounded-md h-full`}
                  onClick={() => openModal(job["name"])}
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
    </div>
  );
};

export default SwitchProjectView;