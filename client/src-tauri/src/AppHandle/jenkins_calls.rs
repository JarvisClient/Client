// AppHandle/jenkins_calls.rs

use crate::jenkins::jenkins_client::JenkinsClient;
use tauri::AppHandle;

#[tauri::command]
pub async fn get_project_data(baseurl: String, username: String, apitoken: String, project_name: String) -> Result<String, String> {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.get_project_data(&project_name).await {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub async fn get_build_data(baseurl: String, username: String, apitoken: String, project_name: String, build_number: &str) -> Result<String, String> {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.get_build_data(&project_name, build_number).await {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string()),
    }
}


#[tauri::command]
pub async fn get_console_text(baseurl: String, username: String, apitoken: String, project_name: String, build_number: &str) -> Result<String, String> {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.get_console_text(&project_name, build_number).await {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub async fn authenticate_user(baseurl: String, username: String, apitoken: String) -> Result<bool, String> {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.check_authentication().await {
        Ok(_) => Ok(true),
        Err(err) => {
            // Check if the error is due to unauthorized access
            if err.to_string().contains("401 Unauthorized") {
                Ok(false)
            } else {
                Err(err.to_string())
            }
        }
    }
}