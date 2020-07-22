import React, { useState, useEffect } from 'react'
import useOrder from 'hooks/Order'
import TextField from './textfield'

const PhoneField = () => {
  const [phone, setPhoneState] = useState('');
  const { setPhone } = useOrder();

  useEffect(() => {
    setPhone(phone);
  }, [phone, setPhone]);

  const handleChangePhone = (e) => {
    setPhoneState(phoneMask(e.target.value));
  }

  const phoneMask = (phone) => {
    return phone
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  return  (
    <TextField
      label="Telefone"
      xs={4}
      value={phone}
      onChange={handleChangePhone}
    />
  )
}

export default PhoneField
