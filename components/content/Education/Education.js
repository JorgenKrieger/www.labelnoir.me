// Libraries
import { H, Section } from 'react-headings';
import styles from './Education.module.sass';
import classnames from 'classnames/bind';

// Prepare classes
let cx = classnames.bind(styles);

// Component
const Education = ({ data }) => {
    return (
        <section className={cx('container', 'content-education')}>
            <H>Educational background</H>

            {data.map((education) => (
                <div className={cx('school')}>
                    <div>
                        <p className={cx('degree')}>{education.degree}</p>
                        <p className={cx('institution')}>{education.institution}</p>
                    </div>
                    <p className={cx('year')}>
                        <span className={cx('start')}>{education.startYear}</span>
                        <span className={cx('end')}>{education.endYear || 'NOW'}</span>
                    </p>
                </div>
            ))}
        </section>
    );
};

// Export
export default Education;
