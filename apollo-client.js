import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_DATOCMS_PREVIEW
        ? 'https://graphql.datocms.com/preview'
        : 'https://graphql.datocms.com/',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: Object.assign(headers || {}, {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_KEY}`,
        }),
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
