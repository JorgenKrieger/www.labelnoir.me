// Libraries
import Head from 'next/head';
import { H, Section } from 'react-headings';
import { HomeHero } from '../components/content';
import { renderMetaTags } from 'react-datocms';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import styles from '../styles/pages/home.module.sass';
import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';

const CaseGrid = dynamic(import('../components/content').then((mod) => mod.CaseGrid))

// Prepare styles
let cx = classNames.bind(styles);

// Components
const Home = ({ data }) => {
    return (
        <Section>
            <Head>{renderMetaTags([...data.home.seo, ...data.site.favicon])}</Head>

            <HomeHero content={data.home.heroContent} image={data.home.heroImage} />

            <CaseGrid projects={data.allCases}>
                <H className={cx('heading')}>
                    {data.home.casesHeading}
                </H>
            </CaseGrid>
        </Section >
    );
};

// GraphQL
export async function getStaticProps(context) {
    const { data } = await client.query({
        query: gql`
            query HomePage {
                site: _site {
                    favicon: faviconMetaTags {
                        attributes
                        content
                        tag
                    }
                }
                home {
                    seo: _seoMetaTags {
                        attributes
                        content
                        tag
                    }
                    id
                    heroContent {
                        value
                    }
                    heroImage {
                        responsiveImage(imgixParams: {fm: webp, fit: crop, maxW: "1080", maxH: "1080"}) {
                            src
                            height
                            width
                        }
                        alt
                        blurUpThumb
                    }
                    casesHeading
                }
                allCases(orderBy: year_DESC) {
                    client
                    slug
                    year
                    excerpt {
                        value
                    }
                    thumbnail {
                        responsiveImage(imgixParams: {fm: webp, fit: crop, maxW: "1080", maxH: "1080"}) {
                            src
                            height
                            width
                        }
                        alt
                        blurUpThumb
                    }
                    logo {
                        responsiveImage(imgixParams: {fm: webp}) {
                            src
                            height
                            width
                        }
                        alt
                        height
                        width
                    }
                }
            }
        `,
        context: { preview: context.preview },
    });

    return {
        props: { data },
    };
}

// Exports
export default Home;
