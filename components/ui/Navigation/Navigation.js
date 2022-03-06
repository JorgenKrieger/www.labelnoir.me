// Libraries
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navigation.module.sass';
import Logo from '../Logo';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const Navigation = () => {
    const [isOpen, openMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.body.classList.toggle('menu-open', isOpen);
    }, [isOpen]);

    useEffect(() => {
        document.body.classList.toggle('menu-open', false);
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            openMenu(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
    });

    return (
        <>
            <a className={styles.skip} href="#main" onClick={() => openMenu(false)}>
                Skip to main content
            </a>
            <FocusLock disabled={!isOpen}>
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
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </header>

                <CSSTransition in={isOpen} timeout={300} classNames={cx('fade')} unmountOnExit>
                    <nav className={cx('navigation')}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>

                        <Link href="/about">
                            <a>About</a>
                        </Link>

                        <Link href="#contact">
                            <a
                                onClick={() => {
                                    openMenu(false);
                                }}
                            >
                                Contact
                            </a>
                        </Link>
                    </nav>
                </CSSTransition>
            </FocusLock>
        </>
    );
};

// Export
export default Navigation;
