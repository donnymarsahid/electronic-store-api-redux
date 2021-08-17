import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api/Server';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { getProducts } from '../redux/actions/Actions';
import TableProducts from './counters/TableProducts';

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get('/')
      .then((res) => {
        console.log(res);
        dispatch(getProducts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const tokenCookies = Cookies.get('auth_token');
  if (!tokenCookies) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div class="container mt-5">
        <div class="card">
          <nav class="nav">
            <Link class="nav-link active" aria-current="page" to="/">
              Electronic Store
            </Link>
            <Link class="nav-link active ms-auto" aria-current="page" to="/add">
              Add Products
            </Link>
          </nav>
        </div>
        <div class="card mt-3">
          <TableProducts />
        </div>
      </div>
    </>
  );
};

export default Products;
