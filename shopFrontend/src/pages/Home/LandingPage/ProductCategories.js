// components/ProductCategories.js
import React from "react";
import "./ProductCategories.scss";
import pipes from './pvc pipes.jpg';
import electronic from './electronics.jpg'
import hardware from './hardware.jpg'

function ProductCategories() {
  const productData = [
    {
      header: "Electronics",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad esse quaerat sapiente est magni rerum excepturi eius similique sunt porro deleniti sed impedit enim, inventore corporis repellat recusandae illum.",
      image: electronic
    },
    {
      header: "PVC/UPVS Pipes",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad esse quaerat sapiente est magni rerum excepturi eius similique sunt porro deleniti sed impedit enim, inventore corporis repellat recusandae illum.",
      image: pipes
    },
    {
      header: "Hardwares",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad esse quaerat sapiente est magni rerum excepturi eius similique sunt porro deleniti sed impedit enim, inventore corporis repellat recusandae illum.",
      image: hardware
    }
  ];

  return (
    <section className="product-categories">
      <h1>Our Product Categories</h1>
      <div className="products">
      {productData.map((product, index) => (
        <div key={index} className="card">
          <img src={product.image} alt={product.header} />
          <div className="card-content">
            <h2>{product.header}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}

export default ProductCategories;
