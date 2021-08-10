import styled, { css } from 'styled-components';

const StyledInput = styled.input`
  ${(props) => props.cssString};
`;

const StyledInputLabel = styled.span`
  ${(props) => props.cssString};
`;

export const Input = ({ style, value, labelStyle }) => {
  const cssString = css`
    ${style}
  `;

  const cssStringLabel = css`
    ${labelStyle}
  `;

  return (
    <>
      <StyledInputLabel cssString={cssStringLabel}>{value}</StyledInputLabel>
      <StyledInput cssString={cssString} />
    </>
  );
};
