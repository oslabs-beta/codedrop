import styled from 'styled-components';

export const Text = ({ value, style }) => {
  const StyledText = styled.span`
    ${style}
  `;

  return <StyledText>{value}</StyledText>;
};
