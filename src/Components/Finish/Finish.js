import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './Finish.module.css';
import CartItem from '../Home/Cart/CartItem';

const Finish = () => {
  const { cart, total, typeBuy } = React.useContext(GlobalContext);

  const printOrderToConsole = () => {
    console.log("Pedido:");
    cart.forEach(item => {
      console.log(`${item.title} - R$ ${item.price},00`);
    });
    console.log(`Total: R$ ${total},00`);
    console.log(`Tipo de compra: ${typeBuy === "delivery" ? "Entrega" : "Retirada na loja"}`);
  };

  const redirectToWhatsApp = () => {
    const pedidoText = encodeURIComponent(getPedidoText());
    setTimeout(() => {
      window.location.href = `https://api.whatsapp.com/send?phone=+558599044621&text=${pedidoText}`;
    }, 3000);
  };

  const getPedidoText = () => {
    let pedido = "Pedido:";
    cart.forEach(item => {
      pedido += `%0A${item.title} - R$ ${item.price},00`;
    });
    pedido += `%0ATotal: R$ ${total},00`;
    pedido += `%0ATipo de compra: ${typeBuy === "delivery" ? "Entrega" : "Retirada na loja"}`;
    return pedido;
  };

  React.useEffect(() => {
    printOrderToConsole();
    redirectToWhatsApp();
  }, []);

  return (
    <div className={styles.finishContainer}>
      <div className={styles.orderFinish}>
        <ion-icon name="checkmark-circle"></ion-icon>
        <h2>Pedido finalizado</h2>
      </div>
      <div className={styles.orderContainer}>
        <div className={styles.orderItems}>
          {cart.map((item) => <CartItem key={item.id} product={item} isFinish={true} />)}
        </div>
        <div className={styles.total}>
          <h4>Total</h4>
          <h4 className={styles.price}>R$ {total},00</h4>
        </div>
      </div>
      {typeBuy === "delivery" ? (
        <p className={styles.orderStore}>Seu pedido será entregue em até 60 minutos.</p>
      ) : (
        <p className={styles.orderStore}>Em 25 minutos seu pedido estará pronto para ser retirado em nossa loja.</p>
      )}
    </div>
  )
}

export default Finish;
