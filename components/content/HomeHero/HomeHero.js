// Libraries
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { StructuredText } from 'react-datocms';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './HomeHero.module.sass';

// Prepare classes
let cx = classNames.bind(styles);
gsap.registerPlugin(ScrollTrigger);

// Components
const HomeHero = ({ content, image }) => {
    const background = useRef();

    useEffect(() => {
        gsap.to(background.current, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top 0%',
                end: window.innerHeight,
                scrub: true,
            },
            yPercent: 75
        });
    }, []);

    return (
        <div className={cx('container', 'hero')} tabIndex="0">
            <div className={cx('content')}>
                <StructuredText data={content} />
            </div>

            <div className={cx('year')}>
                <span ref={background}>1989</span>
            </div>

            <figure>
                <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    placeholder="blur"
                    blurDataURL={image.blurUpThumb}
                    layout="responsive"
                />
                <figcaption>{image.title}</figcaption>
            </figure>
        </div>
    );
};

// Export
export default HomeHero;
