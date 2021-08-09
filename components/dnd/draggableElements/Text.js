import styled from 'styled-components';

const defaultData = {
  label: 'Text',
  style: `
    display: inline-block;
    color: palevioletred;
    margin-bottom: .25em;
    display: block;
  `,
};

export const Text = () => {
  const StyledText = styled.span`
    ${defaultData.style}
  `;

  return <StyledText>{defaultData.label}</StyledText>;
};
