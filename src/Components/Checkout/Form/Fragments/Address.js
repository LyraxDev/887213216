import React from 'react';
import { GlobalContext } from '../../../../GlobalContext';
import RadioPayment from './RadioPayment';
import styles from './Address.module.css';

const Address = () => {
  const { rua, setRua, bairro, setBairro, number, setNumber, complement, setComplement } = React.useContext(GlobalContext);
  const [error, setError] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="rua" className={styles.label}>Rua</label>
      <input id="rua" name="rua" placeholder="Digite sua Rua" className={styles.input} type="text" onChange={(event) => { setRua(event.target.value); setError(false) }} value={rua} />
      
      <label htmlFor="bairro" className={styles.label}>Bairro</label>
      <input id="bairro" name="bairro" placeholder="Digite seu Bairro" className={styles.input} type="text" onChange={(event) => { setBairro(event.target.value); setError(false) }} value={bairro} />

      <label htmlFor="number" className={styles.label}>Número</label>
      <input id="number" name="number" placeholder="Digite o número da residência" className={styles.input} type="number" onChange={(event) => setNumber(event.target.value)} value={number} />
      
      <label htmlFor="complement" className={styles.complement}>Complemento</label>
      <input id="complement" name="complement" placeholder="Digite um complemento" className={styles.input} type="text" onChange={(event) => setComplement(event.target.value)} value={complement} />
      
      <h3 className={styles.subTitle}>Pagamento</h3>
      <p className={styles.typePay}>Método de pagamento:</p>
      <RadioPayment />
    </div>
  );
}

export default Address;
