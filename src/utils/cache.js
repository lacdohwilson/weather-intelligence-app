const cache = new Map();

const lastTimeCached = 10 * 60 * 1000; // 10 Minutes

const getCachedWeather = (city) => {
  const cached = cache.get(city);

  if (cached && Date.now() - cached.timestamp < lastTimeCached) {
    return cached.data;
  }

  return null;
};

const setCache = (city, data) => {
  cache.set(city, {
    data,
    timestamp: Date.now(),
  });
};

export default {
  getCachedWeather,
  setCache,
};
