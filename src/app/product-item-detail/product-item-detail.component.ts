import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {CartService} from "../services/cart.service";
import CartProduct from "../../models/CartProduct";

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {

  product: Product | null = null;
  selectedItem = 1;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct = () => {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ??  '', 10);
    this.productService.getProduct(id).subscribe(data => this.product = data);
  }

  selectedChange(quantity: string) {
    this.selectedItem = parseInt(quantity, 10)
  }

  addProductToCart(product: Product) {
    this.cart.addToCart(product, this.selectedItem);
    const message = `${product.name} has been added to your cart.`;
    alert(message);
    this.router.navigate(['/cart']).then();
  }

  goBack = () => {
    this.location.back();
  }

  

}
