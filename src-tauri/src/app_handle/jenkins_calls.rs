// AppHandle/jenkins_calls.rs

use crate::jenkins::jenkins_client::JenkinsClient;
use std::collections::HashMap;

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
pub async fn get_test_result_data(baseurl: String, username: String, apitoken: String, project_name: String, build_number: &str) -> Result<String, String> {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.get_test_result_data(&project_name, build_number).await {
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
            } else if err.to_string().contains("404 Not Found") {
                println!("404 Not Found");
                Ok(false)
            } else {
                Err(err.to_string())
            }
        }
    }
}

#[tauri::command]
pub async fn start_build_with_parameters(baseurl: String, username: String, apitoken: String, project_name: String, params: HashMap<String, String>) -> Result<String, String>  {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.start_build_with_parameters(&project_name, params).await {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub async fn start_build(baseurl: String, username: String, apitoken: String, project_name: String, params: HashMap<String, String>) -> Result<String, String>  {
    let jenkins_client = JenkinsClient::new(&baseurl, &username, &apitoken);
    match jenkins_client.start_build(&project_name, params).await {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string()),
    }
}