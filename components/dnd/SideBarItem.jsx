import React from 'react';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/styles';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SmartButtonIcon from '@material-ui/icons/SmartButton';
import InputIcon from '@material-ui/icons/Input';
import ImageIcon from '@material-ui/icons/Image';

import { greyScheme } from '../util/colorPallete'
import H1Icon from '../util/Icons/H1Icon';
import H2Icon from '../util/Icons/H2Icon';

const useStyles = makeStyles({
  sideBarContainer: {
    flexGrow: 1,
    width: '50px',
    margin: '10px',
  },
  sideBarItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: greyScheme.darkestGray,
  },
});

const SideBarItem = ({ data }) => {
  const { component, type } = data;
  const classes = useStyles();

  const [{ opacity }, drag] = useDrag({
    item: data,
    type: type,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const componentElements = {
    'Text': <TextFieldsIcon />,
    'Input': <InputIcon />,
    'Button': <SmartButtonIcon />,
    'Image': <ImageIcon />,
    'H1': <H1Icon />,
    'H2': <H2Icon />
  }

  return (
    <div className={classes.sideBarContainer}>
      <div className={classes.sideBarItem} ref={drag} style={{ opacity }}>
        {componentElements[component.type]}
        <div>{data.component.type}</div>
      </div>
    </div>
  );
};
export default SideBarItem;
