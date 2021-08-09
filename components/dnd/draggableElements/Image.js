import { Image as NextImage } from 'next';
import styled from 'styled-components';

const defaultData = {
  label: 'Alt label',
  style: `
    width: 200px;
    height: 300px;
    display: block;
  `,
  src: 'https://picsum.photos/200/300?random=1',
};

export const Image = () => {
  const StyledImage = styled.img.attrs({
    src: defaultData.src,
    alt: defaultData.label,
  })`
    ${defaultData.style}
  `;

  return <StyledImage />;
};
