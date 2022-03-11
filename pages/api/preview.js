export default (req, res) => {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.NEXT_PUBLIC_DATOCMS_PREVIEW_TOKEN || !req.query.slug) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});

    // Redirect to home
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/` });
    res.end();
};
