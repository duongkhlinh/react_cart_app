import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import {
  addToCart,
  decreaseCartQuantity,
  removeFromCart,
  clearCart
} from './cartSlice';

export const CartView = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const { cartProducts: cartProductsObj, cartTotalPrice } = cart;
  const cartProducts = Object.values(cartProductsObj);

  if (cartProducts.length === 0) {
    return (
      <div className="text-center">
        <p>Your cart is empty</p>
        <p className="remark">
          This app is only meant for demonstrating the basic usage of React
          and Redux Toolkit. UI/UX and performance (lazy loading, caching,
          etc.) optimization are not considered<br></br>
          <br></br>
          <a href="https://bit.ly/3WCFxD5">
            Click here to see source code on Github
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="cart">
        {cartProducts.map((cartProduct) => (
          <li key={cartProduct.id} className="cart__item">
            <img
              className="cart__item__image"
              src={cartProduct.image}
              alt={cartProduct.title}
            />
            <h3 className="cart__item__name">{cartProduct.title}</h3>
            <h3 className="cart__item__price">{cartProduct.price}</h3>
            <button
              className="btn btn--primary btn--small  btn--danger"
              onClick={() => dispatch(decreaseCartQuantity(cartProduct))}
            >
              −
            </button>
            <h3 className="cart__item__quantity">{cartProduct.cartQuantity}</h3>
            <button
              className="btn btn--primary btn--small"
              onClick={() => dispatch(addToCart(cartProduct))}
            >
              +
            </button>
            <button
              className="btn btn--danger btn--small"
              onClick={() => dispatch(removeFromCart(cartProduct))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <button
          className="btn btn--danger"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
        <button className="btn btn--primary">
          Pay ${Math.round(cartTotalPrice)}
        </button>
      </div>
    </div>
  );
};
