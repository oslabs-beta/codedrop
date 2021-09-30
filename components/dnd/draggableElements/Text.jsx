import styled, { css } from 'styled-components'

const StyledText = styled.span`
  ${(props) => props.cssString};
`

export const Text = ({ value, style }) => {
  const cssString = css`
    ${style}
  `

  return <StyledText cssString={cssString}>{value}</StyledText>
}
