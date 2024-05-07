import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, VatAddedPipe, FormsModule, FilterPipePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded: boolean = false;
  filterText = "";
  constructor(private productService: ProductService, 
              private activatedRoute:ActivatedRoute, 
              private toastrService: ToastrService,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      }
      else {
        this.getProducts();
      }
    })
    this.getProducts();
    console.log(this.activatedRoute);
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastrService.success( "Added to cart.", product.productName);
  }
}
