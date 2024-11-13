const fs = require("fs-extra");
const path = require("path");


const ensureDirectoryExists = () => {
    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) {
      console.log("Creating Temp Directory:", tempDir); // Debugging
      fs.mkdirSync(tempDir, { recursive: true });
    }
  };
  
  ensureDirectoryExists(); // Call this before generating the CSV
  
module.exports = { ensureDirectoryExists };
