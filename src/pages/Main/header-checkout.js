import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const HeaderCheckout = () => {
  return (
    <Wrapper>
      <Typography variant='h6'>
        Sistema de Pedidos
      </Typography>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`

export default HeaderCheckout
