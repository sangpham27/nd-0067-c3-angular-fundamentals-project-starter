import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  amount: number = 1;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  addToCart = () => {
    this.cart.addToCart(this.product, this.amount);
    alert('Added to cart')
  }
  
  updateAmount = (value: string) => {
    this.amount = parseInt(value, 10);
  }
}
