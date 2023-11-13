import React, { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import Switch from "../../Switch/Switch";


const SettingsView: React.FC<any> = () => {

    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);

    const [baseurl, setBaseurl] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [apiToken, setApiToken] = useState<string>("");

    const [draftNewProject, setDraftNewProject] = useState<string>("");
    const [currentProject, setCurrentProject] = useState<string>("");
    const [projects, setProjects] = useState<string[]>([]);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        localStorage.setItem("openInBrowser", (!isChecked).toString());
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        checkIfAlreadyAuthenticated();
        setProjects(JSON.parse(localStorage.getItem("projects") || "[]"));
        setCurrentProject(localStorage.getItem("projectName") || "");
        setIsChecked(JSON.parse(localStorage.getItem("openInBrowser") || "false"));
    }, []);

    useEffect(() => {
    }, [projects]);

    const checkIfAlreadyAuthenticated = async () => {
        const baseurl = localStorage.getItem("baseurl");
        const username = localStorage.getItem("username");
        const apiToken = localStorage.getItem("apiToken");

        if (baseurl && username && apiToken) {
            setBaseurl(baseurl);
            setUsername(username);
            setApiToken(apiToken);

            const response: Boolean = await invoke("authenticate_user", {
                baseurl: baseurl,
                username: username,
                apitoken: apiToken
            });

            setAuthenticated(response);
        }
    }

    const checkAuthentication = async () => {
        try {
            if (!baseurl || !username || !apiToken) return alert("Please fill in all fields!");
            new URL(baseurl);

            const response: Boolean = await invoke("authenticate_user", {
                baseurl: baseurl,
                username: username,
                apitoken: apiToken
            });

            setAuthenticated(response);

            if (response) {
                alert("Successfully authenticated!");
                window.location.reload();
            } else {
                alert("Authentication failed! Incorrect Username or API Token?");
            }

            localStorage.setItem("baseurl", baseurl);
            localStorage.setItem("username", username);
            localStorage.setItem("apiToken", apiToken);

            return response;
        } catch (error) {
            alert("Authentication failed!\n" + error);
        }
    };

    const addNewProject = async () => {
        let currentProjectsInStorage: String[] = JSON.parse(localStorage.getItem("projects") || "[]");

        // check if project already exists
        if (currentProjectsInStorage.includes(draftNewProject)) return alert("Project already exists!");

        // add new project to storage
        currentProjectsInStorage.push(draftNewProject);

        // save new projects to storage
        localStorage.setItem("projects", JSON.stringify(currentProjectsInStorage));

        // update state
        setProjects(JSON.parse(localStorage.getItem("projects") || "[]"));
    };

    const deleteCurrentProject = async () => {

        let currentProject = localStorage.getItem("projectName");
        let currentProjectsInStorage: string[] = JSON.parse(localStorage.getItem("projects") || "[]");

        currentProjectsInStorage = currentProjectsInStorage.filter(project => project !== currentProject);

        // save new projects to storage
        localStorage.setItem("projects", JSON.stringify(currentProjectsInStorage));

        // update state
        setProjects(JSON.parse(localStorage.getItem("projects") || "[]"));

        // if there are still projects left, select the first one else set project to null
        if (currentProjectsInStorage.length > 0) {
            localStorage.setItem("projectName", currentProjectsInStorage[0]);
        } else {
            localStorage.setItem("projectName", "");
        }

        window.location.reload();
    };

    const selectProject = async (project: string) => {
        localStorage.setItem("projectName", project);
        window.location.reload();
    }


    return (
        <div className="mx-10 my-10 select-none">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="flex items-center mt-10">
                <h2 className="text-2xl font-bold">Authentication</h2>
                {authenticated ?
                    <span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-600/20">Authenticated</span>
                    :
                    <span className="inline-flex items-center rounded-md bg-[#28222f] px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-600/20">Not Authenticated</span>
                }
            </div>

            <div>
                <input
                    type="url"
                    value={baseurl}
                    onChange={(e) => setBaseurl(e.target.value)}
                    placeholder="Base URL"
                    className="w-[200px] h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
                />

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Jenkins Username"
                    className="w-[200px] h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
                />

                <input
                    type="password"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="Jenkins (Personal) API Token"
                    className="w-[310px] h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
                />

                <button
                    onClick={checkAuthentication}
                    className={`w-[80px] h-[37px] text-[15px] text-white bg-background-card font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-background-card-selected hover:brightness-[1.3]`}>
                    Save
                </button>
            </div>
            <div className="flex items-center mt-10">
                <h2 className="text-2xl font-bold">Projects / Jenkins Builds</h2>
            </div>
            <div>
                <div className="mt-5">
                    <div className="bg-console-background px-5 py-3 rounded-md space-y-2">

                        {projects.map((project, index) => (
                            <div className="flex space-x-5">
                                <p className={`hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer  ${project === currentProject ? 'bg-background-card-selected' : ''}`} onClick={() => selectProject(project)}>{project}</p>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={draftNewProject}
                        onChange={(e) => setDraftNewProject(e.target.value)}
                        placeholder="Add new project (e.g. 'CI-CD Pipeline')"
                        className="w-[310px] h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
                    />


                    <button
                        onClick={addNewProject}
                        className={`w-[80px] h-[37px] text-[15px] text-white bg-background-card font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-background-card-selected hover:brightness-[1.3]`}>
                        Save
                    </button>
                    <button
                        onClick={deleteCurrentProject}
                        className={`w-[200px] h-[37px] text-[15px] text-white font-medium rounded-md px-3 mt-5 mr-3 text-white bg-red-600 hover:brightness-[0.9] active:brightness-[0.7]`}>
                        Delete current Project
                    </button>
                </div>
            </div>
      <div className="flex flex-col mt-10">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <div>
          <p className="mb-2">Open all Links in Browser</p>
          <Switch isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  );
};

export default SettingsView;