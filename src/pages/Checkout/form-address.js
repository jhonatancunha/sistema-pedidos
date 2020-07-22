import React, { useState, useEffect, useReducer, useRef } from 'react'
import useOrder from 'hooks/Order'

// MATERIAL UI
import { Grid, CircularProgress } from '@material-ui/core'
import TextField from './textfield'

const FormAddress = () => {
  const [cep, setCep] = useState('');
  const [addressState, dispatch] = useReducer(reducer, initialState);
  const [fetchingCEP, setFetchingCEP] = useState(false);
  const numberField = useRef();
  const addressField = useRef();
  const { setAddress } = useOrder();

  useEffect(() => {
    setAddress(addressState);
  },[addressState, setAddress])

  useEffect(() => {
    async function fetchAddress() {

      if(cep.length < 9) return;

      setFetchingCEP(true);
      const data = await fetch(
        `https://ws.apicep.com/cep/${cep}.json`
        );
      setFetchingCEP(false);

      if(!data.ok){
        dispatch({
          type: 'RESET'
        });

        addressField.current.focus();
        return
      }

      const response = await data.json();

      if(!response.ok){
        dispatch({
          type: 'FAIL',
          payload: {
            error: response.message
          }
        })
        return
      }

      dispatch({
        type: 'UPDATE_FULL_ADDRESS',
        payload: response
      })
      numberField.current.focus();
    }

    fetchAddress();
  },[cep])


  function handleChangeCep(e) {
    setCep(cepMask(e.target.value));
  }

  function cepMask(cep) {
    return cep
      .replace(/\D+/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  function handleChangeField(e) {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name, value }
    })
  }

  return (
    <Grid container spacing={2} alignItems='center'>
      <TextField
        label='CEP'
        xs={4}
        autoFocus
        value={cep}
        onChange={handleChangeCep}
        error={Boolean(addressState.error)}
      />
      <Grid xs={8} >
        {fetchingCEP && <CircularProgress size={20} />}
      </Grid>
      {[
        {
          label: 'Rua',
          xs: 9,
          name: 'address',
          inputRef: addressField
        },
        {
          label: 'Numero',
          xs: 3,
          name: 'number',
          inputRef: numberField
        },
        {
          label: 'Complement',
          xs: 12,
          name: 'complement'
        },
        {
          label: 'Cidade',
          xs: 9,
          name: 'city'
        },
        {
          label: 'Estado',
          xs: 3,
          name: 'state'
        },
      ].map((input) => (
        <TextField
          {...input}
          key={input.name}
          value={addressState[input.name]}
          onChange={handleChangeField}
          disabled={fetchingCEP}
        />
      ))}
    </Grid>
  )
}

function reducer (state, action) {
  if(action.type === 'UPDATE_FULL_ADDRESS') {
    return {
      ...state,
      ...action.payload,
      error: null
    }
  }

  if(action.type === 'UPDATE_FIELD'){
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
  }

  if(action.type === 'FAIL'){
    return {
      ...initialState,
      error: action.payload.error
    }
  }

  if(action.type === 'RESET'){
    return initialState
  }
  return state;
}

const initialState = {
  code: '',
  address: '',
  number: '',
  district: '',
  complement: '',
  city: '',
  state: '',
  error: null
}


export default FormAddress
