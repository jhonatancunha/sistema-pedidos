import React, { createContext, useState } from 'react'
import { db } from 'services/firebase'
import {v4} from 'uuid'
import useAuth from 'hooks/Auth'
import firebase from 'services/firebase'

export const OrderContext = createContext();

const Order = ({ children }) => {
  const [pizzas, setPizza] = useState([]);
  const [orderInProgress, setOrderInProgress] = useState(false)
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState('');

  const { userInfo } = useAuth();

  function newPizza(pizza) {
    return {
      ...pizza,
      id: v4()
    }
  }

  function addPizzaToOrder(pizza) {
    if(orderInProgress){
      return setPizza(pizzaList => pizzaList.concat(newPizza(pizza)))
    }

    setOrderInProgress(true);
    setPizza([newPizza(pizza)])
  }

  async function sendOrder() {
    try{
      await db.collection('orders').add({
        userId: userInfo.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        address,
        phone,
        pizzas: pizzas.map(pizza => ({
          size: pizza.pizzaSize,
          flavours: pizza.pizzaFlavours,
          quantity: pizza.quantity
        }))
      })
    }catch(err){
      console.log(err)
    }

    setOrderInProgress(false);
  }

  function removePizzaFromOrder(id) {
    setPizza(pizzas.filter(p => p.id !== id))
  }

  return  (
    <OrderContext.Provider value={{
      order: {
        pizzas,
        phone,
        address
      },
      sendOrder,
      addPizzaToOrder,
      removePizzaFromOrder,
      setAddress,
      setPhone
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export default Order;
