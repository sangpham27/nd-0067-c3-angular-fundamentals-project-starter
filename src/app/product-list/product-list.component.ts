import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  contentLoaded: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.contentLoaded = true;
    });
  }

}
