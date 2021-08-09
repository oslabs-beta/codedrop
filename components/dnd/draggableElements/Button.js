import styled from 'styled-components';

const defaultData = {
  label: 'Press me!',
  style: `
    display: inline-block;
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
  `,
};

export const Button = () => {
  const StyledButton = styled.button`
    ${defaultData.style}
  `;

  return <StyledButton>{defaultData.label}</StyledButton>;
};

