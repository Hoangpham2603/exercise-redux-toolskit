import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";

import { openModal, closeModal } from "../Features/modal/modalSlice";

const CartContainer = () => {
  const { cartItem, total, amount } = useSelector((store) => store.cart);
    const dispatch = useDispatch()



  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItem.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() =>{dispatch(openModal())}}>Clear Cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
