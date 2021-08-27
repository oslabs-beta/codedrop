import styled, { css } from 'styled-components';

const StyledImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.value,
}))`
  ${(props) => props.cssString};
`;

export const Image = ({ style, value, src }) => {
  const cssString = css`
    ${style}
  `;

  return <StyledImage cssString={cssString} value={value} src={src} />;
};
