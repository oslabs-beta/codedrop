import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from './constants';

import { Button } from './draggableElements/Button';
import { Input } from './draggableElements/Input';
import { H1 } from './draggableElements/H1';
import { Image } from './draggableElements/Image';
import { Text } from './draggableElements/Text';

let containerStyle = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const Component = ({ data, components, path, previewMode, setShowEditor }) => {
  const ref = useRef(null);

  const component = components[data.id];
  const { src, style, type, value } = component;

  containerStyle.borderStyle = previewMode ? 'hidden' : 'dashed';

  const [{ isDragging }, drag] = useDrag({
    item: { id: data.id, path },
    type: COMPONENT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const componentToRender = () => {
    if (type === 'Button') {
      return <Button style={style} value={value} />;
    }
    if (type === 'Input') {
      return <Input style={style} value={value} />;
    }
    if (type === 'H1') {
      return <H1 style={style} value={value} />;
    }
    if (type === 'Image') {
      return <Image style={style} alt={value} value={value} src={src} />;
    }
    if (type === 'Text') {
      return <Text style={style} value={value} />;
    }
  };

  return (
    <div ref={ref} style={{ ...containerStyle, opacity }}>
      <div onClick={() => setShowEditor(component)}>{componentToRender()}</div>
    </div>
  );
};
export default Component;
