module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {

        gqlURI: process.env.GQL_URI, //pass through db URI
  },
};
