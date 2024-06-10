import React from 'react';
import useForm from '../../../Hooks/useForm';
import { GlobalContext } from '../../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Input from './Fragments/Input';
import RadioDelivery from './Fragments/RadioDelivery';
import styles from './Form.module.css';

const Form = () => {
  const { typeBuy, number, setCelular, complement, rua, bairro, typePayment, cart, total, setOrder, user, setName } = React.useContext(GlobalContext);
  const phone = useForm('phone');
  const name = useForm();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (name.validate() && phone.validate()) {
      if (typeBuy === 'store') {
        setOrder({
          name: name.value,
          phone: phone.value,
          cart: {
            ...cart,
            totalPrice: total
          }
        });
        navigate('/completed');
      } else if (typeBuy === 'delivery' && rua && bairro && number && complement && typePayment) {
        setOrder({
          name: name.value,
          phone: phone.value,
          cart: {
            ...cart,
            totalPrice: total,
          },
          address: {
            rua: rua,
            bairro: bairro,
            number: number,
            complement: complement,
          },
          payment: typePayment
        });
        navigate('/completed');
      } else if (typeBuy === 'delivery' && user) {
        setOrder({
          name: name.value,
          phone: phone.value,
          cart: {
            ...cart,
            totalPrice: total,
          },
          address: {
            rua: user.rua,
            bairro: user.bairro,
            number: user.number,
            complement: user.complement,
          },
          payment: typePayment
        });
        navigate('/completed');
      }
    }
  }

  return (
    <form onSubmit={(event) => {handleSubmit(event); setName(name.value); setCelular(phone.value)}} className={styles.form}>
      <h3 className={styles.title}>Seus dados</h3>
      <Input label="Nome" type="text" name="name" placeholder="Digite seu nome" {...name} />
      <Input label="Celular" type="text" name="phone" placeholder="Digite seu número" {...phone} />
      <h3 className={styles.subTitle}>Entrega</h3>
      <RadioDelivery />
      <button className={styles.confirm} type="submit">Confirmar pedido</button>
    </form>
  );
};

export default Form;
