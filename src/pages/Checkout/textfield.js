import React from 'react'

import {
  Grid,
  TextField as MaterialTextField,
} from '@material-ui/core'


const TextField = ({ xs, autoFocus, ...props }) => {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        fullWidth
        variant='outlined'
        inputProps={{
          autoFocus
        }}
        {...props}
      />
    </Grid>
  )
}

export default TextField
