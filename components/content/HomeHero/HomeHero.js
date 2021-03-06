// Libraries
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { StructuredText } from 'react-datocms';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './HomeHero.module.sass';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Prepare classes
let cx = classNames.bind(styles);

// Components
const HomeHero = ({ content, image }) => {
    const background = useRef();
    const hero = useRef();

    useEffect(() => {
        gsap.to(background.current, {
            scrollTrigger: {
                trigger: hero.current,
                start: 'top 0%',
                end: window.innerHeight,
                scrub: true,
            },
            yPercent: 75
        });
    }, []);

    return (
        <div ref={hero} className={cx('container', 'hero')} tabIndex="0">
            <div className={cx('content')}>
                <StructuredText data={content} />
            </div>

            <div className={cx('year')}>
                <span ref={background}>1989</span>
            </div>

            <figure>
                <Image
                    src={image.responsiveImage.src}
                    alt={image.alt}
                    width={image.responsiveImage.width}
                    height={image.responsiveImage.height}
                    placeholder="blur"
                    blurDataURL={image.blurUpThumb}
                    layout="responsive"
                    objectFit="cover"
                />
                <figcaption>{image.title}</figcaption>
            </figure>
        </div>
    );
};

// Export
export default HomeHero;
