import { EnterpriseCustomer, IndividualCustomer } from './classes/customer';
import {
  // FiftyPercentDiscount,
  NoDiscount,
  // TenPercentDiscount,
} from './classes/discount';
import { IMessaging } from './classes/interfaces/IMessaging';
import { Order } from './classes/order';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const enterpriseCustomer = new EnterpriseCustomer(
//   'Empresa Gidante',
//   '111.111.111-11',
// );
const individualCustomer = new IndividualCustomer(
  'Francisco',
  'Passos',
  '111.111.111-11',
);

class MessagingMock implements IMessaging {
  sendMessage(): void {
    console.log('A mensagem foi enviada pelo MOCK');
  }
}

const messagingMock = new MessagingMock();

const order = new Order(
  shoppingCart,
  messagingMock,
  persistency,
  individualCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.91));
shoppingCart.addItem(new Product('Caderno', 9.9123));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
