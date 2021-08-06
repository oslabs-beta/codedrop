import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';

// CodeMirror workaround for NextJS https://dev.to/glowtoad123/using-codemirror-in-nextjs-without-the-navigator-error-opi
const CodeMirror = dynamic(
  () => {
    import('codemirror/lib/codemirror.css');
    import('codemirror/theme/material.css');
    import('codemirror/mode/xml/xml');
    import('codemirror/mode/javascript/javascript');
    import('codemirror/mode/css/css');
    return import('react-codemirror');
  },
  { ssr: false }
);

const useStyles = makeStyles((theme) => ({
  editorContainer: {
    height: '50vh',
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '.5rem',
  },
  editorTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '.5rem',
  },
}));

export default function Editor(props) {
  const classes = useStyles();
  const { displayName, language, value, onChange } = props;

  return (
    <div className={classes.editorContainer}>
      <div className={classes.editorTitle}>
        {displayName}
      </div>
      {
        <CodeMirror
          onChange={onChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true,
          }}
        />
      }
    </div>
  );
}
