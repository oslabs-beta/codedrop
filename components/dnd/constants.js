import shortid from 'shortid';

import { Button } from './draggableElements/Button'

export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

const h1 = () => <h1>Heading 1</h1>;

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'input',
      content: 'Some input',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Button',
      content: Button()
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'H1',
      content: h1(),
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'name',
      content: 'Some name',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'email',
      content: 'Some email',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'phone',
      content: 'Some phone',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'image',
      content: 'Some image',
    },
  },
];
