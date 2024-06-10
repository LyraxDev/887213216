import React from 'react';
import { GlobalContext } from '../../../../GlobalContext';
import styles from './RadioPayment.module.css';

const RadioPayment = () => {
  const { typePayment, setTypePayment } = React.useContext(GlobalContext);

  return (
    <div className={styles.radioPayment}>
      <label className={styles.label}>
        <input name="Pix" type="radio" value="Pix" className={styles.radio} checked={typePayment === "Pix"} onChange={({ target }) => setTypePayment(target.value)} />
        Pix
      </label>
      <label className={styles.label}>
        <input name="money" type="radio" value="money" className={styles.radio} checked={typePayment === "money"} onChange={({ target }) => setTypePayment(target.value)} />
        Dinheiro
      </label>
    </div>
  )
}

export default RadioPayment;