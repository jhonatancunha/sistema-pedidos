import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { HOME } from 'routes'
import useAuth from 'hooks/Auth'

const HeaderCommon = () => {
  const { userInfo ,Logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
       <Typography variant='h6'>
        <LinkLogo to={HOME}>
          Sistema de Pedidos
        </LinkLogo>
      </Typography>
      <div>
        <Typography color="inherit">Olá {userInfo.user.firstName} =)</Typography>
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
    </>
  )
}

const LinkLogo = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.common.white};
  transition: transform .2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }
`

export default HeaderCommon
