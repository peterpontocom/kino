// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

// const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './src/global.css' })

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// })();

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (async () => {

  const defaultConfig = await getDefaultConfig(__dirname);

  const configWithNativeWind = withNativeWind(defaultConfig, { input: './src/global.css' });

  const { resolver: { sourceExts, assetExts } } = configWithNativeWind;

  return {
    ...configWithNativeWind,
    transformer: {
      ...configWithNativeWind.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...configWithNativeWind.resolver,
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();