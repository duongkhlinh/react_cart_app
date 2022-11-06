import './App.css';
import { ProductView } from './features/product/productView';
import { CartView } from './features/cart/cartView';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header"></header>
        <div className="main-container">
          <ProductView />
          <section className="section">
            <h2 className="text-center fw-bold">Cart</h2>
            <CartView />
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;