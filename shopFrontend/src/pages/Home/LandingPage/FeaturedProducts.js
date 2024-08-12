// components/FeaturedProducts.js
import React from "react";
import './FeaturedProducts.scss';

const products = [
  { name: "Power Drill", price: 89.99, image: "drill.jpg" },
  { name: "LED Bulb Pack", price: 12.99, image: "led-bulbs.jpg" },
  { name: "PVC Pipe Set", price: 24.99, image: "pvc-pipes.jpg" }
];

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.name} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;