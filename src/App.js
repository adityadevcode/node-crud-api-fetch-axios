// import Data from "./Components/Data";
// import DataStyle from "./Components/DataStyle.css";
import DataAxios from "./Components/DataAxios";
import DataAxiosStyle from "./Components/DataAxiosStyle.css";

function App() {
  return (
    <div>
      Consume Api front end
      {/* <Data /> */}
      <DataAxios/>
    </div>
  );
}

export default App;


// updating node api server.js code
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = 3000;

// app.use(express.json());

// const products = [
//   { id: 1, name: 'Product 1' },
//   { id: 2, name: 'Product 2' },
//   { id: 3, name: 'Product 3' },
//   { id: 4, name: 'Product 4' },
//   { id: 5, name: 'Product 5' },
//   { id: 6, name: 'Product 6' },
//   { id: 7, name: 'Product 7' },
//   { id: 8, name: 'Product 8' },
//   { id: 9, name: 'Product 9' },
//   { id: 10, name: 'Product 10' },
//   { id: 11, name: 'Product 11' },
//   { id: 12, name: 'Product 12' },
//   { id: 13, name: 'Product 13' },
//   { id: 14, name: 'Product 14' },
//   { id: 15, name: 'Product 15' },
//   { id: 16, name: 'Product 16' },
//   { id: 17, name: 'Product 17' },
//   { id: 18, name: 'Product 18' },
//   { id: 19, name: 'Product 19' },
//   { id: 20, name: 'Product 20' }
// ];

// app.use(cors({
//     // 'methods':'GET',
//       origin:'*'
//   }))
  
// app.get('/products', (req, res) => {
//   res.send(products);
// });

// app.get('/products/:id', (req, res) => {
//   const product = products.find(p => p.id === parseInt(req.params.id));
//   if (!product) res.status(404).send('Product not found');
//   res.send(product);
// });

// app.post('/products', (req, res) => {
//   const product = {
//     id: products.length + 1,
//     name: req.body.name
//   };
//   products.push(product);
//   res.send(product);
// });

// app.patch('/products/:id', (req, res) => {
//   const product = products.find(p => p.id === parseInt(req.params.id));
//   if (!product) res.status(404).send('Product not found');
//   product.name = req.body.name;
//   res.send(product);
// });

// app.delete('/products/:id', (req, res) => {
//   const product = products.find(p => p.id === parseInt(req.params.id));
//   if (!product) res.status(404).send('Product not found');
//   const index = products.indexOf(product);
//   products.splice(index, 1);
//   res.send(product);
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
