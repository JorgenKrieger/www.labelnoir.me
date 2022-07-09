// Libraries
import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import { H, Section } from 'react-headings';
import { renderMetaTags, StructuredText } from 'react-datocms';
import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../styles/pages/case.module.sass';

// Content imports
import dynamic from 'next/dynamic';
const TextRecord = dynamic(() => import('../../components/content').then((mod) => mod.TextRecord))
const ImageRecord = dynamic(() => import('../../components/content').then((mod) => mod.ImageRecord))
const QuoteRecord = dynamic(() => import('../../components/content').then((mod) => mod.QuoteRecord))
const GalleryRecord = dynamic(() => import('../../components/content').then((mod) => mod.GalleryRecord))

// Prepare classes
let cx = classNames.bind(styles);

// Helper functions
const Content = ({ data }) => {
    switch (data.__typename) {
        case 'TextRecord':
            return <TextRecord data={data} />;
        case 'ImageRecord':
            return <ImageRecord data={data} />;
        case 'QuoteRecord':
            return <QuoteRecord data={data} />;
        case 'GalleryRecord':
            return <GalleryRecord data={data} />;
        default:
            return <div>{JSON.stringify(data, null, 2)}</div>;
    }
};

// Component
const Case = ({ caseData, favicon }) => {
    const data = caseData;

    return (
        <>
            <Head>{renderMetaTags([...data.seo, ...favicon])}</Head>

            <header
                className={cx('container', 'hero')}
                style={{ '--backgroundImage': `url(${data.thumbnail.url})` }}
            >
                <H className={cx('heading')}>
                    <span className={cx('align-left')}>{data.titleLeftAligned}</span>
                    <span className={cx('align-right')}>{data.titleRightAligned}</span>
                </H>

                {(data.agency || data.year || data.role) && (
                    <dl>
                        {data.agency && (
                            <>
                                <dt>Agency</dt>
                                <dd>
                                    <Agency agency={data.agency} />
                                </dd>
                            </>
                        )}

                        {data.year && (
                            <>
                                <dt>Year</dt>
                                <dd>{data.year}</dd>
                            </>
                        )}

                        {data.role && (
                            <>
                                <dt>Role</dt>
                                <dd>{data.role}</dd>
                            </>
                        )}
                    </dl>
                )}
            </header>

            <Section>
                <section className={cx('container', 'summary')}>
                    <div>
                        <H className="h3">Challenge</H>
                        <StructuredText data={data.challenge} />
                    </div>

                    <div>
                        <H className="h3">Outcome</H>
                        <StructuredText data={data.outcome} />
                    </div>

                    <blockquote>{data.quote}</blockquote>
                </section>
                {data.content.map((block) => (
                    // <section className={cx('container')} key={block.id}>
                    //     {JSON.stringify(block, null, 2)}
                    // </section>
                    <Content key={Math.random()} data={block} />
                ))}
            </Section>
        </>
    );
};

export const Agency = ({ agency }) => {
    switch (agency) {
        case 'student':
            return 'Student work';
        case 'elastik':
            return (
                <a href="https://elastik.nl/" target="_blank" rel="noopener noreferrer">
                    elastik.
                </a>
            );
        case 'keplar':
            return (
                <a href="https://www.keplaragency.com/" target="_blank" rel="noopener noreferrer">
                    Keplar Agency
                </a>
            );
        case 'rox':
            return (
                <a href="https://www.rox.com/" target="_blank" rel="noopener noreferrer">
                    ROX
                </a>
            );
    }
};

// Create static pages
export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
            query allCases {
                allCases {
                    slug
                }
            }
        `,
    });

    const paths = data.allCases.map((singleCase) => ({
        params: { slug: singleCase.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

// GraphQL
export async function getStaticProps(context) {
    const { data } = await client.query({
        query: gql`
            query CaseBySlug($slug: String!) {
                site: _site {
                    favicon: faviconMetaTags {
                        attributes
                        content
                        tag
                    }
                }
                case(filter: { slug: { eq: $slug } }) {
                    seo: _seoMetaTags {
                        attributes
                        content
                        tag
                    }
                    client
                    titleLeftAligned
                    titleRightAligned
                    thumbnail {
                        url
                    }
                    content {
                        ... on ImageRecord {
                            id
                            image {
                                width
                                url
                                height
                                blurUpThumb
                                alt
                                title
                            }
                            imageSize
                        }
                        ... on QuoteRecord {
                            id
                            blockquote
                        }
                        ... on TextRecord {
                            id
                            title
                            textAlignRight
                            content {
                                value
                            }
                        }
                        ... on GalleryRecord {
                            id
                            images {
                                alt
                                title
                                url
                                width
                                blurUpThumb
                                height
                            }
                        }
                    }
                    agency
                    challenge {
                        value
                    }
                    outcome {
                        value
                    }
                    quote
                    role
                    year
                }
            }
        `,
        variables: {
            slug: context.params.slug,
        },
        context: { preview: context.preview || false },
    });

    const favicon = data.site.favicon;
    const caseData = data.case;

    return { props: { caseData, favicon } };
}

// Export
export default Case;
