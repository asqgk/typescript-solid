import { OrderStatus } from './interfaces/IOrderStatus';
import { CustomerOrder } from './interfaces/ICustomerProtocol';
import { IShoppingCart } from './interfaces/IShoppingCart';
import { IMessaging } from './interfaces/IMessaging';
import { IPersistency } from './interfaces/IPersistency';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  // inject dependency
  constructor(
    private readonly cart: IShoppingCart,
    private readonly messaging: IMessaging,
    private readonly persistency: IPersistency,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();

    console.log(
      'O cliente é:',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}
