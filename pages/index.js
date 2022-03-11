// Libraries
import Head from 'next/head';
import { H, Section } from 'react-headings';
import { CaseGrid, HomeHero } from '../components/content';
import { renderMetaTags } from 'react-datocms';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { setContext } from '@apollo/client/link/context';

// Components
const Home = ({ data }) => {
    return (
        <Section>
            <Head>{renderMetaTags([...data.home.seo, ...data.site.favicon])}</Head>

            <HomeHero content={data.home.heroContent} image={data.home.heroImage} />

            <CaseGrid projects={data.allCases}>
                <H>{data.home.casesHeading}</H>
            </CaseGrid>
        </Section>
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
                        url
                        alt
                        height
                        width
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
                        url
                        alt
                        height
                        width
                        blurUpThumb
                    }
                    logo {
                        url
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
