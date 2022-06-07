import { useContext } from 'react';

import Header from './Components/Header/Header Component/Header';
import Meals from './Components/Meals General/Meals/Meals';
import OrdersModal from "./Components/Modals/Orders Modal/OrdersModal";

import CartContext from './Store/CartContext';
// import { createPortal } from 'react-dom';

import classes from './App.module.css';

function App() {

  const { isCartSeen } = useContext(CartContext);

  const ordersComponent = isCartSeen && < OrdersModal />

  return (
    <div className={classes.app} >
      {ordersComponent}
      <Header />
      <main>
        <Meals />
      </main>
    </div>
  );
}

export default App;
