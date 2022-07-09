// Libraries
import Head from 'next/head';
import Image from 'next/image';
import { H, Section } from 'react-headings';
import classnames from 'classnames/bind';
import styles from '../styles/pages/about.module.sass';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import { renderMetaTags, StructuredText } from 'react-datocms';

// Content blocks
import dynamic from 'next/dynamic';
const Persona = dynamic(() => import('../components/content').then((mod) => mod.Persona))
const WorkExperience = dynamic(() => import('../components/content').then((mod) => mod.WorkExperience))
const Education = dynamic(() => import('../components/content').then((mod) => mod.Education))

// Prepare classes
let cx = classnames.bind(styles);

// Component
const About = ({ aboutData, favicon }) => {
    const data = aboutData;

    return (
        <>
            <Head>{renderMetaTags([...data.seo, ...favicon])}</Head>

            <header className={cx('container', 'hero')}>
                <H className={cx('heading')}>
                    <span className={cx('align-left')}>J&ouml;rgen</span>
                    <span className={cx('align-right')}>Krieger</span>
                </H>
            </header>

            <Section>
                <div className={cx('container', 'profile')}>
                    {data.profilePhoto && (
                        <figure>
                            <Image
                                src={data.profilePhoto.url}
                                width={data.profilePhoto.width}
                                height={data.profilePhoto.height}
                                placeholder="blur"
                                blurDataURL={data.profilePhoto.blurUpThumb}
                                alt={data.profilePhoto.alt}
                            />

                            {data.profilePhoto.title && (
                                <figcaption>{data.profilePhoto.title}</figcaption>
                            )}
                        </figure>
                    )}

                    <div className={cx('content')}>
                        <H className={cx('h3', 'title')}>{data.profileTitle}</H>
                        <StructuredText data={data.profileText.value} />
                    </div>
                </div>

                <Persona
                    photo={data.personaPhoto}
                    occupation={data.occupation}
                    status={data.relationStatus}
                    location={data.location}
                    archetype={data.archetype}
                    motivation={data.motivation}
                    personality={data.personality}
                    goals={data.goals.value}
                    frustrations={data.frustrations.value}
                />

                <WorkExperience data={data.agencies} />

                <Education data={data.studies} />
            </Section>
        </>
    );
};

// GraphQL
export async function getStaticProps(context) {
    const { data } = await client.query({
        query: gql`
            query AboutPage {
                site: _site {
                    favicon: faviconMetaTags {
                        attributes
                        content
                        tag
                    }
                }
                about {
                    seo: _seoMetaTags {
                        attributes
                        content
                        tag
                    }
                    personaPhoto {
                        url
                        width
                        title
                        height
                        blurUpThumb
                        alt
                    }
                    profileTitle
                    profileText {
                        value
                    }
                    profilePhoto {
                        url
                        width
                        height
                        title
                        alt
                        blurUpThumb
                    }
                    occupation
                    relationStatus
                    location
                    archetype
                    motivation
                    personality
                    goals {
                        value
                    }
                    frustrations {
                        value
                    }
                    agencies {
                        logo {
                            url
                            width
                            height
                            title
                            alt
                            blurUpThumb
                        }
                        agency
                        startYear
                        endYear
                        function
                    }
                    studies {
                        degree
                        institution
                        startYear
                        endYear
                    }
                }
            }
        `,
        context: { preview: context.preview },
    });

    const favicon = data.site.favicon;
    const aboutData = data.about;

    return {
        props: { aboutData, favicon },
    };
}

// Export
export default About;
