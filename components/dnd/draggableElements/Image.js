import styled from 'styled-components';

const defaultData = {
  label: 'Alt label',
  style: `width: 200px;
height: 300px;
display: block;`,
  src: 'https://picsum.photos/200/300?random=1',
};

export const Image = ({ style, setStyle, value, setValue, src, setSrc }) => {
  if (!style) setStyle(defaultData.style);
  if (!value) setValue(defaultData.label);
  if (!src) setSrc(defaultData.src);

  const StyledImage = styled.img.attrs({
    src: defaultData.src,
    alt: value,
  })`
    ${style}
  `;

  return <StyledImage />;
};
