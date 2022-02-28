// Libraries
import { useState, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './Navigation.module.sass';

// Imports
import Logo from '../Logo';

// Connect styles
let cx = classNames.bind(styles);

// Component
const Navigation = () => {
    const [isOpen, openMenu] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('menu-open', isOpen);
    }, [isOpen]);

    return (
        <FocusLock disabled={!isOpen}>
            <a className={styles.skip} href="#main" onClick={() => openMenu(false)}>
                Skip to main content
            </a>

            <header className={cx('container', 'header')}>
                <Logo />

                <button
                    aria-label={isOpen ? 'Open menu' : 'Close menu'}
                    aria-haspopup="menu"
                    onClick={() => openMenu(!isOpen)}
                    className={cx('menu-toggle', {
                        open: isOpen,
                        closed: !isOpen,
                    })}
                >
                    {isOpen ? 'Close menu' : 'Open menu'}
                </button>
            </header>

            {isOpen && (
                <nav className={styles.navigation}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>

                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </nav>
            )}
        </FocusLock>
    );
};

// Export
export default Navigation;
