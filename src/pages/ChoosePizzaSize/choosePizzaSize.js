import React from 'react'
import styled from 'styled-components'
import {
  Card,
  Typography,
  Grid,
} from '@material-ui/core'
import useAuth from 'hooks/Auth'

// ROUTES
import{ CHOOSE_PIZZA_FLAVOURS } from 'routes'

// UTILS
import singularOrPlural from 'utils/singularOrPlural'
import useCollection from 'hooks/Firebase'

// COMPONENTS
import PizzaGrid from 'components/PizzaGrid'
import Divider from 'components/Divider'
import CardActionArea from 'components/CardLink'
import Content from 'components/Content'

const ChoosePizzaSize = () => {
  const { userInfo } = useAuth();
  const pizzasSizes = useCollection('pizzaSize')

  return (
    <Content>
      <Grid container direction="column" align="center">
        <Typography variant="h3" gutterBottom>
          Qual sua escolha de hoje, {userInfo.user.firstName}?
        </Typography>

        <Typography variant="h4" gutterBottom>
          Escolha o tamanho da pizza!
        </Typography>

      </Grid>
      <PizzaGrid >
        {pizzasSizes.map((pizza) => (
          <Grid item key={pizza.id} xs align="center">
            <Card>
              <CardActionArea to={{
                pathname: CHOOSE_PIZZA_FLAVOURS,
                state: {
                  pizzaSize: pizza
                }
              }}>
                  <Pizza>
                    <PizzaText variant="h5">{pizza.size}cm</PizzaText>
                  </Pizza>

                  <Divider />

                  <Typography variant='h6'>{pizza.name}</Typography>
                  <Typography>
                    {pizza.slices}
                    {' '}{singularOrPlural(pizza.slices, 'fatias', 'fatia')},
                    {' '}{pizza.flavours}
                    {' '}{singularOrPlural(pizza.flavours, 'sabores', 'sabor')}.
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </PizzaGrid>
    </Content>
  )
}



const Pizza = styled.div`
  display: flex;
  background: ${({ theme }) => theme.palette.common.white};
  z-index: 1;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.grey.A100};
  position: relative;

  &::before,
  &::after{
    content: '';
    background: ${({ theme }) => theme.palette.grey.A100};
    position: absolute;
    transform: rotate(45deg);
  }

  &::before{
    width: 160px;
    height: 1px;
  }
  &::after{
    height: 160px;
    width: 1px;
  }
`
const PizzaText = styled(Typography)`
  && {
    background: ${({ theme }) => theme.palette.common.white};
    border-radius: 50%;
    z-index: 1;
    padding: 10px;
  }
`

export default ChoosePizzaSize
