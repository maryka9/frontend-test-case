import {Cart} from "./components/Cart/Cart";
import {Header} from "./components/Header/Header";
import {ProductList} from "./components/ProductList/ProductList";

import "./App.css"

function App() {
  return (
      <div className="app">
        <Header />
        <div className="main-content">
          <ProductList />
          <Cart />
        </div>
      </div>
  )
}

export default App
