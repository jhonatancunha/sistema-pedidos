import React from 'react'
import styled from 'styled-components'
import { SUCCESS } from 'routes'
import { Link } from 'react-router-dom'

// MATERIAL-IU
import {
  Container,
  Button,
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

const Confirmation = () => {
  const { userInfo } = useAuth();
  const { sendOrder, order } = useOrder();

  return (
    <>
    <Content>
      <WrapperHeader>
        <Typography variant='h4'>Oi {userInfo.user.firstName} =)</Typography>
        <Typography>
          Confirme se está tudo certo
          com seu pedido antes de finalizar.
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
        variant='contained'
        color='primary'
        onClick={sendOrder}
        component={ Link }
        to={ SUCCESS }
        size= 'large'
      >
        Finalizar
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

export default Confirmation
