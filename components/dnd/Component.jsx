import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled, { css } from 'styled-components';

import { COMPONENT } from './constants';

import { Button } from './draggableElements/Button';
import { Input } from './draggableElements/Input';
import { H1 } from './draggableElements/H1';
import { Image } from './draggableElements/Image';
import { Text } from './draggableElements/Text';

const StyledContainer = styled.div`
  ${(props) => props.cssString};
`;

const Component = ({ data, components, path, previewMode, setShowEditor }) => {
  const ref = useRef(null);

  const component = components[data.id];
  let { src, style, type, value, containerStyle } = component;

  let cssString = css`
    ${previewMode ? 'border: hidden' : 'border: 1px dashed black;'}
    ${containerStyle}
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
    <StyledContainer ref={ref} cssString={cssString}>
      <div onClick={() => setShowEditor(component)}>{componentToRender()}</div>
    </StyledContainer>
  );
};
export default Component;
