/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
    default-src 'self';
    script-src-elem 'self';
    script-src 'unsafe-eval';
    img-src 'self' blob: data: www.datocms-assets.com images.unsplash.com;
    object-src 'none';
    style-src 'self' 'unsafe-inline';
    font-src 'self' fonts.bunny.net data:;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: ['images.unsplash.com', 'www.datocms-assets.com'],
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    async redirects() {
        return [
            {
                source: '/cases',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig);
