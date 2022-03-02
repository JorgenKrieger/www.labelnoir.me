/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/cases',
                destination: '/',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['images.unsplash.com', 'www.datocms-assets.com'],
    },
};

module.exports = nextConfig;
