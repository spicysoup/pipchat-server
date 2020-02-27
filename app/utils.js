const util = require('util');

module.exports.printObject = (o) => {
  console.log(util.inspect(o, {compact: false, depth: 2, breakLength: 80}));
};
