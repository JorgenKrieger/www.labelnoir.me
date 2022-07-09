// Libraries
import Image from 'next/image';
import { H, Section } from 'react-headings';
import classnames from 'classnames/bind';
import styles from './WorkExperience.module.sass';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Prepare classes
let cx = classnames.bind(styles);

// Helper components
const Logo = ({ logo }) => {
    if (!logo) {
        return (
            <figure>
                <p>
                    Company
                    <br />
                    no longer
                    <br />
                    in business
                </p>
            </figure>
        );
    }

    return (
        <figure>
            <Image
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                objectFit="scale-down"
            />
        </figure>
    );
};

// Component
const WorkExperience = ({ data }) => {
    return (
        <section className={cx('workExperience')} tabIndex="0">
            <H className={cx('h2')}>Work Experience</H>

            <Section>
                <Swiper className={cx('jobs')} spaceBetween={50} slidesPerView={'auto'}>
                    {data.map((job) => (
                        <SwiperSlide key={job.agency} className={cx('slide')} tabIndex="0">
                            <Logo logo={job.logo} />
                            <H className={cx('agency')}>{job.agency}</H>
                            <p className={cx('year')}>
                                {job.startYear} - {job.endYear || 'Current'}
                            </p>
                            <p className={cx('function')}>{job.function}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Section>
        </section>
    );
};

// Export
export default WorkExperience;
