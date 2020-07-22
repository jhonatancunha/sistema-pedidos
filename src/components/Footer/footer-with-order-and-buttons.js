import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// MATERIAL UI
import {
  Grid,
  Typography,
  Button as MaterialButton
} from '@material-ui/core'

// CONTEXT
import useAuth from 'hooks/Auth'

// UTILS
import singularOrPlural from 'utils/singularOrPlural'

const FooterWithOtherAndButtons = ({ buttons, location, history }) => {
  const { userInfo } = useAuth();
  const { pizzaSize, pizzaFlavours } = location.state;

  return (
    <Grid container>
      <OrderContainer>
        <Typography>
          <b>{userInfo.user.firstName}, seu pedido é:</b>
        </Typography>
        <Typography>
          Pizza <b>{pizzaSize.name.toUpperCase()}</b> -
          {' '}({pizzaSize.slices}
            {' '}{singularOrPlural(pizzaSize.slices, 'fatias', 'fatia')},
          {' '}{pizzaSize.flavours}
          {' '}{singularOrPlural(pizzaSize.flavours, 'sabores', 'sabor')})
        </Typography>
        {pizzaFlavours &&
          <Typography>
            {singularOrPlural(pizzaSize.flavours, 'Nos sabores', 'No sabor')} {' '}
            <b>{pizzaFlavours.map(({ name }) => name).join(', ')}</b>
          </Typography>
        }

      </OrderContainer>
      <Grid item>
        <Button
          {...buttons.back}
          component='a'
          onClick={(e) => {
            e.preventDefault();
            history.goBack()
          }}
        />

        <Button
          component={Link}
          {...buttons.action}
          color="primary"
        />
      </Grid>
    </Grid>
  )
}

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  && {
    flex-grow: 1;
  }
`

const Button = styled(MaterialButton).attrs({
  variant: 'contained'
})`
  && {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default withRouter(FooterWithOtherAndButtons)
