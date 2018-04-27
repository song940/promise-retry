const retry = require('..');

retry(() => Promise.reject(1), [ 1000, 3000, 5000 ]).then(res => {
  console.log(res);
}, () => console.error('fail'));