import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// just a variable
let apolloClient;

// 
const httpLink = new HttpLink({
  
  uri: "https://dawn-water.us-east-1.aws.cloud.dgraph.io/graphql",//process.env.gqlURI
      // headers: {
      //   "Access-Control-Allow-Origin" : "*",
      //   "Content-Type": "application/graphql",
      // },
      // fetchOptions:{
      //   mode: "no-cors"
      // }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
};


// function createApolloClient() {
//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     link: new HttpLink({
//       uri: 'https://withered-surf.us-east-1.aws.cloud.dgraph.io/graphql',//process.env.gqlURI
//       headers: {
//         'Access-Control-Allow-Origin' : '*',
//         "Content-Type": "application/json",
//       },
//       fetchOptions:{
//         mode: 'no-cors'
//       }
//     }),
//     cache: new InMemoryCache(),
//   })
// };

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
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}