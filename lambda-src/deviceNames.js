const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { cleanEnv, str, num, json, url } = require("envalid");

const env = cleanEnv(process.env, {
  ACCESS_TOKEN: str(),
  REFRESH_TOKEN: str(),
  SCOPE: str(),
  TOKEN_TYPE: str(),
  EXPIRY_DATE: num(),
  CLIENT_ID: str(),
  CLIENT_ID: str(),
  AUTH_URI: url(),
  TOKEN_URI: url(),
  AUTH_PROVIDER_X509_CERT_URL: url(),
  CLIENT_SECRET: str(),
  REDIRECT_URIS: json(),
  SPREADSHEET_ID: str()
});

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize() {
  //const { client_secret, client_id, redirect_uris } = credentials.installed;
  const client_secret = env.CLIENT_SECRET;
  const client_id = env.CLIENT_ID;
  const redirect_uris = env.REDIRECT_URIS;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Check if we have previously stored a token.
  //fs.readFile(TOKEN_PATH, (err, token) => {
  if (env.ACCESS_TOKEN) {
    console.log("Authenticating Client");
    oAuth2Client.setCredentials({
      refresh_token: env.REFRESH_TOKEN,
      access_token: env.ACCESS_TOKEN
    });
    return oAuth2Client;
  } else {
    return getNewToken(oAuth2Client);
  }
  //});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      return oAuth2Client;
    });
  });
}

async function getDeviceNames() {
  auth = authorize();
  const sheets = google.sheets({ version: "v4", auth });
  const values = (
    await sheets.spreadsheets.values.get({
      spreadsheetId: env.SPREADSHEET_ID,
      range: "Sheet1!A1:AN"
    })
  ).data.values;
  const names = values
    .map(row => row[0])
    .filter(name => name != "Name" && name != "" && name && "undefine");
  return names;
}

exports.handler = async event => {
  return getDeviceNames().then(
    res => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(res)
      };
      //console.log(response);
      return response;
    },
    error => {
      console.log(error);
      return error;
    }
  );
};
