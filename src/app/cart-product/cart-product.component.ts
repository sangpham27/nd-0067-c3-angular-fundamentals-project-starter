import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CartProduct from '../../models/CartProduct';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input() product!: CartProduct;
  @Output() deleteProduct: EventEmitter<number> = new EventEmitter();
  amount: number = 1;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  refreshPage() {
    window.location.reload();
  }

  updateAmount = (product: CartProduct, value: string) => {
    this.amount = parseInt(value, 10);
    if (this.amount < 1){
      this.deleteProduct.emit(product.id);
    }
    this.cart.updateAmount(product.id, this.amount);
    this.product.amount = this.amount;
    this.refreshPage()
  }

  deletedItem(id: number){
    const product = this.cart.getCartProducts().find((product) => product.id === id);
    this.cart.removeFromCart(id)
    const message = `${product?.name} has been removed from your cart.`;
    alert(message);
    this.refreshPage()
  }

}
