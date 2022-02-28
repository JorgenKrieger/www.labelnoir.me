// Libraries
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './Breadcrumbs.module.sass';

// Component
const generatePathParts = (pathStr) => {
    const pathWithoutQuery = pathStr.split('?')[0];
    return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

const Breadcrumbs = () => {
    const router = useRouter();

    const breadcrumbs = useMemo(() => {
        const asPathNestedRoutes = generatePathParts(router.asPath);

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            if (subpath.charAt(0) === ('#' || '?')) return;

            const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
            return {
                path: href,
                label:
                    subpath.charAt(0).toUpperCase() +
                    subpath.slice(1).replace('-', ' ').split('#')[0],
            };
        });

        const homeCrumb = {
            path: '/',
            label: 'LabelNoir',
        };

        if (!crumblist[0]) return [homeCrumb];

        return [homeCrumb, ...crumblist];
    }, [router.asPath, router.pathname, router.query]);

    return (
        <>
            {breadcrumbs.map((crumb, idx) => (
                <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
            ))}
        </>
    );
};

const Crumb = ({ path, label, last = false }) => {
    if (last) {
        return <span className={styles.breadcrumb}>{label}</span>;
    }

    return (
        <Link href={path}>
            <a className={styles.breadcrumb}>{label}</a>
        </Link>
    );
};

// Export
export default Breadcrumbs;
