import React, { createContext, useCallback, useState } from 'react'
import firebase from 'services/firebase'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

const Auth = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  })

  const SignIn = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }, [])

  const Logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserInfo({
          isUserLoggedIn: false,
          user: null,
        })
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        Logout,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Auth
