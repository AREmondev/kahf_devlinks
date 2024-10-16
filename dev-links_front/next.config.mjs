/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: [
      "localhost",
      "https://devlinks-back.onrender.com",
      "devlinks-back.onrender.com",
      "media.licdn.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value:
  //             "default-src 'self'; img-src 'self' http://localhost:8000; font-src 'self' https: data:; connect-src 'self' http://localhost:8000;",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
