// Tech. Imports
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authDetails from "../../config/auth";

// Components 
import TitleBarComponent from "../../components/TitleBar/TitleBarComponent";
import JobCardComponent from "../../components/JobCardComponent/JobCardComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import FeatureButtonComponent from "../../components/FeatureButtonComponent/FeatureButtonComponent";

// Views
import StatusView from "../../components/FeatureView/StatusView/StatusView";
import ConsoleView from "../../components/FeatureView/ConsoleView/ConsoleView";
import ProjectStatusView from "../../components/FeatureView/ProjectStatusView/ProjectStatusView";
import SettingsView from "../../components/FeatureView/SettingsView/SettingsView";
import FeatureViewHead from "../../components/FeatureView/FeatureViewHead";

// Constants
import FeatureButtonsConfig from "../../config/FeatureButtons";
import "./App.css";
import ParametersView from "../../components/FeatureView/ParametersView/ParametersView";
import BuildView from "../../components/FeatureView/BuildView/BuildView";
import { openLink } from "../../helpers/utils";

/**
 * React functional component representing the main application.
 */
function App() {
  // State variables
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featureButtons, setFeatureButtons] = useState<Array<Object>>([]);
  const [activeJobBuildNumber, setActiveJobBuildNumber] = useState<number | null>(null);
  const [selectedBuildData, setSelectedBuildData] = useState<any>(null);
  const [projectData, setProjectData] = useState<any>(null);
  const [jobCardProps, setJobCardProps] = useState<Array<Object>>([]);
  const [activeFeature, setActiveFeature] = useState<string | null>("status_for_project");
  const [parameterDefinition, setParameterDefinition] = useState<any>(null);

  /**
   * Constants and Variables
   */
  const storedProjectName: string = localStorage.getItem("projectName") || "";

  /**
   * useEffect Hook
   * Runs once after the component is mounted to fetch data for the active project.
   */
  useEffect(() => {
    fetchDataForActiveProject();
    createFeatureButtons();
  }, []);

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
    const buildData = await fetchDataForBuild(buildNumber);
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
        openLink(selectedBuildData["url"])
        break;
      default:
        break;
    }

    setActiveFeature(feature);
  };

  /**
   * Fetches data from the Rust Backend for the active project, including build numbers and generates JobCardProps.
   * This is called when the component is mounted.
   */
  const fetchDataForActiveProject = async () => {
    try {
      const config = {
        projectName: storedProjectName,
        ...authDetails,
      };

      const response: string = await invoke("get_project_data", config);
      const jsonData = JSON.parse(response);
      setProjectData(jsonData);

      // Get the parameter definition

      const newJobCardProps: Array<Object> = jsonData["builds"].map((build: any) => ({
        buildNumber: build["number"],
        onClick: () => handleJobCardClick(build["number"]),
        active: false,
      }));

      setJobCardProps(newJobCardProps);
    } catch (error) {
      console.error("Error invoking get_project_data:", error);
    }
  };

  const fetchParameterDefinition = async () => {
    try {
      const config = {
        projectName: storedProjectName,
        ...authDetails,
      };

      const response: string = await invoke("get_project_data", config);
      const jsonData = JSON.parse(response);

      const parameterDefinition = jsonData["property"].find((element: any) => element["_class"] === "hudson.model.ParametersDefinitionProperty");

      if (parameterDefinition) setParameterDefinition(parameterDefinition["parameterDefinitions"]);
    }
    catch (error) {
      console.error("Error invoking get_project_data:", error);
    }
  }


  /**
   * Fetches data from the Rust Backend for a specific build.
   * This is called when a JobCard is clicked, and the JSON response is passed to the FeatureView Components.
   * @param {number} buildNumber - The build number for which to fetch data.
   * @returns {Promise<any>} - The JSON response for the specified build.
   */
  const fetchDataForBuild = async (buildNumber: number): Promise<any> => {
    try {
      const config = {
        projectName: storedProjectName,
        buildNumber: buildNumber.toString(),
        ...authDetails,
      };
      const response: string = await invoke("get_build_data", config);
      const jsonData = JSON.parse(response);

      return jsonData;
    } catch (error) {
      console.error("Error invoking get_build_data:", error);
    }
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
   * @returns {void}
   */
  const createFeatureButtons = () => {
    const featureButtons: any = [];
  
    for (const key in FeatureButtonsConfig) {
      let element = FeatureButtonsConfig[key];
  
      // Check if the element should be included based on the conditions
      if (
        (!element.hidden) && // Check if "hidden" is not true
        (
          (element.purpose === "BOTH") ||
          (activeJobBuildNumber && element.purpose === "JOB") ||
          (!activeJobBuildNumber && element.purpose === "PROJECT")
        )
      ) {
        featureButtons.push({
          name: key,
        });
      }
    }
  
    setFeatureButtons(featureButtons);
  };
  
  



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
            <JobCardComponent buildNumber={0} key={index} {...props} />
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
