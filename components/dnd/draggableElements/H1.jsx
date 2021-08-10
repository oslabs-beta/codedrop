import styled from 'styled-components';

export const H1 = ({ style, value }) => {
  const StyledH1 = styled.h1`
    ${style}
  `;

  return <StyledH1>{value}</StyledH1>;
};
