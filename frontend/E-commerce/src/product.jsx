import { useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const [product, setProduct] = useState({ name: "", price: "", image: null });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("date", new Date().toISOString());

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, res.data]);
      setProduct({ name: "", price: "", image: null });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error removing product", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="border p-2 w-full mb-2" />
      <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full mb-2" />
      <input type="file" onChange={handleImageChange} className="border p-2 w-full mb-2" />
      <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 w-full rounded">Add Product</button>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Product List</h3>
        {products.map((p) => (
          <div key={p._id} className="border p-3 flex justify-between items-center mb-2">
            <div>
              <p className="font-bold">{p.name}</p>
              <p>${p.price}</p>
              <p className="text-gray-500 text-sm">Added: {new Date(p.date).toDateString()}</p>
            </div>
            <button onClick={() => handleRemoveProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
