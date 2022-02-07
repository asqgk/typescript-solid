import { CartItem } from './interfaces/ICartItem';

export class Product implements CartItem {
  constructor(public name: string, public price: number) {}
}
