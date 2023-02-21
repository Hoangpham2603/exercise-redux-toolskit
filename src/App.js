import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { calculateTotal, getCartItems } from "./Features/carts/cartSlice";
import Modal from "./components/Modal";

function App() {
  const {cartItem, isLoading} = useSelector(store => store.cart)
  const {isOpen} = useSelector(store => store.modal)

  const dispatch = useDispatch()

  

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItem])

  useEffect(()=>{
    dispatch(getCartItems())
  },[])

  if(isLoading) {
    return (
      <div className="loading">
        <h1>Loading ...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </main>
    )
}
export default App;
