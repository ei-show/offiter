module.exports = () => {
  if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(`${process.env.PWD}/node_modules/canvas/build/Release:`)
  ) {
    process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${
      process.env.LD_LIBRARY_PATH || ''
    }`
  }

  return {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.microcms-assets.io',
        },
      ],
    },
  }
}
