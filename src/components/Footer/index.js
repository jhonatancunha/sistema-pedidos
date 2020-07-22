import React from 'react'
import styled from 'styled-components'

// MATERIAL UI
import { Container } from '@material-ui/core'

// COMPONENT
import FooterWithOrderAndButtons from './footer-with-order-and-buttons'

const Footer = ({ children, ...props }) => (
  <Wrapper>
    <Container>
      {children
        ? children
        : <FooterWithOrderAndButtons {...props} />
      }
    </Container>
  </Wrapper>
)

const Wrapper = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`

export default Footer
