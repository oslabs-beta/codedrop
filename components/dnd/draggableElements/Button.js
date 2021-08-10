import styled from 'styled-components';

const defaultData = {
  label: 'Click me!',
  style: `display: inline-block;
color: palevioletred;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
display: block;`,
};

export const Button = ({ style, setStyle, value, setValue }) => {
  if (!style) setStyle(defaultData.style);
  if (!value) setValue(defaultData.label);

  const StyledButton = styled.button`
    ${style}
  `;

  return <StyledButton>{value}</StyledButton>;
};
