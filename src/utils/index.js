const delay = (amount = 1000) => new Promise((resolve) => setTimeout(resolve, amount));

const getByValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
};

module.exports = { delay, getByValue };
