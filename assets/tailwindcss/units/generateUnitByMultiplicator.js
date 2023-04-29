module.exports = function (multiplicator, max) {
  const units = {};

  for (let i = 1; i <= max; i++) {
    units[i] = `${i * multiplicator}px`;
  }

  return units;
};
