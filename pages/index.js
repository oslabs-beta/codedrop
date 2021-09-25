import SplashPage from '../components/SplashPage';
import { getSession } from 'next-auth/client';

export default function Home({ session }) {
  return <SplashPage session={session} />;
}

export async function getServerSideProps(context) {
  const sessionUser = await getSession(context);

  return {
    props: {
      session: sessionUser,
    },
  };
}
