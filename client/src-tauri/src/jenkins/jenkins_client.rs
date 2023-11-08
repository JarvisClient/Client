use reqwest;
use base64::{encode, decode};

pub struct JenkinsClient {
    base_url: String,
    jenkins_username: String,
    jenkins_api_token: String,
}

impl JenkinsClient {
    pub fn new(base_url: &str, jenkins_username: &str, jenkins_api_token: &str) -> Self {
        Self {
            base_url: base_url.to_string(),
            jenkins_username: jenkins_username.to_string(),
            jenkins_api_token: jenkins_api_token.to_string(),
        }
    }

    pub async fn get_project_data(&self, job_name: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}/job/{}/api/json", self.base_url, job_name);
    
        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .header("Authorization", format!("Basic {}", base64::encode(&format!("{}:{}", self.jenkins_username, self.jenkins_api_token))))
            .send()
            .await?;

        if !response.status().is_success() {
            panic!("Error getting job data: {}", response.status());
        }

        response.text().await
    }

    pub async fn get_build_data(&self, job_name: &str, build_number: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}/job/{}/{}/api/json", self.base_url, job_name, build_number);    
        
        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .header("Authorization", format!("Basic {}", base64::encode(&format!("{}:{}", self.jenkins_username, self.jenkins_api_token))))
            .send()
            .await?;

        if !response.status().is_success() {
            panic!("Error getting job data: {}", response.status());
        }

        response.text().await
    }

    pub async fn get_console_text(&self, job_name: &str, build_number: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}/job/{}/{}/consoleText", self.base_url, job_name, build_number);
        
        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .header("Authorization", format!("Basic {}", base64::encode(&format!("{}:{}", self.jenkins_username, self.jenkins_api_token))))
            .send()
            .await?;

        if !response.status().is_success() {
            panic!("Error getting job data: {}", response.status());
        }

        response.text().await
    }

pub async fn check_authentication(&self) -> Result<String, String> {
    let url = format!("{}/api/json", self.base_url);

    let client = reqwest::Client::new();
    let response = match client
        .get(&url)
        .header("Authorization", format!("Basic {}", base64::encode(&format!("{}:{}", self.jenkins_username, self.jenkins_api_token))))
        .send()
        .await
    {
        Ok(response) => response,
        Err(err) => return Err(err.to_string()), // Propagate the reqwest::Error as a String
    };

    if !response.status().is_success() {
        return Err(format!("Error getting job data: {}", response.status()));
    }

    response.text().await.map_err(|err| err.to_string())
}
}
