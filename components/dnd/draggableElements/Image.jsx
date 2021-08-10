import styled from 'styled-components';

export const Image = ({ style, value, src }) => {
  const StyledImage = styled.img.attrs({
    src,
    alt: value,
  })`
    ${style}
  `;

  return <StyledImage />;
};
