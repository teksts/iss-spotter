// index.js

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});

// const { fetchMyIP, fetchGeoCoordByIp, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   fetchGeoCoordByIp(ip, (error, geolocation) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     fetchISSFlyOverTimes(geolocation, (error, flyovers) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       console.log("It worked! Here are your next 5 flyovers:", flyovers);
//     });
//   });
// });