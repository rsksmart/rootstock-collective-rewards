/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3001',
        '.app.github.dev' // GitHub Codespace domain
      ]
    }
  }
};

export default nextConfig;