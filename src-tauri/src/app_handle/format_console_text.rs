use std::collections::HashMap;
use regex::Regex;

#[tauri::command]
pub fn format_console_text(
    console_text: Vec<String>,
    chunk_size: usize,
    style_dict: HashMap<String, Vec<String>>,
) -> String {
    // Define a regex pattern to find URLs
    let url_pattern = Regex::new(r"https?://\S+").unwrap();

    // Split the console text into chunks of size chunk_size and format each chunk.
    let mut chunks: Vec<String> = Vec::new();
    let mut chunk: String = String::new();

    for line in console_text {
        if chunk.len() + line.len() > chunk_size {
            chunks.push(format_chunk(&chunk, &style_dict, &url_pattern));
            chunk.clear();
        }
        chunk.push_str(&line);
        chunk.push('\n');
    }

    if !chunk.is_empty() {
        chunks.push(format_chunk(&chunk, &style_dict, &url_pattern));
    }

    chunks.join("\n")
}

// If the chunk contains a URL, wrap it in HTML <a> tags with href.
fn format_chunk(
    chunk: &str,
    style_dict: &HashMap<String, Vec<String>>,
    url_pattern: &Regex,
) -> String {
    // Function to replace URLs with HTML <a> tags
    fn replace_url_with_link(captures: &regex::Captures) -> String {
        let url = captures.get(0).unwrap().as_str();
        format!("<a href=\"{}\">{}</a>", url, url)
    }

    let mut formatted_chunk = chunk.to_owned();

    // Replace URLs with HTML <a> tags
    formatted_chunk = url_pattern
        .replace_all(&formatted_chunk, replace_url_with_link)
        .to_string();

    // Apply any additional formatting based on the style_dict if needed
    // You can iterate through the style_dict and apply formatting rules here.

    formatted_chunk
}
