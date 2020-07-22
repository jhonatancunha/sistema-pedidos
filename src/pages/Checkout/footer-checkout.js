import React from 'react'
import styled from 'styled-components'

// COMPONENTS
import Footer from 'components/Footer'

const FooterCheckout = ({ children, justifyContent }) => {
  return (
  <Footer>
    <FooterContainer justifyContent={justifyContent}>
        {children}
    </FooterContainer>
  </Footer>
  )
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'flex-end'};
`


export default FooterCheckout
