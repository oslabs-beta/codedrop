import styled from 'styled-components';

const defaultData = {
  label: 'Input Label',
  style: `display: inline-block;
color: palevioletred;
font-size: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;==
border-radius: 3px;
margin-top: .25em;
margin-bottom: .25em;
display: block;`,
  labelStyle: `
    display: inline-block;
    color: palevioletred;
    margin-bottom: .25em;
    font-size: 1em;
    display: block;
  `,
};

export const Input = ({ style, setStyle, value, setValue }) => {
  if (!style) setStyle(defaultData.style);
  if (!value) setValue(defaultData.label);

  const StyledInput = styled.input`
    ${style}
  `;

  const StyledInputLabel = styled.span`
    ${defaultData.labelStyle}
  `;

  return (
    <>
      <StyledInputLabel>{value}</StyledInputLabel>
      <StyledInput />
    </>
  );
};
