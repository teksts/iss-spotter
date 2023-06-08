const request = require('request-promise-native');
const ipApi = 'https://api.ipify.org/?format=json';
const geolocateApi = "http://ipwho.is/";
const issApi = "https://iss-flyover.herokuapp.com/json/?";


const fetchMyIP = function() {
  return request(ipApi);
};

const fetchGeoCoordByIp = function(body) {
  const geolocateUrl = geolocateApi + JSON.parse(body)["ip"];
  return request(geolocateUrl);
};

const fetchISSFlyOverTimes = function(body) {
  const issUrl = `${issApi}lat=${JSON.parse(body)["latitude"]}&lon=${JSON.parse(body)["longitude"]}`;
  return request(issUrl);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchGeoCoordByIp)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };