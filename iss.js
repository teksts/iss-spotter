const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const ipApi = 'https://api.ipify.org/?format=json';
const geolocateApi = "http://ipwho.is/";
const issApi = "https://iss-flyover.herokuapp.com/json/?";

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchGeoCoordByIp(ip, (error, geolocation) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(geolocation, (error, flyovers) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, flyovers);
      });
    });
  });
};

const fetchMyIP = function(callback) {
  request(ipApi, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAsJSON = JSON.parse(body)["ip"];
    callback(null, ipAsJSON);
  });
};

const fetchGeoCoordByIp = function(ip, callback) {
  const geolocateUrl = geolocateApi + ip;
  request(geolocateUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if success status is false
    const parsedBody = JSON.parse(body);
    if (!parsedBody["success"]) {
      const msg = `Success status was false. Message from server: ${parsedBody["message"]}`;
      callback(Error(msg), null);
      return;
    }
    const gelocation = {
      "latitude": parsedBody["latitude"],
      "longitude": parsedBody["longitude"]
    };
    callback(null, gelocation);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const issUrl = `${issApi}lat=${coords["latitude"]}&lon=${coords["longitude"]}`;
  request(issUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    const arrayOfFlyovers = [];
    parsedBody["response"].forEach(flyover => arrayOfFlyovers.push(flyover));
    callback(null, arrayOfFlyovers);
  });
};

module.exports = { nextISSTimesForMyLocation };