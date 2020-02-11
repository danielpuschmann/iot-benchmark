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

module.exports = env;
