/** @type {import('next').NextConfig} */
module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    pageExtensions: ['jsx', 'js', 'ts', 'tsx'], // Incluez les extensions de fichiers de vos pages
    generateEtags: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images2.imgbox.com',
        },
        {
          protocol: 'https',
          hostname: 'www.zupimages.net',
        },
        {
          protocol: 'https',
          hostname: 'zupimages.net',
        },
      ],
    },
  };