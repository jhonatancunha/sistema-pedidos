import React from 'react'
import { Grid } from '@material-ui/core'

function HeaderContent({ children }) {
  return (
    <Grid container direction="column" align="center">
      {children}
    </Grid>
  )
}

export default HeaderContent
