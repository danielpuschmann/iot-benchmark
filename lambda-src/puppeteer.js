const chromium = require("chrome-aws-lambda");

exports.handler = async event => {
  if (event.httpMethod === "OPTIONS") {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify({ message: "You can use CORS" })
    };
    return response;
  } else {
    try {
      const pageToScreenshot = "https://bitsofco.de";
      console.log("1");
      const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless
      });

      console.log("2");
      const page = await browser.newPage();

      await page.goto(pageToScreenshot);

      console.log("3");
      const screenshot = await page.screenshot({ encoding: "binary" });

      await browser.close();

      console.log("4");
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Complete screenshot of ${pageToScreenshot}`,
          buffer: screenshot
        })
      };
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: `Error: ${e.message}`
        })
      };
    }
  }
};
