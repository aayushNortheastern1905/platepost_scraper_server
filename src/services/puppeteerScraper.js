const puppeteer = require("puppeteer");

exports.scrapeWithPuppeteer = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new", // Use new headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const logo = document.querySelector('link[rel="icon"]')?.href || "";
    const images = Array.from(document.querySelectorAll("img")).map((img) => img.src);
    const videos = Array.from(document.querySelectorAll("video, iframe")).map((video) => video.src);
    return { logo, images, videos };
  });

  await browser.close();
  console.log("HTML Data Scraped:", data); // Debugging
  return data;
};
