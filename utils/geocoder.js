const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey:'snCw2ShOLA4aWr8RvpfXiEQUgt5d9pnA',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;