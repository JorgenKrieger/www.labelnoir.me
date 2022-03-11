/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
    default-src 'self';
    script-src-elem 'self';
    script-src 'unsafe-eval';
    img-src 'self' blob: data: www.datocms-assets.com images.unsplash.com;
    object-src 'none';
    style-src 'self' fonts.googleapis.com 'unsafe-inline';
    font-src 'self' fonts.gstatic.com data:;
`;

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'Referrer-Policy',
        value: 'same-origin',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
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

module.exports = nextConfig;
