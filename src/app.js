import React, { lazy, Suspense, useEffect, useContext, useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom'
import firebase from 'services/firebase'
import { AuthContext } from 'context/auth'
import PropTypes from 'prop-types'

const MainPage = lazy(() => import('pages/Main'))
const Login = lazy(() => import('pages/Login'))

const App = ({ location }) => {
  const { userInfo, setUserInfo, Logout } = useContext(AuthContext)
  const { isUserLoggedIn } = userInfo

  const [didCheckUserLogged, setCheckUserLogged] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userData) => {
      setUserInfo({
        isUserLoggedIn: !!userData,
        user: userData,
      })
      setCheckUserLogged(true)
    })

    window.logout = Logout
  }, [Logout, setUserInfo])

  if (!didCheckUserLogged) return <LinearProgress />

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Redirect to='/' />
  }
  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Redirect to='/login' />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
}
export default App
