import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import NextDocument from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import theme from '../public/theme';


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Added to handle SSR with material UI and styled components ex. https://javascript.plainenglish.io/ssr-with-next-js-styled-components-and-material-ui-b1e88ac11dfa
MyDocument.getInitialProps = async (ctx) => {
  const styledComponentSheet = new StyledComponentSheets();
  const materialUiSheets = new MaterialUiServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {materialUiSheets.getStyleElement()}
        {styledComponentSheet.getStyleElement()}
      </React.Fragment>,
    ],
  };
};
