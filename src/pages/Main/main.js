import React, { lazy, Suspense } from 'react'
import { withStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'

// ROUTES
import * as routes from 'routes'

// COMPONENTS
import Header from './header'
const ChoosePizzaSize = lazy(() => import ('pages/ChoosePizzaSize'))
const ChoosePizzaFlavour = lazy(() => import ('pages/ChoosePizzaFlavours'))
const ChoosePizzaQuantity = lazy(() => import('pages/ChoosePizzaQuantity'))
const Checkout = lazy(() => import('pages/Checkout'))
const Confirmation = lazy(() => import('pages/Confirmation'))
const Success = lazy(() => import('pages/Success'))

const MainPage = () => (
    <>
    <Header />
    <Spacer />

      <Suspense fallback="Loading...">
        <Switch>
          <Route path={routes.HOME} exact component={ChoosePizzaSize} />
          <Route path={routes.CHOOSE_PIZZA_FLAVOURS} component={ChoosePizzaFlavour} />
          <Route path={routes.CHOOSE_PIZZA_QUANTITY} component={ChoosePizzaQuantity} />
          <Route path={routes.CHECKOUT} exact component={Checkout} />
          <Route path={routes.CONFIRMATION} component={Confirmation} />
          <Route path={routes.SUCCESS} component={Success} />
         </Switch>
      </Suspense>
  </>
)

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))


export default MainPage
