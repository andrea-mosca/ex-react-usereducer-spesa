import { useState, useReducer } from "react";
import "./App.css";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.some((item) => item.name === action.payload.name);
      if (exists) {
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.name !== action.payload);

    case "UPDATE_QUANTITY": {
      const { name, quantity } = action.payload;
      if (quantity < 1 || isNaN(quantity)) return state; // evita numeri invalidi
      return state.map((item) =>
        item.name === name ? { ...item, quantity } : item
      );
    }

    default:
      return state;
  }
}
function App() {
  // const [addedProducts, setAddedProducts] = useState([]);
  // console.log(addedProducts);

  // const updateProductQuantity = (name, quantity) => {
  //   if (quantity < 1 || isNaN(quantity)) return;

  //   setAddedProducts((curr) =>
  //     curr.map((item) => (item.name === name ? { ...item, quantity } : item))
  //   );
  // };

  // const addToCart = (product) => {
  //   const esiste = addedProducts.some((item) => item.name === product.name);
  //   if (esiste) {
  //     updateProductQuantity(product);
  //     return;
  //   }

  //   setAddedProducts((curr) => [...curr, { ...product, quantity: 1 }]);
  // };

  // const removeFromCart = (product) => {
  //   const prodottoRimosso = addedProducts.filter(
  //     (p) => p.name !== product.name
  //   );
  //   setAddedProducts(prodottoRimosso);
  // };

  // const prezzoTotale = () => {
  //   let prezzoProdotti = 0;
  //   addedProducts.map((p) => {
  //     let prezzoSingoloProdotto = p.price * p.quantity;
  //     prezzoProdotti = prezzoProdotti + prezzoSingoloProdotto;
  //   });
  //   return prezzoProdotti.toFixed(2);
  // };
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const prezzoTotale = () => {
    return cart
      .reduce((total, p) => total + p.price * p.quantity, 0)
      .toFixed(2);
  };
  return (
    <div>
      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <p>
              {p.name} costa {p.price}€ al Kg
            </p>
            <button
              onClick={() => dispatchCart({ type: "ADD_ITEM", payload: p })}
            >
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatchCart({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        name: item.name,
                        quantity: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <span>
                  {item.name} - {item.price}€
                </span>
                <button
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_ITEM", payload: item.name })
                  }
                >
                  rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <div>totale da pagare: {prezzoTotale()}€</div>
        </div>
      )}
    </div>
  );
}

export default App;
