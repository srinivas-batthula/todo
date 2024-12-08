const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public', // Service worker files will be generated here
        register: true,
        skipWaiting: true,
        ServiceWorker:'public/service-worker.js'
    },
    // Any other Next.js configurations can go here
})


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output:'export',
//     basePath:'/todo',
//     assetPrefix:'/todo',
//     trailingSlash: true,
// }

// export default nextConfig;
