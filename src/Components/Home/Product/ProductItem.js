import React from 'react';
import styles from './ProductItem.module.css';

const ProductItem = ({ inputCart, item }) => {
  return (
    <div className={`${styles.card} ${styles.enterLeft} ${item.isSelected && styles.disable}`} key={item.id} onClick={!item.isSelected ? () => inputCart(item) : () => false}>
      {item.offer && <div className={styles.offer}><p>Oferta</p></div>}
      <div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>R$ {item.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;