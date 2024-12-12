import fs from "fs";

// helper functions
function _copyDirectory(source: string, destination: string) {
  fs.cp(source, destination, { recursive: true, force: true }, (err) => { if (err) { console.error(`Error copying directory from ${source} to ${destination}:`, err); } });
}

function _buildWebsite() {
  console.log("Building website...");

  // create website directory for output
  if (!fs.existsSync("website")) {
    fs.mkdirSync("website");
  }

  _copyDirectory("src", "website");
}

// main.js
_buildWebsite();