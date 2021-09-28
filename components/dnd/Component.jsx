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

  const [{ isDragging }, drag] = useDrag({
    item: { id: data.id, path },
    type: COMPONENT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  if (!component) return <div>Component not found in the database</div>

  let { src = '', style = '', type = 'Button', value = 'Test', containerStyle = '' } = component;
  
  let cssString = css`
    ${previewMode ? 'border: hidden' : 'border: 1px dashed black;'}
    ${containerStyle}
  `;

  const elementComponents = {
    'Button': <Button style={style} value={value} />, 
    'Input': <Input style={style} value={value} />,
    'H1': <H1 style={style} value={value} />,
    'H2': <H2 style={style} value={value} />,
    'Image': <Image style={style} alt={value} value={value} src={src} />,
    'Text': <Text style={style} value={value} />
  }

  return (
    <StyledContainer ref={ref} cssString={cssString}>
      <div onClick={() => setShowEditor(component)}>{elementComponents[type]}</div>
    </StyledContainer>
  );
};
export default Component;
