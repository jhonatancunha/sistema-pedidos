import React, { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
  withStyles,
  Paper,
  Divider as MaterialDivider
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import styled from 'styled-components'
import { AuthContext } from 'context/auth'


const MainPage = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo ,Logout } = useContext(AuthContext)
  const userName = userInfo.user.displayName.split(' ')[0]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar>
      <ToolbarContainer>
        <h2>Sistema de Pedidos</h2>

        <div>
          <Typography color="inherit">Olá {userName} =)</Typography>
          <IconButton aria-controls="menu" onClick={handleClick} color='inherit'>
            <AccountCircle />
          </IconButton>

          <Menu
          id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={Logout}>Sair</MenuItem>
          </Menu>
        </div>
      </ToolbarContainer>
    </AppBar>

    <Spacer />

    <Content>
      <Grid container direction="column" align="center">
        <Typography variant="h3" gutterBottom>
          Qual sua escolha de hoje, {userName}?
        </Typography>

        <Typography variant="h4" gutterBottom>
          Escolha o tamanho da pizza!
        </Typography>

        <Grid container spacing={5}>
          {pizzaSize.map((pizza) => (
            <Grid item key={pizza.id} xs={4} >
              <PaperPizza>
                <div>{pizza.size}cm</div>

                <Divider />

                <Typography variant='h6'>{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias , {pizza.favours} sabores.
                </Typography>
              </PaperPizza>
            </Grid>
          ))}
        </Grid>

      </Grid>
    </Content>
  </>
  )
}

const pizzaSize = [
  { name: 'Pequeno', size: 28, slices: 2, flavours: 1, id: 555 },
  { name: 'Média', size: 30, slices: 6, flavours: 2, id: 2 },
  { name: 'Grande', size: 32, slices: 8, flavours: 3, id: 0 }
]

const Content = styled.main`
  padding: 20px;
`

const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
`

const PaperPizza = styled(Paper)`
  padding: 20px 0;
`

const ToolbarContainer = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  div{
    display: flex;
    align-items: center;
  }
`

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))


export default MainPage
