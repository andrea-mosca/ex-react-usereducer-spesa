import { useState } from "react";
import "./App.css";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function App() {
  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const updateProductQuantity = (name, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;

    setAddedProducts((curr) =>
      curr.map((item) => (item.name === name ? { ...item, quantity } : item))
    );
  };

  const addToCart = (product) => {
    const esiste = addedProducts.some((item) => item.name === product.name);
    if (esiste) {
      updateProductQuantity(product);
      return;
    }

    setAddedProducts((curr) => [...curr, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product) => {
    const prodottoRimosso = addedProducts.filter(
      (p) => p.name !== product.name
    );
    setAddedProducts(prodottoRimosso);
  };

  const prezzoTotale = () => {
    let prezzoProdotti = 0;
    addedProducts.map((p) => {
      let prezzoSingoloProdotto = p.price * p.quantity;
      prezzoProdotti = prezzoProdotti + prezzoSingoloProdotto;
    });
    return prezzoProdotti.toFixed(2);
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
            <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {addedProducts.map((item, index) => (
              <li key={index}>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateProductQuantity(item.name, parseInt(e.target.value))
                  }
                />
                <span>
                  {item.name} - {item.price}€
                </span>
                <button onClick={() => removeFromCart(item)}>
                  rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <div>totale da pagare: {prezzoTotale(addedProducts)}€</div>
        </div>
      )}
    </div>
  );
}

export default App;
