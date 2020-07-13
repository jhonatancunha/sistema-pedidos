import React, { useContext } from 'react'
import { AuthContext } from 'context/auth'

// STYLE
import { Grid } from '@material-ui/core'
import { Container, GitHubButton } from './style'

const Login = () => {
  const { SignIn } = useContext(AuthContext)

  return (
    <Container>
      <Grid container direction='row' justify='center'>
        <Grid item>
          <h1>Sistema de Pedidos</h1>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={SignIn}>Entrar com Github</GitHubButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
