// Libraries
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { H, Section } from 'react-headings';
import { StructuredText } from 'react-datocms';
import classnames from 'classnames/bind';
import styles from './CaseTile.module.sass';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Styling
let cx = classnames.bind(styles);

// Components
const CaseTile = ({ client, excerpt, slug, year, thumbnail, logo }) => {
    const tile = useRef();
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        let el = tile.current;
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 80%',
                onEnter: () => { setHidden(false); },
                onLeaveBack: () => { setHidden(true); }
            },
        })
    }, [])


    return (
        <Section>
            <div ref={tile} className={cx('case', { hidden: isHidden })}>
                <Link href={`/cases/${slug}`}>
                    <a className={styles.image}>
                        <Image
                            src={thumbnail.responsiveImage.src}
                            alt={thumbnail.alt}
                            width={thumbnail.responsiveImage.width}
                            height={thumbnail.responsiveImage.width}
                            placeholder="blur"
                            blurDataURL={thumbnail.blurUpThumb}
                            objectFit="cover"
                        />
                        <div className={styles.logo}>
                            <Image
                                src={logo.responsiveImage.src}
                                alt={logo.alt}
                                width={thumbnail.responsiveImage.width}
                                height={thumbnail.responsiveImage.height}
                                objectFit="scale-down"
                            />
                        </div>
                    </a>
                </Link>

                <H>
                    {client} <span className="year">{year}</span>
                </H>

                <StructuredText data={excerpt} />

                <Link href={`/cases/${slug}`}>
                    <a>
                        <span>Explore project</span>
                        <svg viewBox="0 0 21 30">
                            <polyline points="0.5 27 4.5 27 18.5 13 8.5 3" />
                        </svg>
                    </a>
                </Link>
            </div>
        </Section>
    );
};

// Export
export default CaseTile;
