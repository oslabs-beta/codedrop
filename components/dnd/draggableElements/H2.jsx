import styled, { css } from 'styled-components';

const StyledH2 = styled.h2`
  ${(props) => props.cssString};
`;

export const H2 = ({ style, value }) => {
  const cssString = css`
    ${style}
  `;

  return <StyledH2 cssString={cssString}>{value}</StyledH2>;
};
