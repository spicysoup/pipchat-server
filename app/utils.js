const util = require('util');

module.exports.printObject = (o) => {
  console.log(util.inspect(o, {compact: false, depth: 5, breakLength: 80}));
};
