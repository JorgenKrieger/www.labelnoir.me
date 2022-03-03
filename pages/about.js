// Libraries
import classnames from 'classnames/bind';
import styles from '../styles/pages/about.module.sass';

// Prepare classes
let cx = classnames.bind(styles);

// Component
const About = () => {
    return (
        <>
            <header className={cx('container')}>
                <h1>About</h1>
            </header>
        </>
    );
};

// Export
export default About;
