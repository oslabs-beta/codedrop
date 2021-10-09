import styled, { css } from 'styled-components';

const StyledText = styled.header`
  ${(props) => props.cssString};
`;

export const Header = ({ value, style }) => {
  const cssString = css`
    ${style}
  `;

  return <StyledText cssString={cssString}>{value}</StyledText>;
};
