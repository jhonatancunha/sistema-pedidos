import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const Container = styled.div`
  padding: 40px;
`

export const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true,
})`
  & {
    font-size: 1.2em;
    padding: 10px;
    text-transform: none;
    max-width: 480px;
  }
`
