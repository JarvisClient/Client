
// hello world function
#[tauri::command]
pub fn format_console_text() -> String {
    "Hello World from Rust!".to_string()
}