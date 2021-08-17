const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let products = require('../api/products.json');

const engineFileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: engineFileUpload });

router.get('/', (erq, res) => {
  res.send(products);
});

router.post('/add', upload.single('image'), (req, res) => {
  const { name, category, quantity } = req.body;
  const images = req.file.filename;
  const findProductsDuplicate = products.find((data) => data.name === name);
  if (findProductsDuplicate) {
    res.send({ message: 'products has been add' });
    return false;
  }
  products.push({
    id: uuidv4(),
    name,
    category,
    quantity,
    images,
  });
  fs.writeFile('api/products.json', JSON.stringify(products), (err) => {
    console.log(err);
  });
  res.send({ message: 'success added product' });
});

router.get('/edit/:id', (req, res) => {
  const { id } = req.params;

  const findProducts = products.find((data) => data.id === id);
  res.send(findProducts);
});

router.put('/edit/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, category, quantity } = req.body;
  const images = req.file.filename;
  const findProducts = products.find((data) => data.id === id);
  const findProductsDuplicate = products.find((data) => data.name === name);
  if (findProductsDuplicate) {
    res.send('products has been add');
    return false;
  }
  if (name) {
    findProducts.name = name;
  }
  if (category) {
    findProducts.category = category;
  }
  if (quantity) {
    findProducts.quantity = quantity;
  }
  if (images) {
    findProducts.images = images;
  }
  fs.writeFile('api/products.json', JSON.stringify(products), (err) => {
    console.log(err);
  });
  res.send({ message: 'success update products' });
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter((data) => data.id !== id);
  fs.writeFile('api/products.json', JSON.stringify(products), (err) => {
    console.log(err);
  });
  res.send(products);
});

router.get('/filters', (req, res) => {
  const { filters } = req.query;

  const findFilters = products.filter((data) => data.category === filters);

  res.send(findFilters);
});

module.exports = router;
