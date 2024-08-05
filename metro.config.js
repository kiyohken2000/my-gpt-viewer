const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'],
      assetExts: [...assetExts, 'web.js', 'web.jsx', 'web.ts', 'web.tsx']
    }
  };
})();