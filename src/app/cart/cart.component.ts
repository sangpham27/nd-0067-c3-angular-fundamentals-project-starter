import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import CartProduct from '../../models/CartProduct';
import { CartService } from '../services/cart.service';
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() userInfo = new EventEmitter();
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(private cart: CartService, private route: Router) { }

  ngOnInit(): void {
    this.cartProducts = this.cart.getCartProducts();
    const totalSum = this.cartProducts.reduce((prev: number, prod: CartProduct) => prev + prod.price * prod.amount, 0)
    this.totalPrice = this.calculateTotalPrice(totalSum);
  }

  onSubmit(user: User) {
    this.cart.clearCart()
    this.route.navigate([`success/${user.firstName}/${this.totalPrice}`]).then(r => {})
  }

  deleteProduct = (id: number) => {
    this.cart.removeFromCart(id);
    this.cartProducts = this.cartProducts.filter(p => p.id !== id)
  }

  calculateTotalPrice = (sum: number): number => {
    const trimmedSum = sum.toFixed(2);
    return Number(trimmedSum);
  }
}
