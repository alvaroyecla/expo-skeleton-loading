module.exports = function(api) {
    if(api) {
        api.cache(false);
    }

    return {
      plugins: ['react-native-worklets/plugin'],
    };
  };
