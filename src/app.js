import React, { lazy, Suspense, useEffect, useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom'
import firebase from 'services/firebase'
import PropTypes from 'prop-types'

import{ HOME, LOGIN } from 'routes'
import useAuth from 'hooks/Auth'

const MainPage = lazy(() => import('pages/Main'))
const Login = lazy(() => import('pages/Login'))

const App = ({ location }) => {
  const { userInfo, setUserInfo } = useAuth();
  const { isUserLoggedIn } = userInfo

  const [didCheckUserLogged, setCheckUserLogged] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userData) => {
      setUserInfo({
        isUserLoggedIn: !!userData,
        user: userData && {
          ...userData,
          firstName: userData.displayName.split(' ')[0]
        },
      })
      setCheckUserLogged(true)
    })
  }, [setUserInfo])

  if (!didCheckUserLogged) return <LinearProgress />

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }
  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />
  }

  console.log('user',userInfo)
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  location: PropTypes.object.isRequired,
}
export default App
