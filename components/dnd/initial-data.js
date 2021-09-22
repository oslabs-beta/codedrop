import { ROW, COLUMN } from './constants';

const initialData =  {
  layout: [
    {
      type: ROW,
      id: 'row0',
      children: [
        {
          type: COLUMN,
          id: 'column0',
          children: [],
        },
      ],
    },
  ],
  components: {},
};

export default initialData;
