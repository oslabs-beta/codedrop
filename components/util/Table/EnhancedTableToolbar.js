import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import initialData from '../../../components/dnd/initial-data';
import { PROJECT_MUTATION, ADD_USER, DELETE_PROJECT } from '../../../lib/apolloMutations';
import { PROJECTS_QUERY } from '../../../lib/apolloQueries';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import createNewProject from '../createNewProject';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftToolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
function EnhancedTableToolbar(props) {
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [updateProject] = useMutation(PROJECT_MUTATION);
  const router = useRouter();
  const classes = useStyles();
  const { numSelected, selected, username, rows, setRows } = props;

  const handleDeleteProjects = () => {
    selected.forEach((s) => deleteProject({ variables: { id: s } }));
    const rowsToKeep = rows.filter((r) => !selected.find((s) => s === r.id));
    setRows(rowsToKeep);
  };

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.leftToolbar}>
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            Projects
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete" onClick={() => handleDeleteProjects()}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => createNewProject(router, updateProject, username)}
      >
        New Project
      </Button>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
