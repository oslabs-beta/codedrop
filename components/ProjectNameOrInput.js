import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  newProjectName: {
    fontSize: '30px',
    textAlign: 'center',
    color: '#bf7472',
  },
});

// this component selectively renders the project name or an input to change the name, in [projectId].js 
const ProjectNameOrInput = ( props ) => {
  const classes = useStyles();

  return (
    <div className={classes.newProjectName}>
        {
        props.active ? 
            <input value={props.value} onChange={props.inputChange} onBlur={props.blur} autoFocus/> 
            :
            <div onDoubleClick={props.doubleClick}>
                {props.value}
            </div>       
        }
    </div>
)
}

export default ProjectNameOrInput;