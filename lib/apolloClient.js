import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, from, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

// just a variable
let apolloClient;

const httpLink = new HttpLink({
  // set the URI
  uri: process.env.gqlUri,
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.gqlUriWs,
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    )
  : httpLink;

// Create and authentication header to send along with every HTTP request
const authLink = setContext((_, { headers }) => {
  // set a header for dgraph with a value of the dgraph generated API key
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Dg-Auth': process.env.dgraphApiKey,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient() {
  /* https://www.apollographql.com/docs/react/networking/authentication/
  
  Links can be chained together: the first link handles errors, the second link adds a header for auth, 
  the third link sends the operation to its destination. The server's response is passed back up each link
  in reverse order*/
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink, splitLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
