import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataAxios = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.patch(`http://localhost:3000/products/${currentProduct.id}`, { name });
        const updatedProduct = await axios.get(`http://localhost:3000/products/${currentProduct.id}`);
        setProducts(products.map(p => (p.id === updatedProduct.data.id ? updatedProduct.data : p)));
      } else {
        const { data: product } = await axios.post('http://localhost:3000/products', { name });
        setProducts([...products, product]);
      }
      setEditing(false);
      setCurrentProduct({ id: null, name: '' });
      setName('');
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleDelete = async product => {
    if (!product.id) {
        console.error('Product ID is undefined');
        return;
      }
    try {
      await axios.delete(`http://localhost:3000/products/${product.id}`);
      setProducts(products.filter(p => p.id !== product.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = product => {
    setEditing(true);
    setCurrentProduct(product);
    setName(product.name);
  };

  return (
    <div className="container">
      <h1>Product Manager</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <button className="button muted-button">Update product</button>
            </form>
          ) : (
            <div>
              <h2>Add product</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <button className="button">Add product</button>
              </form>
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View products</h2>
          <table>
    <thead>
<tr>
  <th>Name</th>
  <th>Edit</th>
  <th>Delete</th>
</tr>
</thead>
<tbody>
{products.map(product => (
  <tr key={product.id}>
    <td>{product.name}</td>
    <td>
      <button className="button" onClick={() => handleEdit(product)}>
        Edit
      </button>
    </td>
    <td>
      <button className="button" onClick={() => handleDelete(product)}>
        Delete
      </button>
    </td>
  </tr>
))}
</tbody>
</table>
</div>
</div>
</div>
);
};

export default DataAxios;

