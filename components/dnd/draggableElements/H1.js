import styled from 'styled-components';

const defaultData = {
  label: 'Heading 1',
  style: `
    display: inline-block;
    color: palevioletred;
    margin-bottom: .25em;
    display: block;
  `,
};

export const H1 = () => {
  const StyledH1 = styled.h1`
    ${defaultData.style}
  `;

  return <StyledH1>{defaultData.label}</StyledH1>;
};
