import React, { Fragment, useEffect } from 'react';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

// Stying imports
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../public/theme';
import Layout from '../components/layout';
import '../styles/globals.css';
import 'codemirror/lib/codemirror.css';

function MyApp(props) {
  const router = useRouter();
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  const pathsToExcludeHeaderFooter = ['/signin'];
  const showHeaderFooter = !pathsToExcludeHeaderFooter.includes(router.pathname);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>CodeDrop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Provider session={pageProps.session}>
            {showHeaderFooter && (
              <Layout>
                <DndProvider backend={HTML5Backend}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </DndProvider>
              </Layout>
            )}
            {!showHeaderFooter && <Component {...pageProps} />}
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
