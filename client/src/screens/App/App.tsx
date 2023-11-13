import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authDetails from "../../config/auth";
import TitleBarComponent from "../../components/TitleBar/TitleBarComponent";
import JobCardComponent from "../../components/JobCardComponent/JobCardComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import FeatureButtonComponent from "../../components/FeatureButtonComponent/FeatureButtonComponent";
import StatusView from "../Views/StatusView/StatusView";
import ConsoleView from "../Views/ConsoleView/ConsoleView";
import ProjectStatusView from "../Views/ProjectStatusView/ProjectStatusView";
import SettingsView from "../Views/SettingsView/SettingsView";
import FeatureViewHead from "../Views/FeatureViewHead";
import FeatureButtonsConfig from "../../config/FeatureButtons";
import ParametersView from "../Views/ParametersView/ParametersView";
import BuildView from "../Views/BuildView/BuildView";
import { openLink } from "../../helpers/utils";
import "./App.css";

/**
 * React functional component representing the main application.
 */
function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featureButtons, setFeatureButtons] = useState<Array<Object>>([]);
  const [activeJobBuildNumber, setActiveJobBuildNumber] = useState<number | null>(null);
  const [selectedBuildData, setSelectedBuildData] = useState<any>(null);
  const [projectData, setProjectData] = useState<any>(null);
  const [jobCardProps, setJobCardProps] = useState<Array<Object>>([]);
  const [activeFeature, setActiveFeature] = useState<string | null>("status_for_project");
  const [parameterDefinition, setParameterDefinition] = useState<any>(null);
  const storedProjectName: string = localStorage.getItem("projectName") || "";

  /**
 * Memoized function to fetch project data.
 * It fetches project data, including builds and generates JobCardProps.
 */
  const fetchProjectData = useCallback(async () => {
    try {
      const config = {
        projectName: storedProjectName,
        ...authDetails,
      };

      const response: string = await invoke("get_project_data", config);
      const jsonData = JSON.parse(response);

      setProjectData(jsonData);

      const newJobCardProps: Array<Object> = await Promise.all(
        jsonData["builds"].map(async (build: any) => {
          const details = await fetchJobCardDetails(build["number"]);
          return {
            buildNumber: build["number"],
            displayName: details["displayName"],
            description: details["description"],
            result: details["result"],
            onClick: () => handleJobCardClick(build["number"]),
            active: false,
          };
        })
      );

      setJobCardProps(newJobCardProps);
      createFeatureButtons();
    } catch (error) {
      console.error("Error invoking get_project_data:", error);
    }
  }, [storedProjectName]);

  /**
 * Memoized function to fetch build data for a specific build number.
 * @param {number} buildNumber - The build number for which to fetch data.
 * @returns {Promise<any>} - The JSON response for the specified build.
 */
  const fetchBuildData = useCallback(
    async (buildNumber: number): Promise<any> => {
      try {
        const config = {
          projectName: storedProjectName,
          buildNumber: buildNumber.toString(),
          ...authDetails,
        };
        const response: string = await invoke("get_build_data", config);
        return JSON.parse(response);
      } catch (error) {
        console.error("Error invoking get_build_data:", error);
      }
    },
    [storedProjectName]
  );

  /**
 * Memoized function to fetch details for a specific build number.
 * @param {number} buildNumber - The build number for which to fetch details.
 * @returns {Promise<any>} - The JSON response containing build details.
 */
  const fetchJobCardDetails = useCallback(async (buildNumber: number) => {
    try {
      const config = {
        projectName: storedProjectName,
        buildNumber: buildNumber.toString(),
        ...authDetails,
      };
      const response: string = await invoke("get_build_data", config);
      return JSON.parse(response);
    } catch (error) {
      console.error("Error invoking get_build_data:", error);
    }
  }, [storedProjectName]);

  /**
 * Fetches the parameter definition for the active project.
 * This is called when the component is mounted.
 */
  const fetchParameterDefinition = useCallback(async () => {
    try {
      const config = {
        projectName: storedProjectName,
        ...authDetails,
      };

      const response: string = await invoke("get_project_data", config);
      const jsonData = JSON.parse(response);

      const parameterDefinition = jsonData["property"].find(
        (element: any) => element["_class"] === "hudson.model.ParametersDefinitionProperty"
      );

      if (parameterDefinition) setParameterDefinition(parameterDefinition["parameterDefinitions"]);
    } catch (error) {
      console.error("Error invoking get_project_data:", error);
    }
  }, [storedProjectName]);

  /**
 * Updates the 'active' property in jobCardProps based on the activeJobBuildNumber.
 */
  const updateActiveJobInJobCardProps = () => {
    let updatedJobCardProps = jobCardProps.map((element: any) => ({
      ...element,
      active: element.buildNumber === activeJobBuildNumber,
    }));

    setJobCardProps(updatedJobCardProps);
  };

  /**
 * Handles the click event on a JobCard, setting the activeJobBuildNumber and fetching data for the selected build.
 * Also sets the activeFeature to "status" if it is null or "settings".
 * @param {number} buildNumber - The build number of the selected JobCard.
 */
  const handleJobCardClick = async (buildNumber: number) => {
    setActiveJobBuildNumber(buildNumber);
    const buildData = await fetchBuildData(buildNumber);
    setSelectedBuildData(buildData);
    setActiveFeature("status");
  };

  /**
 * Handles the click event on a FeatureButton, setting the activeJobBuildNumber to null if the feature is "settings".
 * @param {string} feature - The feature to set as the active feature.
 */
  const handleFeatureButtonClick = (feature: string) => {
    switch (feature) {
      case "settings":
        setActiveJobBuildNumber(null);
        break;
      case "status_for_project":
        setActiveJobBuildNumber(null);
        setSelectedBuildData(null);
        break;
      case "jenkins":
        openLink(selectedBuildData["url"]);
        break;
      default:
        break;
    }

    setActiveFeature(feature);
  };

  /**
 * Handles the change event for the search input.
 * @param {string} value - The new value of the search input.
 */
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
  };

  /**
 * Creates the FeatureButtons based on the FeatureButtonsConfig.
 * This is called when the component is mounted and when the activeJobBuildNumber is updated.
 */
  const createFeatureButtons = () => {
    const featureButtons: any = [];

    for (const key in FeatureButtonsConfig) {
      let element = FeatureButtonsConfig[key];

      if (
        !element.hidden &&
        ((element.purpose === "BOTH") ||
          (activeJobBuildNumber && element.purpose === "JOB") ||
          (!activeJobBuildNumber && element.purpose === "PROJECT"))
      ) {
        featureButtons.push({
          name: key,
        });
      }
    }

    setFeatureButtons(featureButtons);
  };

  /**
 * useEffect Hook
 * Runs once after the component is mounted to fetch data for the active project.
 */
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  /**
  * useEffect Hook
  * Runs every time a JobCard is clicked to update the active state.
  */
  useEffect(() => {
    updateActiveJobInJobCardProps();
    createFeatureButtons();
    fetchParameterDefinition();
  }, [activeJobBuildNumber]);

  /**
 * Render
 */
  return (
    <div className="h-screen flex flex-col">
      <TitleBarComponent
        activeFeature={activeFeature}
        windowTitle={
          activeJobBuildNumber && activeFeature
            ? FeatureButtonsConfig[activeFeature]["titleBar"]
            : activeFeature === "settings"
              ? "Jarvis Settings"
              : `Project Information for ${storedProjectName}`
        }
      />


      {/* Main Content Area */}
      <div className="flex flex-grow overflow-y-scroll custom-scroll ml-[1px]">
        {/* Job Cards & Search List */}
        <div className="overflow-y-scroll overflow-x-hidden big-sidebar custom-scroll grid content-start justify-items-center space-y-4 py-4 relative">
          <SearchComponent onSearchChange={handleSearchInputChange} />
          {jobCardProps.map((props, index) => (
            <JobCardComponent key={index} {...props} />
          ))}
        </div>

        {/* Feature Buttons */}
        <div className="overflow-y-scroll small-sidebar custom-scroll grid justify-items-center  py-4">
          {/* Dynamically generates Featurebuttons */}
          <div className="space-y-4 mb-4">
            {featureButtons.map((button: any, key) => (
              <FeatureButtonComponent
                key={key}
                buildNumber={activeJobBuildNumber}
                onClick={() => handleFeatureButtonClick(button["name"])}
                feature={button["name"]}
                active={activeFeature === button["name"]} />
            ))}
          </div>

          {/* Settings Button */}
          <div className="self-end">
            <FeatureButtonComponent
              buildNumber={activeJobBuildNumber}
              onClick={() => handleFeatureButtonClick("settings")}
              feature="settings"
              active={activeFeature === "settings"}
            />
          </div>
        </div>
        {/* End of Feature Buttons */}

        {/* Feature View */}
        <div className="overflow-y-scroll general-view custom-scroll">
          {activeFeature !== "settings" && activeFeature !== "status_for_project" && activeFeature !== "build" && (
            <FeatureViewHead buildData={selectedBuildData} />
          )}
          {activeFeature === "status" && <StatusView buildData={selectedBuildData} />}
          {activeFeature === "console" && <ConsoleView buildData={selectedBuildData} />}
          {activeFeature === "parameters" && <ParametersView buildData={selectedBuildData} parameterDefinition={parameterDefinition} />}
          {activeFeature === "settings" && <SettingsView buildData={selectedBuildData} />}
          {activeFeature === "status_for_project" && <ProjectStatusView buildData={projectData} />}
          {activeFeature === "build" && <BuildView buildData={selectedBuildData} parameterDefinition={parameterDefinition} />}
        </div>
        {/* End of Feature View */}

      </div>
    </div>
  );
}

// Export the component for use in other parts of the application
export default App;
