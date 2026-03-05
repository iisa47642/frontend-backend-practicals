import React from 'react';

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="productRow">
      <div className="productMain">
        <div className="productId">#{product.id}</div>
        <div className="productName">{product.name}</div>
        <div className="productCategory">{product.category}</div>
        <div className="productPrice">{product.price.toLocaleString('ru-RU')} &#8381;</div>
        <div className="productStock">&#128230; {product.stock} шт.</div>
      </div>
      <div className="productDesc">{product.description}</div>
        <div className="productImg">
            <img src={product.url} alt="aaa"/>
        </div>
      <div className="productActions">
        <button className="btn" onClick={() => onEdit(product)}>
          Редактировать
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}
