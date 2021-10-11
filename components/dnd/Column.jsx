import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COLUMN } from './constants';
import DropZone from './DropZone';
import Component from './Component';

const Column = ({ data, components, handleDrop, path, previewMode, setShowEditor }) => {
  const ref = useRef(null);

  const style = {
    borderRadius: 4,
    borderStyle: previewMode ? 'hidden' : 'dashed',
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      id: data.id,
      children: data.children,
      path,
    },
    type: COLUMN,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
        previewMode={previewMode}
        setShowEditor={setShowEditor}
      />
    );
  };

  return (
    <div ref={ref} style={{ ...style, opacity }} className="base draggable column">
      {data?.children?.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            {previewMode ? (
              ``
            ) : (
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
              />
            )}
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      }) || ``}
      {data?.children && (
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          isLast
        />
      ) || ``}
    </div>
  );
};
export default Column;
