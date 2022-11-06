import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../app/store';
import { addToCart } from '../cart/cartSlice';
import { fetchProducts } from './productSlice';

export const ProductView = () => {
  const product = useSelector((state: RootState) => state.product);
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { loading, error, products: productsObj } = product;
  const products = Object.values(productsObj);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!!error) {
    return <div>Error: {error}</div>;
  }

  if (!products.length) {
    return <div>Sorry, no product available</div>;
  }

  return (
    <section className="section">
      <h2 className="text-center fw-bold">Products</h2>
      <ul className="products">
        {products.map((product) => (
          <li key={product.id} className="product">
            <img
              src={product.image}
              className="product__image"
              width={100}
              height={100}
              alt={product.title}
            />
            <p className="product__name">{product.title}</p>
            <p className="product__price">{product.price}</p>
            <button
              className="btn btn--primary"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

