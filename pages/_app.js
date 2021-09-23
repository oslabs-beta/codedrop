import React, { Fragment, useEffect, useState } from 'react';

import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

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

Amplify.configure({ ...awsExports, ssr: true });

function MyApp(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(null);
  const [user, setUser] = useState(null);
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  const pathsToExcludeHeaderFooter = ['/signin'];
  const showHeaderFooter = !pathsToExcludeHeaderFooter.includes(router.pathname);

  useEffect(() => {
    // Remove the server-side injected CSS.
    // if (!loading) {
      return onAuthUIStateChange((nextAuthState, authData) => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
        setAuthState(nextAuthState);
        setUser(authData);
      });
    // }
  }, []);

  const authenticated = authState === AuthState.SignedIn && user;

  return (
    <Fragment>
      <Head>
        <title>CodeDrop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          {authenticated && (
            <>
              {showHeaderFooter && (
                <Layout>
                  <DndProvider backend={HTML5Backend}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </DndProvider>
                </Layout>
              )}
              {!showHeaderFooter && <Component {...pageProps} />}
            </>
          )}
          {!authenticated && (
            <AmplifyAuthenticator usernameAlias="email">
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                  {
                    type: 'email',
                    label: 'Custom Email Label',
                    placeholder: 'Custom email placeholder',
                    inputProps: { required: true, autocomplete: 'username' },
                  },
                  {
                    type: 'password',
                    label: 'Custom Password Label',
                    placeholder: 'Custom password placeholder',
                    inputProps: { required: true, autocomplete: 'new-password' },
                  },
                ]}
              />
              <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
          )}
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
