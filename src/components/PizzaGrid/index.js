import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const PizzaGrid = styled(Grid).attrs({
  container: true,
  spacing: 5
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

export default PizzaGrid
