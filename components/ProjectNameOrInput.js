import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { RiFileEditLine, RiSaveLine } from 'react-icons/ri';
import { useSession } from 'next-auth/client';

const useStyles = makeStyles({
  newProjectName: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 16,
    // color: '#bf7472',
  },
  projectNameContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    fontSize: '1.9rem',
    padding: '4',
    appearance: 'none',
  },
});

// this component selectively renders the project name or an input to change the name, in [projectId].js
const ProjectNameOrInput = (props) => {
  const [session] = useSession();
  const classes = useStyles();
  const { active, blur, doubleClick, inputChange, value, projectId, router } = props;

  return (
    <div className={classes.newProjectName}>
      {active ? (
        <div>
          <input
            value={value}
            onChange={inputChange}
            onBlur={blur}
            autoFocus
            className={classes.input}
          />
          <RiSaveLine style={{ height: '.75em' }} onClick={blur} />
        </div>
      ) : (
        <div onDoubleClick={doubleClick} className={classes.projectNameContainer}>
          {value}
          <RiFileEditLine style={{ height: '.75em' }} onClick={doubleClick} />
          {!session && (
            <RiSaveLine
              style={{ height: '.75em' }}
              onClick={() => router.push({ pathname: '/signin', query: { projectId } })}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectNameOrInput;
