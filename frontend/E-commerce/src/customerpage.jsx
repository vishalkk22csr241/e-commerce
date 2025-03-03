import { useState } from "react";

export default function CustomerPage() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: "Product A", price: 100, discount: 10, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Product B", price: 200, discount: 15, image: "https://via.placeholder.com/100" },
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (1 - item.discount / 100), 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Shopping Page</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="h-20 mx-auto" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discount}%</p>
            <button onClick={() => addToCart(product)} className="bg-green-500 text-white p-2 rounded mt-2">Add to Cart</button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cart.length > 0 ? (
        <div>
          <table className="w-full border-collapse border border-gray-300 mb-4">
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
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2"><img src={item.image} alt={item.name} className="h-16 mx-auto" /></td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">${item.price}</td>
                  <td className="border p-2">{item.discount}%</td>
                  <td className="border p-2">
                    <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-lg font-semibold">Total Amount: ${calculateTotal()}</p>
          <button className="bg-blue-500 text-white p-2 rounded mt-2">Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
