/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [],
    },
    webpack: (config) => {
      config.externals = [...(config.externals || []), { canvas: 'canvas' }];
      return config;
    },
  };
  
  export default nextConfig;