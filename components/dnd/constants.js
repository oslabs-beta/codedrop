import shortid from 'shortid';

import { Button } from './draggableElements/Button';
import { Input } from './draggableElements/Input';
import { H1 } from './draggableElements/H1';
import { Image } from './draggableElements/Image';
import { Text } from './draggableElements/Text';

export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Text',
      content: Text(),
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Input',
      content: Input(),
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Button',
      content: Button(),
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'H1',
      content: H1(),
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Image',
      content: Image(),
    },
  },
];
