import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled, { css } from 'styled-components';

import { COMPONENT } from './constants';

import { Button } from './draggableElements/Button';
import { Input } from './draggableElements/Input';
import { H1 } from './draggableElements/H1';
import { H2 } from './draggableElements/H2';
import { Image } from './draggableElements/Image';
import { Text } from './draggableElements/Text';

const StyledContainer = styled.div`
  ${(props) => props.cssString};
`;

const Component = ({ data, components, path, previewMode, setShowEditor }) => {
  const ref = useRef(null);

  const component = components.find(c => c.id === data.id);
  
  let cssString = css`
    ${previewMode ? 'border: hidden' : 'border: 1px dashed black;'}
    ${component?.containerStyle || ``}
  `;

  const [{ isDragging }, drag] = useDrag({
    item: { id: data.id, path },
    type: COMPONENT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  if (!component) return <div>Component not found in the database</div>

  let { src = '', style = '', type = 'Button', value = 'Test', containerStyle = '' } = component;

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
    if (type === 'H2') {
      return <H2 style={style} value={value} />;
    }
    if (type === 'Image') {
      return <Image style={style} alt={value} value={value} src={src} />;
    }
    if (type === 'Text') {
      return <Text style={style} value={value} />;
    }
  };

  return (
    <StyledContainer ref={ref} cssString={cssString}>
      <div onClick={() => setShowEditor(component)}>{componentToRender()}</div>
    </StyledContainer>
  );
};
export default Component;
