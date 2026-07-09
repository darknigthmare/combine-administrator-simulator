use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        let window = app.get_webview_window("main");
        if let Some(window) = window {
          let _ = window.set_title("Combine Administrator Simulator — Dev Terminal");
        }
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running Combine Administrator Simulator");
}
