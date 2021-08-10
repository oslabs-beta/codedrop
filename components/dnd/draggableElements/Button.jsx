import styled from 'styled-components';

export const Button = ({ style, value }) => {
  const StyledButton = styled.button`
    ${style}
  `;

  return <StyledButton>{value}</StyledButton>;
};
