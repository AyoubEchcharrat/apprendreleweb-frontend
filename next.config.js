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
    // Autres configurations personnalisées...
  };