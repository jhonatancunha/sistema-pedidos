import React from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar,
} from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import { CHECKOUT, CONFIRMATION } from 'routes'

import HeaderCommon from './header-common'
import HeaderCheckout from './header-checkout'

const Header = () => (
  <AppBar>
    <ToolbarContainer>
      <Switch>
        <Route path={CHECKOUT} exact component={HeaderCheckout} />
        <Route path={CONFIRMATION} exact component={HeaderCheckout} />
        <Route component={HeaderCommon} />
      </Switch>
    </ToolbarContainer>
  </AppBar>
)

const ToolbarContainer = styled(Toolbar)`
  && {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
    margin: 0 auto;
  }

  div{
    display: flex;
    align-items: center;
  }
`

export default Header
