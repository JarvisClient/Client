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
        if chunk.len() >= chunk_size {
            if let Ok(formatted_chunk) = format_chunk(&chunk, &style_dict, &url_pattern) {
                chunks.push(formatted_chunk);
            } else {
                chunks.push(chunk.clone()); // Use unformatted chunk if formatting fails
            }
            chunk = String::new();
        }

        if !chunk.is_empty() {
            chunk.push('\n');
        }
        
        chunk.push_str(&line);
    }

    if !chunk.is_empty() {
        if let Ok(formatted_chunk) = format_chunk(&chunk, &style_dict, &url_pattern) {
            chunks.push(formatted_chunk);
        } else {
            chunks.push(chunk.clone()); // Use unformatted chunk if formatting fails
        }
    }

    chunks.join("\n")
}

// If the chunk contains a URL, wrap it in HTML <a> tags with href.
fn format_chunk(
    chunk: &str,
    style_dict: &HashMap<String, Vec<String>>,
    url_pattern: &Regex,
) -> Result<String, regex::Error> {
    // Function to replace URLs with HTML <a> tags
    fn replace_url_with_link(captures: &regex::Captures) -> String {
        let url = captures.get(0).unwrap().as_str();
        format!("<a href=\"{}\">{}</a>", url, url)
    }

    // Apply any additional formatting based on the style_dict
    let mut formatted_chunk = chunk.to_owned();

    for (key, styles) in style_dict {
        let pattern = format!(r"(\b{}\b)", regex::escape(key));
        let regex = regex::Regex::new(&pattern)?;

        formatted_chunk = regex
            .replace_all(&formatted_chunk, |captures: &regex::Captures| {
                let match_str = captures.get(0).unwrap().as_str();
                apply_styled_text(match_str.to_string(), styles.clone())
            })
            .to_string();
    }

    // Replace URLs with HTML <a> tags
    formatted_chunk = url_pattern
        .replace_all(&formatted_chunk, replace_url_with_link)
        .to_string();

    Ok(formatted_chunk)
}

// Function to wrap text in <span> tags with class names for styles/colors
fn apply_styled_text(text: String, styles: Vec<String>) -> String {
    let class_names = styles.join(" ");
    format!("<span class=\"{}\">{}</span>", class_names, text)
}
