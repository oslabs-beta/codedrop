import React from 'react';
import { Provider } from 'next-auth/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import Head from 'next/head';

// Stying imports
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../components/layout';
import '../styles/globals.css';
import 'codemirror/lib/codemirror.css'

function MyApp(props) {

  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>CodeDrop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider session={pageProps.session}>
          <Layout>
            <DndProvider backend={HTML5Backend}>
              <CssBaseline />
              <Component {...pageProps} />
            </DndProvider>
          </Layout>
        </Provider>
      </ThemeProvider>  
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
