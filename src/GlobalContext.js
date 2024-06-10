import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [listProducts, setListProducts] = React.useState([]);
  const [openCart, setOpenCart] = React.useState(false);
  const [openObs, setOpenObs] = React.useState(false);
  const [obs, setObs] = React.useState(null);
  const [idObs, setIdObs] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [user, setUser] = React.useState(null);
  const [typeBuy, setTypeBuy] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [complement, setComplement] = React.useState('');
  const [typePayment, setTypePayment] = React.useState('');
  const [address, setAddress] = React.useState(null);
  const [order, setOrder] = React.useState('');

  function addCart(item) {
    item.quantity = 1;
    item.currentPrice = item.price;
    item.isSelected = true;
    setCart(oldArray => [...oldArray, item]);
  }

  // add note to cart item
  function addObs(id) {
    let indexItem = cart.map((e) => e.id).indexOf(id);
    let updatedCart = [...cart];
    updatedCart[indexItem].obs = obs;
    setCart(updatedCart);
  }

  function incrementItem(item) {
    let indexItem = cart.map((e) => e.id).indexOf(item.id);
    let updatedCart = [...cart];
    updatedCart[indexItem].quantity = updatedCart[indexItem].quantity + 1;
    updatedCart[indexItem].currentPrice = updatedCart[indexItem].currentPrice + updatedCart[indexItem].price;
    setCart(updatedCart);
  }

  function decrementItem(item) {
    let indexItem = cart.map((e) => e.id).indexOf(item.id);
    let updatedCart = [...cart];
    updatedCart[indexItem].quantity = updatedCart[indexItem].quantity - 1;
    updatedCart[indexItem].currentPrice = updatedCart[indexItem].currentPrice - updatedCart[indexItem].price;
    if (updatedCart[indexItem].quantity === 0) {
      updatedCart[indexItem].isSelected = false;
      updatedCart.splice(indexItem, 1);
      setCart(updatedCart);
    }
    setCart(updatedCart);
  }


  const getProducts = async (category) => {
    let jsonData;
    if (category === "Esfihas") {
      jsonData = [
        {
            "id": 1,
            "title": "Frango com Catupiry",
            "description": "Molho de tomate, frango, milho, mussarela, catupiry e orégano",
            "price": 8,
            },
        {
            "id": 2,
            "title": "Frango com Cheddar",
            "description": "Molho de tomate, frango, milho, mussarela, cheddar e orégano",
            "price": 8,
            },
        {
            "id": 3,
            "title": "Franbacon",
            "description": "Molho de tomate, frango, milho, bacon, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 4,
            "title": "Frango",
            "description": "Molho de tomate, frango, milho, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 5,
            "title": "Nordestina 1",
            "description": "Molho de tomate, carne de sol, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 6,
            "title": "Nordestina 2",
            "description": "Molho de tomate, carne de sol, cebola, mussarela, cheddar e orégano",
            "price": 8,
            },
        {
            "id": 7,
            "title": "Calabresa",
            "description": "Molho de tomate, calabresa, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 8,
            "title": "Bacon",
            "description": "Molho de tomate, bacon, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 9,
            "title": "Calabacon",
            "description": "Molho de tomate, calabresa, bacon, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 10,
            "title": "3 Queijos",
            "description": "Molho de tomate, mussarela, catupiry, cheddar, batata palha e orégano",
            "price": 8,
            },
        {
            "id": 11,
            "title": "Mista",
            "description": "Molho de tomate, presunto, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 12,
            "title": "À Moda da Casa",
            "description": "Molho de tomate, calabresa, bacon, tomate, cebola e orégano",
            "price": 8,
            }
    ]
    
    } else if (category === "Bebidas") {
      jsonData = [
        {
          "id": 1,
          "title": "Refrigerante 2L",
          "description": "Ao finalizar o pedido, você será encaminhado para nosso atendimento via WhatsApp. Lá, você poderá perguntar quais refrigerantes estão disponíveis e obter informações atualizadas sobre os preços.",
          "price": null
        }
      ]
      
    
    } else {
      jsonData = [
        {
          "id": 1,
          "title": "Refrigerante",
          "price": 3.99
        },
        {
          "id": 2,
          "title": "Suco Natural",
          "price": 5.99
        },
      ];

    }
  
    // Use os dados diretamente
    setData(jsonData);
  }
  

  async function getCep(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json = await response.json();
    setAddress({
      rua: json.logradouro,
      cidade: json.localidade,
      bairro: json.bairro,
      uf: json.uf,
      cep: json.cep
    });
  }

  // wait for the CEP to be filled in with 8 digits to make the request
  React.useEffect(() => {
    if (cep.length >= 8) {
      getCep(cep);
    }
  }, [cep])

  // watch the cart changes to calculate the total price.
  React.useEffect(() => {
    if (cart.length > 0) {
      const prices = cart.map((item) => item.currentPrice);
      setTotal(prices.reduce((a, b) => a + b));
    }
  }, [cart]);

  // save the address in localStorage after finalizing the order
  React.useEffect(() => {
    if (typeBuy === 'delivery') {
      window.localStorage.setItem('address', JSON.stringify(order.address));
    }
  }, [order]);

  React.useEffect(() => {
    setListProducts(data);
  }, [data]);

  // loads product list and default localStorage address
  React.useEffect(() => {
    async function loadData() {
      let jsonData;

      jsonData = [
        {
            "id": 1,
            "title": "Frango com Catupiry",
            "description": "Molho de tomate, frango, milho, mussarela, catupiry e orégano",
            "price": 8,
            },
        {
            "id": 2,
            "title": "Frango com Cheddar",
            "description": "Molho de tomate, frango, milho, mussarela, cheddar e orégano",
            "price": 8,
            },
        {
            "id": 3,
            "title": "Franbacon",
            "description": "Molho de tomate, frango, milho, bacon, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 4,
            "title": "Frango",
            "description": "Molho de tomate, frango, milho, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 5,
            "title": "Nordestina 1",
            "description": "Molho de tomate, carne de sol, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 6,
            "title": "Nordestina 2",
            "description": "Molho de tomate, carne de sol, cebola, mussarela, cheddar e orégano",
            "price": 8,
            },
        {
            "id": 7,
            "title": "Calabresa",
            "description": "Molho de tomate, calabresa, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 8,
            "title": "Bacon",
            "description": "Molho de tomate, bacon, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 9,
            "title": "Calabacon",
            "description": "Molho de tomate, calabresa, bacon, cebola, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 10,
            "title": "3 Queijos",
            "description": "Molho de tomate, mussarela, catupiry, cheddar, batata palha e orégano",
            "price": 8,
            },
        {
            "id": 11,
            "title": "Mista",
            "description": "Molho de tomate, presunto, mussarela e orégano",
            "price": 8,
            },
        {
            "id": 12,
            "title": "À Moda da Casa",
            "description": "Molho de tomate, calabresa, bacon, tomate, cebola e orégano",
            "price": 8,
            }
    ]

      setData(jsonData);
    }
    loadData();
    const addressDefault = window.localStorage.getItem('address');
    if (addressDefault !== '' && addressDefault !== null && addressDefault !== undefined) {
      setUser(JSON.parse(addressDefault));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ getProducts, listProducts, addCart, cart, total, incrementItem, decrementItem, user, setUser, typeBuy, setTypeBuy, cep, setCep, number, setNumber, complement, setComplement, typePayment, setTypePayment, address, setAddress, order, setOrder, openCart, setOpenCart, openObs, setOpenObs, idObs, setIdObs, obs, setObs, addObs }}>
      {children}
    </GlobalContext.Provider>
  );
};