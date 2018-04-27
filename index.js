const { debuglog } = require('util');
const debug = debuglog('promise-retry2');
/**
 * [promise-retry:  catch promise error and retry]
 * @param  {[type]} task    [description]
 * @param  {[type]} n       [description]
 * @param  {[type]} timeout [description]
 * @return {[type]}         [description]
 * @source https://gist.github.com/song940/6e3e1ec0380956006cd1
 */
module.exports = function retry(task, n, timeout) {
  n = n || 1;
  timeout = timeout || 0;
  var timeouts = [];
  if (Array.isArray(n)) {
    timeouts = n;
  } else {
    while (n--) timeouts.push(timeout);
  }
  return new Promise(function (accept, reject) {
    (function fn() {
      task(this).then(accept, function (err) {
        if (timeouts.length) {
          timeout = timeouts.shift();
          debug('%ss after retry', timeout / 1000);
          setTimeout(fn, timeout);
        } else reject(err);
      });
    })();
  });
}