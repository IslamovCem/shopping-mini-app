import React, { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      {products.map(p => (
        <div className="product-card" key={p._id} onClick={() => setSelected(p)}>
          <h3>{p.name}</h3>
          <p>{p.price} so'm</p>
        </div>
      ))}

      {selected && (
        <div className="product-card">
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <p>Narxi: {selected.price} so'm</p>
          <p>Mavjud: {selected.available ? "Ha" : "Yo'q"}</p>
          <button onClick={() => alert("Buyurtma berildi!")}>Buyurtma qilish</button>
          <button onClick={() => setSelected(null)}>Yopish</button>
        </div>
      )}
    </div>
  );
}