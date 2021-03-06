// Libraries
import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useIntersection } from 'react-use';
import classnames from 'classnames/bind';
import styles from './Footer.module.sass';

// Prepare styles
let cx = classnames.bind(styles);

// Component
const Footer = () => {
    const [showNoCookie, setIsOpen] = useState(false);
    const footer = useRef(null);
    const intersection = useIntersection(footer, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    return (
        <footer
            ref={footer}
            id="contact"
            className={cx('container', 'footer', {
                lazy: intersection && !intersection.isIntersecting,
            })}
        >
            <blockquote>
                <p>Let’s create something awesome together</p>
                <CSSTransition
                    in={showNoCookie}
                    timeout={300}
                    classNames={cx('fade')}
                    unmountOnExit
                >
                    <div className={cx('noCookie')}>
                        <p className="small">
                            That’s right, this site doesn’t contain any cookies. Your data is your
                            own, I don’t want it. This website has been specifically build to work
                            without using cookies. Still want cookies? Let's meet up for some
                            chocolate-chip cookies! 🍪
                        </p>
                    </div>
                </CSSTransition>
            </blockquote>

            <div className={cx('links')}>
                <ul className="links_list">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/jorgenkrieger/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/jorgenkrieger/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a href="mailto:jorgen@labelnoir.me">E-mail</a>
                    </li>
                </ul>

                <button onClick={() => setIsOpen(!showNoCookie)}>No cookies?</button>
            </div>
        </footer>
    );
};

// Export
export default Footer;
