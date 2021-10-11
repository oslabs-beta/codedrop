import styled, { css } from 'styled-components'

const StyledText = styled.h3`
  ${(props) => props.cssString};
`

export const H3 = ({ value, style }) => {
  const cssString = css`
    ${style}
  `

  return <StyledText cssString={cssString}>{value}</StyledText>
}
