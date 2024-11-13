
const scraperService = require("../services/scraperService");
const path = require("path");
const fs = require("fs-extra");

exports.scrapeWebsite = async (req, res, next) => {
    try {
      const { url } = req.body;
  
      if (!url || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(url)) {
        return res.status(400).json({ error: "Invalid URL format" });
      }
  
      const csvFilePath = await scraperService.scrape(url);
  
      console.log("Generated CSV File Path:", csvFilePath); // Debugging
  
      if (!csvFilePath) {
        return res.status(500).json({ error: "CSV file path is undefined or invalid" });
      }
  
      // Read the CSV content and send it in the response
      const csvContent = fs.readFileSync(csvFilePath, "utf8");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${path.basename(csvFilePath)}`);
      res.send(csvContent);
    } catch (error) {
      console.error("Error in scrapeWebsite:", error.message);
      next(error);
    }
  };
  
