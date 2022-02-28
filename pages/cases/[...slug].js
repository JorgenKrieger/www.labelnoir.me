// Libraries
import { useRouter } from 'next/router';
import Head from 'next/head';

// Component
const Case = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <>
            <Head>
                <title>{slug} / LabelNoir</title>
            </Head>
            <p>Slug: {slug}</p>
        </>
    );
};

// Export
export default Case;
