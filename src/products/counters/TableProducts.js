import React from 'react';
import { connect } from 'react-redux';
import CardProducts from '../cardsProducts/CardProducts';

const TableProducts = (props) => {
  const cardsProducts = props.products.map((data, index) => {
    return <CardProducts data={data} key={data.id} index={index + 1} />;
  });
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{cardsProducts}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(TableProducts);
