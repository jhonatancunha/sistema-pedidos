import styled from 'styled-components'
import { CardActionArea as MaterialCardActionArea, } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CardActionArea = styled(MaterialCardActionArea).attrs({
  component: Link
})`
  && {
    padding: ${({ theme }) => theme.spacing(3,0)};
    min-width: 250px;
    display: flex;
    flex-direction: column;
  }
`

export default CardActionArea
