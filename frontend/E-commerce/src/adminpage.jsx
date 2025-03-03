import { useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", discount: "", image: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) });
  };

  const addProduct = () => {
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({ name: "", price: "", discount: "", image: null });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-6 p-4 border rounded-lg">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="discount" type="number" placeholder="Discount %" value={form.discount} onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="file" onChange={handleImageUpload} className="border p-2 w-full mb-2" />
        {form.image && <img src={form.image} alt="Preview" className="h-20 mt-2" />}
        <button onClick={addProduct} className="bg-blue-500 text-white p-2 rounded mt-2">Add Product</button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border p-2"><img src={product.image} alt={product.name} className="h-16 mx-auto" /></td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.discount}%</td>
              <td className="border p-2">
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
