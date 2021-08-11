import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ROW } from './constants';
import DropZone from './DropZone';
import Column from './Column';

const Row = ({ data, components, handleDrop, path, previewMode, setShowEditor }) => {
  const ref = useRef(null);

  const style = { borderStyle: previewMode ? 'hidden' : 'dashed' };

  const [{ isDragging }, drag] = useDrag({
    item: {
      id: data.id,
      children: data.children,
      path,
    },
    type: ROW,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
        previewMode={previewMode}
        setShowEditor={setShowEditor}
      />
    );
  };

  return (
    <div ref={ref} style={{ ...style, opacity }} className="base draggable row">
      <div className="columns">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
