import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/Server';

const AddProducts = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState('');

  const [status, setStatus] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('image', image);
    api
      .post('/add', formData)
      .then((res) => {
        if (res.data.message) {
          setStatus(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="container mt-5">
        <div class="card">
          <nav class="nav">
            <Link class="nav-link active" aria-current="page" to="/">
              Electronic Store
            </Link>
            <Link class="nav-link active ms-auto" aria-current="page" to="/">
              Back
            </Link>
          </nav>
        </div>
        <div class="card mt-3">
          <form onSubmit={handlerSubmit}>
            {status && (
              <div class="alert alert-primary d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>{status}</div>
              </div>
            )}
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">
                Category
              </label>
              <input
                type="text"
                class="form-control"
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="quantity" class="form-label">
                Quantity
              </label>
              <input
                type="number"
                class="form-control"
                id="quantity"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div class="input-group mb-3">
              <label for="file">Upload Products</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Add Products
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
