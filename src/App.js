import React from "react";
import "./App.css"; // bikin styling di sini

const products = [
  {
    id: 1,
    name: 'Cappuccino "Oryx" blouson',
    desc: "In cashmere, lambskin details",
    price: "€6,900.00",
    img: "https://via.placeholder.com/300x400"
  },
  {
    id: 2,
    name: 'Cappuccino "Leather stitching" zipped cardigan',
    desc: "In cashmere, lambskin, deerskin",
    price: "€1,980.00",
    img: "https://via.placeholder.com/300x400"
  },
  {
    id: 3,
    name: "Pale caramel classic shirt",
    desc: "In cotton",
    price: "€1,025.00",
    img: "https://via.placeholder.com/300x400"
  }
];

function App() {
  return (
    <div>
      <header className="header">
        <h2>FALL 2025</h2>
        <p>
          A collection inspired by the raw power of stone and the timeless
          elegance of marble. Each piece blends structure and fluidity,
          precision and softness.
        </p>
      </header>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <div className="product-info">
              <div className="tag">NEW IN</div>
              <div className="product-name">{item.name}</div>
              <div className="product-desc">{item.desc}</div>
              <div className="product-price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
