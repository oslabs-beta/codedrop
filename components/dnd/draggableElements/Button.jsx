import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  ${(props) => props.cssString};
`;

export const Button = ({ style, value }) => {
  const cssString = css`
    ${style}
  `;

  return <StyledButton cssString={cssString}>{value}</StyledButton>;
};
