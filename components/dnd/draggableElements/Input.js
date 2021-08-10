import styled from 'styled-components';

export const Input = ({ style, value, labelStyle }) => {
  const StyledInput = styled.input`
    ${style}
  `;

  const StyledInputLabel = styled.span`
    ${labelStyle}
  `;

  return (
    <>
      <StyledInputLabel>{value}</StyledInputLabel>
      <StyledInput />
    </>
  );
};
