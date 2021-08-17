import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../api/Server';
import { getProducts } from '../../redux/actions/Actions';
import swal from 'sweetalert';

const CardProducts = ({ data, index }) => {
  const dispatch = useDispatch();
  const IMG_URL = 'http://localhost:3001/products/';
  const handlerDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete('/delete/' + data.id)
          .then((res) => {
            dispatch(getProducts(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };
  return (
    <>
      <tr>
        <th scope="row">{index}</th>
        <td>{data.name}</td>
        <td>{data.category}</td>
        <td>{data.quantity}</td>
        <td>
          <img src={`${IMG_URL}${data.images}`} alt={data.images} style={{ width: '80px' }} />
        </td>
        <td>
          <Link to={`/edit/${data.id}`}>
            <button class="btn btn-success me-2">Edit</button>
          </Link>
          <button class="btn btn-danger" onClick={handlerDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CardProducts;
