// Dominat8 Autopilot – runs on separate thread to bypass browser throttling
setInterval(() => {
  postMessage("RUN_CYCLE");
}, 60000);
