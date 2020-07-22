import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import {
  Typography,
  Card as MaterialCard,
  Grid,
} from '@material-ui/core'
import { HOME, CHOOSE_PIZZA_QUANTITY } from 'routes'



// UTILS
import singularOrPlural from 'utils/singularOrPlural'
import toMoney from 'utils/to-money'
import useCollection from 'hooks/Firebase'

// COMPONENTS
import CardActionArea from 'components/CardLink'
import Content from 'components/Content'
import Divider from 'components/Divider'
import HeaderContent from 'components/HeaderContent'
import PizzaGrid from 'components/PizzaGrid'
import Footer from 'components/Footer'

function ChoosePizzaFlavours({ location }) {
  const [checkboxes, setCheckboxes] = useState(() => ({}))
  const pizzaFlavours = useCollection('pizzasFlavours')


  if (!location.state) return <Redirect to={HOME} />
  const { pizzaSize } = location.state

  const handleChangeCheckBox = (id) => (e) => {
    if(checkboxChecked(checkboxes).length === pizzaSize.flavours
        && e.target.checked === true
      ) {
      return
    }
    setCheckboxes(checkboxes => ({
      ...checkboxes,
      [id]: e.target.checked
    }))
  }


  return (
    <>
    <Content>
      <HeaderContent>
        <Typography variant="h4" gutterBottom>
          Escolha até {pizzaSize.flavours} {' '} {singularOrPlural(pizzaSize.flavours, 'sabores', 'sabor')}!
        </Typography>
      </HeaderContent>

      <PizzaGrid>
        {pizzaFlavours.map((pizza) => (
          <Grid item key={pizza.id} xs align="center">
            <Card checked={Boolean(checkboxes[pizza.id])}>
              <Label>
                <CheckBox
                  checked={Boolean(checkboxes[pizza.id])}
                  onChange={handleChangeCheckBox(pizza.id)}
                  />

                <Img src={pizza.image} alt={pizza.name} />

                <Divider />

                <Typography gutterBottom>
                  {pizza.name}
                </Typography>
                <Typography variant='h5' gutterBottom>
                  {toMoney(pizza.value[pizzaSize.id])}
                </Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzaGrid>
    </Content>

    <Footer buttons={{
      back: { children: 'Mudar tamanho' },
      action: {
        to: {
        pathname: CHOOSE_PIZZA_QUANTITY,
        state: {
          pizzaSize,
          pizzaFlavours: getFlavoursNameAndID({ checkboxes, pizzaFlavours})
        }
      },
        children: 'Avançar',
      },
    }} />
    </>
  )
}

function getFlavoursNameAndID({ checkboxes, pizzaFlavours }) {
  return Object.entries(checkboxes).filter(
    ([, value]) => Boolean(value)
  ).map(([id]) => ({
    id,
    name: pizzaFlavours.find((flavour) => flavour.id === id).name
  }))
}

function checkboxChecked (checkboxes) {
  return Object.values(checkboxes).filter(Boolean)
}

const Card = styled(MaterialCard)`
  && {
    border: 2px solid transparent;
    border-color: ${({ checked, theme }) => checked ? theme.palette.secondary.light : ''};
  }
`

const Label = styled(CardActionArea).attrs({
  component: 'label'
})``

const CheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

const Img = styled.img`
  width: 200px;
  padding: 20px;
`

export default ChoosePizzaFlavours
