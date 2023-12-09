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

  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  refreshPage() {
    window.location.reload();
  }

  updateAmount = (product: CartProduct, value: string) => {
    const amount = parseInt(value, 10);
    if (amount < 1){
      this.deleteProduct.emit(product.id);
    }
    this.cart.updateAmount(product.id, amount);
    this.product.amount = amount;
    this.refreshPage()
  }

}
