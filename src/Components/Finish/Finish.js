import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './Finish.module.css';
import CartItem from '../Home/Cart/CartItem';

const Finish = () => {
  const { cart, total, typeBuy, rua, bairro, number, typePayment, cel, complement, user, name, obs } = React.useContext(GlobalContext);

  const printOrderToConsole = () => {
    let pedido = "Pedido:\n";
    cart.forEach(item => {
      pedido += `${item.title} - R$ ${item.price},00\n`;
    });
    pedido += `Total: R$ ${total},00\n`;
    pedido += `Tipo de compra: ${typeBuy === "delivery" ? "Entrega" : "Retirada na loja"}`;
    console.log(pedido);
    return pedido;
  };

  const sendOrderToDiscord = async () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1249860166464176180/pIh1VeccOtT-j3KwNYVP7gVllZ1iHzovKTtqy7F84Oiw2TuDhKqWO6qfscAqeddtLShi';
    let pedidoText = "Pedido:\n";
    cart.forEach(item => {
      pedidoText += `${item.title} - R$ ${item.price},00\n`;
    });
    pedidoText += `Total: R$ ${total},00\n`;
    pedidoText += `Tipo de compra: ${typeBuy === "delivery" ? "Entrega" : "Retirada na loja"}\n`;
    pedidoText += `Nome: ${name}\n`;
    pedidoText += `Endereço: Rua ${rua}, Bairro ${bairro}, Número ${number}, Complemento ${complement}\n`;
    pedidoText += `Observações: ${obs}\n`;
    pedidoText += `Número do cliente: ${cel}\n`;
    pedidoText += `Forma de pagamento: ${typePayment}`;

    const payload = {
      content: pedidoText
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Pedido enviado para o Discord com sucesso');
      } else {
        console.error('Erro ao enviar pedido para o Discord');
      }
    } catch (error) {
      console.error('Erro ao enviar pedido para o Discord', error);
    }
  };

  React.useEffect(() => {
    sendOrderToDiscord();
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
  );
}

export default Finish;
