import React from 'react'
import styled from 'styled-components'
import singularOrPlural from 'utils/singularOrPlural'

// MATERIAL UI
import {
  IconButton,
  List,
  ListItem as MaterialListItem,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

import useOrder from 'hooks/Order'

const OrderInfo = ({ showOptions }) => {
  const { order, removePizzaFromOrder } = useOrder();

  return (
    <List>
    {order.pizzas.map((pizza, index) => {
      const { pizzaFlavours, pizzaSize, quantity } = pizza;
      const { name, slices, flavours } = pizzaSize;
      return (
        <ListItem key={pizza.id}>
          <Typography>
            <b>{quantity}</b> {' '}
            {singularOrPlural(quantity, 'pizzas', 'pizza')} <b>{name.toUpperCase()}</b> -
            {' '}({slices} {singularOrPlural(slices, 'fatias', 'fatia')},
            {' '}{flavours} {singularOrPlural(flavours, 'sabores', 'sabor')})

            <br />
            {singularOrPlural(flavours, 'Nos sabores', 'No sabor')} {' '}
            <b>{pizzaFlavours.map(({ name }) => name).join(', ')}</b>
          </Typography>

          {showOptions &&
            <IconButton
              onClick={() => removePizzaFromOrder(pizza.id)}
              title='Remover'
              color='secondary'
            >
              <Close />
            </IconButton>
          }
        </ListItem>
      )
    })}
  </List>
  )
}

const ListItem = styled(MaterialListItem)`
  display: flex;
  justify-content: space-between;
`

export default OrderInfo
