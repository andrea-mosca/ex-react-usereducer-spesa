import "./App.css";
const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];
function App() {
  return (
    <div>
      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            `{p.name} costa {p.price}€ al Kg`
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
