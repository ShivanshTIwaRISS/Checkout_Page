import React from 'react';
import Product from './Product';
import { products } from '../products';

const ProductList = ({ onAddToCart }) => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <Product 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;