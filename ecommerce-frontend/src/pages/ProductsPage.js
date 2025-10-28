import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductsPage(){
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16}}>
        {products.map(p => (
          <div key={p._id} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
            <img src={p.image} alt={p.name} style={{width:'100%', height:140, objectFit:'cover'}}/>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <div style={{display:'flex', gap:8}}>
              <Link to={`/product/${p._id}`}><button>View</button></Link>
              <button onClick={() => addToCart(p,1)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
