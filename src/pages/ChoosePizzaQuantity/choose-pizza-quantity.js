import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Typography,
  Input as MaterialInput,
  Button
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { HOME, CHECKOUT } from 'routes'
import { Link } from 'react-router-dom'

// COMPONENTS
import Content from 'components/Content'
import HeaderContent from 'components/HeaderContent'
import Footer from 'components/Footer'

// CONTEXT
import useOrder from 'hooks/Order'

const ChoosePizzaQuantity = ({ location }) => {
  const [quantity, setQuantity] = useState(1);
  const { addPizzaToOrder } = useOrder();
  const { state } = location;

  if(!state){
    return <Redirect to={HOME} />
  }

  const addPizza = () => {
    addPizzaToOrder({
      ...state,
      quantity
    })
  }

  const handleChange = (e) => {
    if(e.target.value < 1) return;
    setQuantity(e.target.value);
  }

  return (
    <>
      <Content>
        <HeaderContent>
        <Typography variant="h4" gutterBottom>
            Quantas pizzas você gostaria <br />
            de pedir com esses sabores?
          </Typography>
        </HeaderContent>

        <MainContent>
          <Input value={quantity} onChange={handleChange} />

          <ButtonAddPizza onClick={addPizza}>
            Adicionar e <br/> montar outra
          </ButtonAddPizza>
        </MainContent>
      </Content>
      <Footer buttons={
        {
          action: {
            to: CHECKOUT,
            children: 'Finalizar',
            onClick: addPizza
            },
          back: { children: 'Mudar sabores'}
        }}
      />
    </>
  )
}

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

const Input = styled(MaterialInput).attrs({
  type: 'number',
  autoFocus: true,
})`
  & input {
    font-size: 80px;
    width: 150px;
    padding: 10px;
    text-align: center;
  }

  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

const ButtonAddPizza = styled(Button).attrs({
  color: 'secondary',
  component: Link,
  to: HOME,
  variant: 'contained'
})`
  && {
    text-align: center;
  }
`

export default ChoosePizzaQuantity
