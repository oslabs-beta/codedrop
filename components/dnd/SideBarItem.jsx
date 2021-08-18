import React from 'react';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SmartButtonIcon from '@material-ui/icons/SmartButton';
import InputIcon from '@material-ui/icons/Input';
import ImageIcon from '@material-ui/icons/Image';

import { greyScheme } from '../util/colorPallete';

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

  return (
    <div className={classes.sideBarContainer}>
      <div className={classes.sideBarItem} ref={drag} style={{ opacity }}>
        {component.type === 'Text' && <TextFieldsIcon />}
        {component.type === 'Input' && <InputIcon />}
        {component.type === 'Button' && <SmartButtonIcon />}
        {component.type === 'Image' && <ImageIcon />}
        {component.type === 'H1' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z"
              fill="#000"
            />
          </svg>
        )}
        {component.type === 'H2' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"
              fill="#000"
            />
          </svg>
        )}
        <div>{data.component.type}</div>
      </div>
    </div>
  );
};
export default SideBarItem;
