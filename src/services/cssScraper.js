const axios = require("axios");
const css = require("css");

exports.scrapeCSS = async (url) => {
  const colors = new Set();
  const fonts = new Set();

  const { data: html } = await axios.get(url);
  const cssLinks = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g) || [];

  for (const link of cssLinks) {
    const href = link.match(/href="([^"]+)"/)[1];
    const cssUrl = href.startsWith("http") ? href : new URL(href, url).href;
    const { data: cssText } = await axios.get(cssUrl);
    const parsedCSS = css.parse(cssText);

    parsedCSS.stylesheet.rules.forEach((rule) => {
      if (rule.declarations) {
        rule.declarations.forEach((decl) => {
          if (decl.property === "color" || decl.property === "background-color") {
            colors.add(decl.value);
          }
          if (decl.property === "font-family") {
            fonts.add(decl.value);
          }
        });
      }
    });
  }

  console.log("CSS Data Scraped:", { colors: Array.from(colors), fonts: Array.from(fonts) }); // Debugging
  return { colors: Array.from(colors), fonts: Array.from(fonts) };
};
