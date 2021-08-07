import React from 'react';
import { useDrag } from 'react-dnd';

const SideBarItem = ({ data }) => {
  console.log('data', data)
  const [{ opacity }, drag] = useDrag({
    item: data,
    type: data.type, // PLACEHOLDER
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
