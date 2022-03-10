import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://graphql.datocms.com/',
});

const previewHttpLink = createHttpLink({
    uri: 'https://graphql.datocms.com/preview',
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
    link: authLink.concat(
        ApolloLink.split(
            (operation) => operation.getContext().preview || false,
            previewHttpLink,
            httpLink
        )
    ),
    cache: new InMemoryCache(),
});

export default client;
