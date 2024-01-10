// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use window_shadows::set_shadow;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod jenkins {
    pub mod jenkins_client;
}

mod app_handle {
    pub mod jenkins_calls;
    pub mod format_console_text;
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_handle::jenkins_calls::get_project_data,
                                                 app_handle::jenkins_calls::get_build_data,
                                                 app_handle::jenkins_calls::stop_build,
                                                 app_handle::jenkins_calls::get_console_text,
                                                 app_handle::jenkins_calls::authenticate_user,
                                                 app_handle::jenkins_calls::start_build_with_parameters,
                                                 app_handle::jenkins_calls::start_build,
                                                 app_handle::jenkins_calls::get_test_result_data,
                                                 app_handle::jenkins_calls::get_jenkins_data,
                                                 app_handle::format_console_text::format_console_text,
                                                 ])
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&main_window, true).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Failed to run Tauri application.");
}
