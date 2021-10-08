/* See the docks at next-auth.js.org/providers/email for an explanation on nextAuth and this file path */

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';

import firebase from '../../../firebase/clientApp';

const firestore = firebase.firestore();

export default NextAuth({
  providers: [
    // Passwordless / email sign in
    Providers.Email({
      server: {
        host: process.env.SENDGRID_SERVER,
        port: process.env.SENDGRID_PORT_TLS,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      },
      from: `CodeDrop <${process.env.SENDGRID_FROM}>`,
    }),
  ],
  adapter: FirebaseAdapter(firestore),
});
