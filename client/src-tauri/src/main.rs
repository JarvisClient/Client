// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod jenkins {
    pub mod jenkins_client;
}

mod AppHandle {
    pub mod jenkins_calls;
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![AppHandle::jenkins_calls::get_project_data,
                                                 AppHandle::jenkins_calls::get_build_data,
                                                 AppHandle::jenkins_calls::get_console_text,
                                                 AppHandle::jenkins_calls::authenticate_user,
                                                 AppHandle::jenkins_calls::start_build_with_parameters,
                                                 AppHandle::jenkins_calls::start_build
                                                 ])
        .run(tauri::generate_context!())
        .expect("Failed to run Tauri application.");
}
