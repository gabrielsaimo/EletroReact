module.exports = function(api) {
  api.cache(true);
  return {
    "plugins": [
      ["@babel/plugin-transform-spread", {
        "loose": true
      }]
    ],
    presets: ['babel-preset-expo']
  };
};

