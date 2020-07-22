import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

export const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true,
})`
  && {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    padding: ${({ theme }) => theme.spacing(2)}px;;
    text-transform: none;
    max-width: 480px;
  }
`
