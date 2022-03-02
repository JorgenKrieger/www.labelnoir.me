// Libraries
import Link from 'next/link';
import Image from 'next/image';
import { H, Section } from 'react-headings';
import { StructuredText } from 'react-datocms';
import styles from './CaseTile.module.sass';

// Components
const CaseTile = ({ client, excerpt, slug, year, thumbnail, logo }) => {
    return (
        <Section>
            <div className={styles.case}>
                <Link href="/cases/keukenliefde">
                    <a className={styles.image}>
                        <Image
                            src={thumbnail.url}
                            alt={thumbnail.alt}
                            width={thumbnail.width}
                            height={thumbnail.width}
                            placeholder="blur"
                            blurDataURL={thumbnail.blurUpThumb}
                            objectFit="cover"
                        />
                        <div className={styles.logo}>
                            <Image
                                src={logo.url}
                                alt={logo.alt}
                                width={thumbnail.width}
                                height={thumbnail.height}
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
                    <a>Explore project</a>
                </Link>
            </div>
        </Section>
    );
};

// Export
export default CaseTile;
