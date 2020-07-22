import { useContext } from 'react';
import { OrderContext } from 'context/order';

function useOrder() {
  return useContext(OrderContext);
}

export default useOrder;
