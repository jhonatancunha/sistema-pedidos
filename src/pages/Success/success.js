import React from 'react'
import styled from 'styled-components'
import { HOME } from 'routes'
import { Link, Redirect } from 'react-router-dom'

// MATERIAL-IU
import {
  Button,
  Container,
  Divider as MaterialDivider,
  Typography,
  Paper
} from '@material-ui/core'

// COMPONENTS
import Content from 'components/Content'
import OrderInfo from 'components/OrderInfo'
import Footer from 'pages/Checkout/footer-checkout'

// CONTEXT
import useAuth from 'hooks/Auth'
import useOrder from 'hooks/Order'

const Success = ({ history }) => {
  const { userInfo } = useAuth();
  const { order } = useOrder();


  if(!Boolean(Object.keys(order.address).length) || order.phone === ''){
    return <Redirect to={HOME} />
  }

  return (
    <>
    <Content>
      <WrapperHeader>
        <Typography variant='h4' gutterBottom>Pronto {userInfo.user.firstName}!</Typography>
        <Typography align='center'>
          Seu pedido será entregue no endreço escolhido em <br />
          <b>45 a 60 minutos =)</b>
        </Typography>
      </WrapperHeader>

      <Container maxWidth='sm'>
        <PaperContainer>
          <Typography variant='h6'>Seu pedido:</Typography>
          <OrderInfo />

          <Divider />
          <Typography variant='h6'>Endereço para a entrega:</Typography>
          <Typography>
            {order.address.address},
            {' nº '}{order.address.number},
            {order.address.complement}<br />
            Bairro: {order.address.district}<br />
            CEP: {order.address.code}<br />
            {order.address.city}/{order.address.state}
          </Typography>

          <Divider />
          <Typography variant='h6'>Telefone para contato:</Typography>
          <Typography>
            {order.phone}
          </Typography>
        </PaperContainer>
      </Container>
    </Content>

    <Footer justifyContent='center'>
      <Button
        color='secondary'
        component={ Link }
        to={ HOME }
        size= 'large'
      >
        {'<'} VOLTAR PARA A PÁGINA INICIAL
      </Button>
    </Footer>
    </>
  )
}

const WrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const PaperContainer = styled(Paper)`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

const Divider = styled(MaterialDivider)`
  && {
    margin: ${({ theme }) => theme.spacing(3,0)};
  }
`

export default Success
