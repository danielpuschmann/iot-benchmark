import PDFDocument from "pdfkit";
import { Http2ServerResponse } from "http2";

async function generatePdf2() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const res = Http2ServerResponse;
    doc.pipe(res);
    doc.text("HOWDY YOUNG FELLA!");
    doc.end();
    doc.on("end", () => {
      resolve(res);
    });
  });
}

async function generatePdf() {
  console.log("generatePdf");
  return new Promise((resolve, reject) => {
    // Create a document

    console.log("Start promist");
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream("output.pdf"));

    // Embed a font, set the font size, and render some text
    doc.text("Some text with an embedded font!", 100, 100);

    console.log("add tesxt");
    // Finalize PDF file
    doc.end();

    console.log("End doc");
    resolve(PDFDocument);

    console.log("after resolve");
  });
}

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
    console.log("AHA");
    const stream = await generatePdf();
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "application/pdf"
      },
      body: stream.toString("base64")
    };
  }
};
