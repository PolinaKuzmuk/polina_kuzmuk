const path = require('path');
const fileMock = path.resolve('mockFiles', 'fileMock.js');
const cssMock = path.resolve('mockFiles', 'cssMock.js');

const config = {
  verbose: true,
  moduleNameMapper: {
    '.(gif|png|jpe?g|svg|woff|woff2|eot|ttf|otf)$': fileMock,
    '.(css|less)$': cssMock
  }
};

module.exports = config;