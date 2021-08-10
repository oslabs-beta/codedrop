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
  const [value, setValue] = useState(null);
  const [style, setStyle] = useState(null);
  const [src, setSrc] = useState(null);

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

  const component = components[data.id];

  const componentToRender = () => {
    if (component.type === 'Button') {
      return <Button style={style} setStyle={setStyle} value={value} setValue={setValue} />;
    }
    if (component.type === 'Input') {
      return <Input style={style} setStyle={setStyle} value={value} setValue={setValue} />;
    }
    if (component.type === 'H1') {
      return <H1 style={style} setStyle={setStyle} value={value} setValue={setValue} />;
    }
    if (component.type === 'Image') {
      return <Image style={style} setStyle={setStyle} alt={value} value={value} setValue={setValue} src={src} setSrc={setSrc} />;
    }
    if (component.type === 'Text') {
      return <Text style={style} setStyle={setStyle} value={value} setValue={setValue} />;
    }
  };

  return (
    <div ref={ref} style={{ ...containerStyle, opacity }}>
      <div>{previewMode ? `` : data.id}</div>
      <div onClick={() => setShowEditor({ id: data.id, style, setStyle, value, setValue })}>
        {console.log('style', style)}
        {componentToRender()}
      </div>
    </div>
  );
};
export default Component;
