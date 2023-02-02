// import React, { useState, useEffect } from 'react';

// const Data = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/products')
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <ul>
//       {products.map(product => (
//         <li key={product.id}>{product.id} {product.name}</li>
//       ))}
//     </ul>
//   );
// };

// export default Data;

/////////////////////////////////////////////
// how do we will post and delete items in frontend

//  import React, { useState, useEffect } from 'react';
 
//  const Data = () => {
//     const [products, setProducts] = useState([]);
//     const [name, setName] = useState('');
  
//     useEffect(() => {
//       fetch('http://localhost:3000/products')
//         .then(res => res.json())
//         .then(data => setProducts(data))
//         .catch(error => console.error(error));
//     }, []);
  
//     const handleSubmit = e => {
//       e.preventDefault();
//       fetch('http://localhost:3000/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//     })
//       .then(res => res.json())
//       .then(product => {
//         setProducts([...products, product]);
//         setName('');
//       })
//       .catch(error => console.error(error));
//   };

//   const handleDelete = id => {
//     fetch(`http://localhost:3000/products/${id}`, {
//       method: 'DELETE'
//     })
//       .then(() => {
//         setProducts(products.filter(product => product.id !== id));
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//         <button type="submit">Add Product</button>
//       </form>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             {product.name}{' '}
//             <button onClick={() => handleDelete(product.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Data;

// using axios we need install npm install axios
// The handleDelete function is called when the delete button for a
//  product is clicked, and it makes a DELETE request to the API to delete the product.
// And here's an example using axios:

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState('');

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/products')
//       .then(res => setProducts(res.data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios

// ******************* clarification************
// using fetch
// -initialize the state variables products, name, editing, and currentProduct
// -products will be used to store the list of products fetched from the API
// -name will be used to store the name of the product being added or edited. 
// -editing will be used to keep track of whether we are adding a 
// new product or editing an existing one
// -currentProduct will be used to store the product being edited.

// useEffect hook to fetch the list of products from the API when the component is mounted.
// The data is fetched using the fetch API and converted to JSON using res.json()
// The products are then stored in the products state using setProducts(data)

// handleSubmit function that will be called when the form is submitted
// This function will either add a new product or update an existing one based on the value of editing
//  If editing is true, the function will make a PATCH request to the API to update the product with the new name
// If editing is false, the function will make a POST request to add a new product to the API.
// he response from the API will be converted to JSON and the products state will be updated with the new data.


import React, { useState, useEffect } from 'react';

const Data = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '' });

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      fetch(`http://localhost:3000/products/${currentProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      })
        .then(res => res.json())
        .then(product => {
          setProducts(
            products.map(p => (p.id === product.id ? product : p))
          );
          setEditing(false);
          setCurrentProduct({ id: null, name: '' });
          setName('');
        })
        .catch(error => console.error(error));
    } else {
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
        .then(res => res.json())
        .then(product => {
          setProducts([...products, product]);
          setName('');
        })
        .catch(error => console.error(error));
    }
  };

  const handleDelete = product => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setProducts(products.filter(p => p.id !== product.id));
      })
      .catch(error => console.error(error));
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
                <input type="text"
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <button
                  className="button muted-button"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="button muted-button"
                  onClick={() => handleDelete(product)}
                >
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

export default Data;

























