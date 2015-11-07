module.exports = function(fnArr, conditionFn) {
  return run(0, fnArr || [], conditionFn);
};

function run(i, fnArr, conditionFn) {
  if (i < fnArr.length) {
    return fnArr[i]().then(function() {
      if (conditionFn.apply(this, arguments)) {
        return Promise.resolve(arguments[0]);
      } else {
        return run(i + 1, fnArr, conditionFn);
      }
    });
  } else {
    return Promise.resolve();
  }
}