const { handler } = require("./deviceNames");

console.log("Starting...");
handler({}).then(
  res => console.log("Done!", res),
  err => console.error("Error!", err)
);
