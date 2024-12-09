/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    basePath:'/todo',
    assetPrefix:'/todo',
    trailingSlash: true,
    
    swcMinify: true,
    reactStrictMode: true,
}

export default nextConfig;
