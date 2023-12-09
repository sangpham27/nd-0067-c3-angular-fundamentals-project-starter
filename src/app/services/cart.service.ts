import { Injectable } from '@angular/core';
import CartProduct from '../../models/CartProduct';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartProduct[] = JSON.parse(sessionStorage.getItem('storefront-cart') ?? '[]');

  constructor() { }

  addToCart = (product: Product, amount: number) => {

    const existingProductIndex = this.cart.findIndex(cProd => cProd.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex] = {
        ...product,
        amount: this.cart[existingProductIndex].amount + amount
      }
      sessionStorage.setItem('storefront-cart', JSON.stringify(this.cart));
      return;
    }

    this.cart.push({
      ...product,
      amount: amount
    })

    sessionStorage.setItem('storefront-cart', JSON.stringify(this.cart));
  }

  removeFromCart = (id: number): void => {
    this.cart = this.cart.filter(cProd => cProd.id !== id);
    sessionStorage.setItem('storefront-cart', JSON.stringify(this.cart));
  }

  updateAmount = (id: number, amount: number): void => {
    this.cart = this.cart.map((cProd) => {
      if (cProd.id === id) {
        return {
          ...cProd,
          amount: amount
        }
      }
      return cProd
    })
    sessionStorage.setItem('storefront-cart', JSON.stringify(this.cart));
  }

  getCartProducts = (): CartProduct[] => {
    return this.cart;
  }

  clearCart = () => {
    this.cart = [];
    sessionStorage.removeItem('storefront-cart');
  }
}
