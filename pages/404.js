// Libraries
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from '../styles/pages/404.module.sass';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const Custom404 = () => {
    return (
        <div className={cx('container', 'error')}>
            <p className="small">Error 404 - Page not found</p>
            <h1>
                Congratulations.
                <br />
                You broke the internet
            </h1>
            <p>
                Okay, perhaps things aren't that bad after all. The page you're looking for just
                couldn't be found. Return to the homepage to discover all pages.
            </p>
            <p>
                <Link href="/">
                    <a>Take me home</a>
                </Link>
            </p>
        </div>
    );
};

// Export
export default Custom404;
