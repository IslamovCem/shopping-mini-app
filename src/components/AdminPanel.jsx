import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", available: true });

  const fetchProducts = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    }).then(() => {
      setNewProduct({ name: "", price: "", description: "", available: true });
      fetchProducts();
    });
  };

  return (
    <div>
      <h2>Yangi mahsulot qo‘shish</h2>
      <input placeholder="Nomi" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input placeholder="Narxi" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
      <input placeholder="Tavsifi" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
      <label><input type="checkbox" checked={newProduct.available} onChange={e => setNewProduct({ ...newProduct, available: e.target.checked })} /> Mavjud</label>
      <button onClick={handleAdd}>Qo‘shish</button>

      <h2>Barcha mahsulotlar</h2>
      {products.map(p => (
        <div className="product-card" key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.price} so'm</p>
          <button onClick={() => alert("Tahrirlash hali qo‘shilmagan")}>✏️</button>
          <button onClick={() => {
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/products/" + p._id, { method: "DELETE" })
              .then(() => fetchProducts());
          }}>🗑</button>
        </div>
      ))}
    </div>
  );
}