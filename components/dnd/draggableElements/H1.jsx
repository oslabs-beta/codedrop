import styled, { css } from 'styled-components';

const StyledH1 = styled.h1`
  ${(props) => props.cssString};
`;

export const H1 = ({ style, value }) => {
  const cssString = css`
    ${style}
  `;

  return <StyledH1 cssString={cssString}>{value}</StyledH1>;
};
