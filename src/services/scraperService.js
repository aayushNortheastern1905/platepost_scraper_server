// const puppeteerScraper = require("./puppeteerScraper");
// const cssScraper = require("./cssScraper");
// const { Parser } = require("json2csv");
// const fs = require("fs-extra");
// const path = require("path");

// exports.scrape = async (url) => {
//   const htmlData = await puppeteerScraper.scrapeWithPuppeteer(url);
//   const cssData = await cssScraper.scrapeCSS(url);

//   const scrapedData = {
//     logo: htmlData.logo,
//     images: htmlData.images,
//     videos: htmlData.videos,
//     colors: cssData.colors,
//     fonts: cssData.fonts,
//   };

//   return generateCSV(scrapedData);
// };

// const generateCSV = (data) => {
//     try {
//       const filePath = path.join(__dirname, "../../temp", `scraped_data_${Date.now()}.csv`);
//       console.log("Generating CSV at Path:", filePath); // Debugging
  
//       const csvData = [
//         { type: "Logo", data: data.logo },
//         ...data.fonts.map((font) => ({ type: "Font", data: font })),
//         ...data.colors.map((color) => ({ type: "Color", data: color })),
//         ...data.images.map((img) => ({ type: "Image", data: img })),
//         ...data.videos.map((video) => ({ type: "Video", data: video })),
//       ];
  
//       console.log("CSV Data:", csvData); // Debugging
  
//       const parser = new Parser();
//       const csv = parser.parse(csvData);
//       fs.writeFileSync(filePath, csv);
  
//       console.log("CSV successfully written at Path:", filePath); // Debugging
//       return filePath;
//     } catch (error) {
//       console.error("Error in generateCSV:", error.message); // Debugging
//       throw error; // Propagate the error to the caller
//     }
//   };
  
  
const puppeteerScraper = require("./puppeteerScraper");
const { Parser } = require("json2csv");
const fs = require("fs-extra");
const path = require("path");

exports.scrape = async (url) => {
  const htmlData = await puppeteerScraper.scrapeWithPuppeteer(url);

  const scrapedData = {
    logo: htmlData.logo,
    images: htmlData.images,
    videos: htmlData.videos,
  };

  // Generate and return CSV file path
  return generateCSV(scrapedData);
};

const generateCSV = (data) => {
  const filePath = path.join(__dirname, "../../temp", `scraped_data_${Date.now()}.csv`);

  const csvData = [
    { type: "Logo", data: data.logo },
    ...data.images.map((img) => ({ type: "Image", data: img })),
    ...data.videos.map((video) => ({ type: "Video", data: video })),
  ];

  const parser = new Parser();
  const csv = parser.parse(csvData);

  // Ensure the temp directory exists
  fs.ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, csv);

  console.log("CSV successfully written at:", filePath); // Debugging
  return filePath; // Return the file path
};
