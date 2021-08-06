import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Editor from '../components/Editor';

const useStyles = makeStyles((theme) => ({
  pane: {
    height: '45vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  codeVisual: {
    height: '30vh',
    margin: '10px',
    border: '1px solid lightGray',
    borderRadius: '5px'
  }
}));

export default function Test() {
  const router = useRouter();
  const classes = useStyles();
  const [session, loading] = useSession();
  const [js, setJs] = useState('');
  const [css, setCss] = useState('');
  const [html, setHtml] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        <html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [js, css, html]);

  if (loading) return null;

  if (!loading && !session) {
    router.push('/api/auth/signin');
    return <p>Redirecting to Login</p>;
  }

  return (
    <div>
      <div className={classes.pane}>
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
      </div>
      <div className={classes.codeVisual}>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
