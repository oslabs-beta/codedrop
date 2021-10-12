import { makeStyles } from '@material-ui/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Typography } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import CodeDrawer from './CodeDrawer'
import SideBarItem from './dnd/SideBarItem'
import { SIDEBAR_ITEMS } from './dnd/constants'
import { greyScheme } from './util/colorPallete'
import { borderRadius } from '@material-ui/system'

const useStyles = makeStyles({
  sidebarPanel: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${greyScheme.lighterGray}`,
  },
  sidebarItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '250px',
    padding: '10px',
  },
  sidebarPreview: {
    paddingLeft: 20,
    paddingTop: 50,
  },
  sidebarPreviewToggle: {
    borderRadius: 4,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 2,
    backgroundColor: '#455A64',
    color: '#FFFFFF',
    width: '100%',
    marginRight: 10,
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    '&:hover': {
      backgroundColor: '#90A4AE',
    }
  },
  sidebarPreviewToggleSwitch: {
    marginLeft: 40,
  },
  formControlLabel: {
    textTransform: 'uppercase',
    fontWeight: 500,
    alignItems: 'center',
    fontSize: 14,
  },
  sidebarViewCode: {
    paddingLeft: 20,
    paddingTop: 50,
  }
})

const SidebarPanel = ({ previewMode, setPreviewMode, components, layout }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidePanel}>
    <div className={classes.sidebarItems}>
      {Object.values(SIDEBAR_ITEMS).map((sideBarItem) => (
        <SideBarItem key={sideBarItem.id} data={sideBarItem} />
      ))}
      </div>
      <div className={classes.sidebarPreview}>
        <FormControlLabel 
          className={classes.sidebarPreviewToggle}
          control={
            <Switch
              className = {classes.sidebarPreviewToggleSwitch}
              checked={previewMode}
              onChange={() => setPreviewMode(!previewMode)}
              name='previewMode'
              color='primary'
            />
          }
          label={<Typography className={classes.formControlLabel}>preview</Typography>}
        />
      </div>
      <div className={classes.sidebarViewCode}>
        <CodeDrawer 
          components={components}
          layout={layout}
        />
      </div>
    </div>
  );
};

export default SidebarPanel;
