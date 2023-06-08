const { nextISSTimesForMyLocation } = require('./issPromised');

nextISSTimesForMyLocation()
  .then(response => console.log(response))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
