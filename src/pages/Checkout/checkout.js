import React from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { CONFIRMATION, HOME } from 'routes'
import useOrder from 'hooks/Order'

// MATERIAL UI
import {
  Grid,
  Paper,
  Typography as UiTitle,
  Button
} from '@material-ui/core'

// COMPONENTS
import Content from 'components/Content'
import Footer from './footer-checkout'
import OrderInfo from 'components/OrderInfo'
import FormAddress from './form-address'

import PhoneField from './phoneField'

const Checkout = () => {
  const { order } = useOrder();

  if(!order.pizzas.length){
    return <Redirect to={HOME} />
  }

  return (
    <>
    <Content>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Typography variant='h6'>Qual endereço para a entrega?</Typography>

          <PaperContainer>
            <FormAddress />
          </PaperContainer>

          <Typography variant='h6'>Qual seu telefone?</Typography>
          <PaperContainer>
            <PhoneField />
          </PaperContainer>
        </Grid>

        <Grid container item  md={6} xs={12} direction='column'>
          <Typography variant='h6'>Informaçãoes do seu pedido</Typography>

          <PaperContainer>
            <OrderInfo showOptions={true} />
          </PaperContainer>
        </Grid>

      </Grid>
    </Content>

    <Footer>
      <Button
        variant= 'contained'
        color= 'primary'
        component={ Link }
        to={CONFIRMATION}
        onClick={() => console.log('clique')}
      >
        Confirmar dados
      </Button>
    </Footer>

    </>
  )
}


const Typography = styled(UiTitle)`
  && {
    text-align: left;
  }
`

const PaperContainer = styled(Paper).attrs({})`
  && {
    flex-grow: 1;
    margin-bottom: ${({ theme }) => theme.spacing(5)}px;
    padding:  ${({ theme }) => theme.spacing(2)}px;
  }
`

export default Checkout
