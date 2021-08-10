import styled from 'styled-components';

const defaultData = {
  label: 'Heading 1',
  style: `display: inline-block;
color: palevioletred;
margin-bottom: .25em;
display: block;`,
};

export const H1 = ({ style, setStyle, value, setValue }) => {
  if (!style) setStyle(defaultData.style);
  if (!value) setValue(defaultData.label);

  const StyledH1 = styled.h1`
    ${style}
  `;

  return <StyledH1>{value}</StyledH1>;
};
