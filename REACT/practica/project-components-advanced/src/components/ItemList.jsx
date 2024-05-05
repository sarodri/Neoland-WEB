import React from 'react';

const ItemList = ({ items }) => { //devuelve una lista de los items mapeados
  return (
    <> {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </>
  );
};

export default ItemList;