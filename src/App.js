import { useContext } from 'react';

import Navigation from "./Components/Header/Navigation/Navigation";
import Meals from "./Components/Meals General/Meals/Meals";

import OrdersModal from "./Components/Modals/Orders Modal/OrdersModal";

import CartContext from './Store/CartContext';

function App() {

  const { isCartSeen } = useContext(CartContext);

  return (
    <div >
      <Navigation />
      {isCartSeen && <OrdersModal />}
      <Meals />
    </div>
  );
}

export default App;
